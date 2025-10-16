import type { RequestHandler } from "express";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const GEMINI_VISION_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const detectFoodMiddleware = upload.single("image");

export const detectFood: RequestHandler = async (req, res) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      res.status(400).json({ ok: false, error: "No image provided" });
      return;
    }
    const apiKey = process.env.GEMINI_API_KEY;

    const fallback = () => {
      const name = (file.originalname || "").toLowerCase();
      let guess = "unknown";
      if (/bread/.test(name)) guess = "bread";
      else if (/(curry|gravy)/.test(name)) guess = "curry";
      else if (/rice/.test(name)) guess = "rice";
      return {
        ok: true,
        detection: { name: guess, category: guess, confidence: 0.3 },
      };
    };

    if (!apiKey) {
      res.json(fallback());
      return;
    }

    const base64 = file.buffer.toString("base64");
    const prompt = `Identify the food in the photo. Return ONLY JSON with { "name": string, "category": string, "confidence": number }.
- name: human-friendly short name (e.g., "Veggie Fried Rice", "Bread", "Curry").
- category: one of: rice, bread, curry, or general term if unknown.
- confidence: 0..1.`;

    const r = await fetch(`${GEMINI_VISION_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: file.mimetype || "image/jpeg",
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: { temperature: 0.2, maxOutputTokens: 200 },
      }),
    });

    if (!r.ok) {
      res.json(fallback());
      return;
    }
    const data = await r.json();
    let text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    text = text.replace(/^```json[\r\n]*/i, "").replace(/```$/i, "");
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonText = jsonStart >= 0 ? text.slice(jsonStart, jsonEnd + 1) : "";
    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      parsed = {};
    }

    const name: string = String(parsed.name || "unknown");
    const category: string = String(parsed.category || inferCategory(name));
    const confidence: number = Math.max(
      0,
      Math.min(1, Number(parsed.confidence) || 0.5),
    );

    res.json({ ok: true, detection: { name, category, confidence } });
  } catch (e) {
    res
      .status(200)
      .json({
        ok: true,
        detection: { name: "unknown", category: "unknown", confidence: 0.2 },
      });
  }
};

function inferCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("bread")) return "bread";
  if (n.includes("curry") || n.includes("gravy")) return "curry";
  if (n.includes("rice")) return "rice";
  return "general";
}
