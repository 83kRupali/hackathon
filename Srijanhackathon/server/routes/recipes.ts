import type { RequestHandler } from "express";
import type { GenerateRecipeRequest, GenerateRecipeResponse } from "@shared/api";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const generateRecipe: RequestHandler = async (req, res) => {
  const body = req.body as GenerateRecipeRequest;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!body?.foodType || !body?.freshness) {
    res.status(400).json({ ok: false, reason: "Missing foodType or freshness" } satisfies GenerateRecipeResponse as any);
    return;
  }

  if (!apiKey) {
    // Graceful fallback without hitting external API
    if (body.freshness === "expired") {
      res.json({ ok: false, reason: "expired", tips: [
        "Compost spoiled items or use municipal compost bins",
        "Store perishables front-and-center to avoid forgetting",
        "Plan portions and freeze leftovers in labeled containers",
      ] } satisfies GenerateRecipeResponse as any);
      return;
    }
    const fallback = {
      title: `${capitalize(body.foodType)} Reinvented Bowl`,
      ingredients: ["Leftover "+body.foodType, "Mixed veggies", "Garlic", "Ginger", "Soy sauce", "Olive oil"],
      steps: [
        "Heat a pan with oil; add garlic and ginger.",
        `Add leftover ${body.foodType} and stir-fry until warmed.`,
        "Toss in veggies; season and finish with herbs.",
      ],
      carbonFootprintGramsCO2e: 220,
      waterSavingsLiters: 18,
      videoQuery: `${body.foodType} leftover recipe quick healthy`,
    };
    res.json({ ok: true, recipe: fallback } satisfies GenerateRecipeResponse as any);
    return;
  }

  if (body.freshness === "expired") {
    res.json({ ok: false, reason: "expired", tips: [
      "Compost spoiled items or use municipal compost bins",
      "Store perishables front-and-center to avoid forgetting",
      "Plan portions and freeze leftovers in labeled containers",
    ] } satisfies GenerateRecipeResponse as any);
    return;
  }

  try {
    const prompt = `You are EcoBite, an app that helps reuse leftovers with sustainability.
Return ONLY JSON with this shape:
{ "title": string, "ingredients": string[], "steps": string[], "carbonFootprintGramsCO2e": number, "waterSavingsLiters": number, "videoQuery": string }
Constraints:
- Title short and appetizing.
- 8-12 ingredients max.
- 6-9 concise steps, imperative voice.
- Carbon footprint: grams CO2e saved compared to cooking a new dish.
- WaterSavingsLiters: liters saved compared to an alternative.
- videoQuery: a YouTube search query for this exact recipe, short.
Context: foodType=${body.foodType}, freshness=${body.freshness} (fresh or warn).`;

    const r = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }]}],
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    });

    if (!r.ok) {
      throw new Error(`Gemini error ${r.status}`);
    }
    const data = await r.json();
    let text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    // Remove code fences if present
    text = text.replace(/^```json[\r\n]*/i, "").replace(/```$/i, "");
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonText = jsonStart >= 0 ? text.slice(jsonStart, jsonEnd + 1) : "";
    const parsed = JSON.parse(jsonText);

    const response: GenerateRecipeResponse = { ok: true, recipe: {
      title: parsed.title,
      ingredients: parsed.ingredients,
      steps: parsed.steps,
      carbonFootprintGramsCO2e: Number(parsed.carbonFootprintGramsCO2e) || 0,
      waterSavingsLiters: Number(parsed.waterSavingsLiters) || 0,
      videoQuery: String(parsed.videoQuery || `${body.foodType} leftover recipe`),
    }};

    res.json(response);
  } catch (e: any) {
    console.error("Gemini generation failed:", e);
    // Fallback local generator to avoid blocking user
    const base = (type: string) => ({
      rice: {
        title: "Veggie Fried Rice (Leftover)",
        ingredients: ["Leftover rice","Mixed veggies","Garlic","Ginger","Soy sauce","Spring onion"],
        steps: ["Heat oil, sauté garlic & ginger","Add veggies, stir-fry 2 min","Add rice, toss with soy sauce","Finish with spring onion & sesame"],
      },
      bread: {
        title: "Masala Bread Upma (Leftover)",
        ingredients: ["Day-old bread","Onion","Tomato","Green chili","Mustard seeds","Turmeric","Coriander"],
        steps: ["Toast torn bread lightly","Temper mustard & chili, sauté onion","Add tomato & spices","Toss bread to coat, garnish"],
      },
      curry: {
        title: "Leftover Curry Pasta",
        ingredients: ["Leftover curry","Pasta","Garlic","Olive oil","Cilantro","Lemon"],
        steps: ["Boil pasta al dente","Warm curry with garlic","Toss pasta in curry sauce","Finish with lemon & cilantro"],
      },
    } as const)[type as "rice"|"bread"|"curry"] || {
      title: `${capitalize(type)} Reinvented Bowl`,
      ingredients: ["Leftover "+type, "Vegetables", "Garlic", "Olive oil", "Herbs"],
      steps: ["Sauté aromatics","Add leftovers & warm","Finish with herbs & serve"],
    };

    const chosen = base(body.foodType.toLowerCase());
    const response: GenerateRecipeResponse = {
      ok: true,
      recipe: {
        title: chosen.title,
        ingredients: chosen.ingredients,
        steps: chosen.steps,
        carbonFootprintGramsCO2e: 200,
        waterSavingsLiters: 15,
        videoQuery: `${body.foodType} leftover recipe quick healthy`,
      },
    };
    res.json(response);
  }
};

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
