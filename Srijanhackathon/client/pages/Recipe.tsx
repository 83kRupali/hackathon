import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GenerateRecipeRequest, GenerateRecipeResponse } from "@shared/api";

export default function Recipe() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation() as any;
  const foodType: string = location.state?.foodType ?? (slug || "leftover").replace(/-/g, " ");
  const freshness: "fresh" | "warn" | "expired" = location.state?.freshness ?? "fresh";

  const mutation = useMutation<GenerateRecipeResponse, Error, GenerateRecipeRequest>({
    mutationFn: async (vars) => {
      const r = await fetch("/api/recipes/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(vars) });
      return r.json();
    },
  });

  useEffect(() => {
    mutation.mutate({ foodType, freshness });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodType, freshness]);

  const r = mutation.data;
  const ok = r && r.ok === true;
  const recipe = ok ? (r as any).recipe as any : null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm bg-white hover:bg-muted">
            <span className="text-emerald-700">←</span>
            <span>Back to Home</span>
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-semibold capitalize">{foodType}</h1>
          <p className="text-sm text-muted-foreground">Freshness: {freshness === "warn" ? "Close to Expiry" : freshness === "expired" ? "Expired" : "Fresh"}</p>
        </div>

        {!r && (
          <div className="text-sm text-muted-foreground">Generating recipe...</div>
        )}

        {r && r.ok === false && r.reason !== "expired" && (
          <Card className="rounded-2xl border bg-amber-50 text-amber-900">
            <CardContent className="p-4">
              <p className="font-medium">Could not generate recipe automatically.</p>
              <p className="text-sm mt-1">Please try again in a moment.</p>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => mutation.mutate({ foodType, freshness })}>Retry</Button>
                <Button variant="secondary" asChild><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(foodType+" leftover recipe")}`} target="_blank" rel="noreferrer">Search on YouTube</a></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {r && r.ok === false && r.reason === "expired" && (
          <Card className="rounded-2xl border bg-rose-50 text-rose-800">
            <CardContent className="p-4">
              <p className="font-medium">This item is expired. Please don\'t consume.</p>
              <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                {(r.tips || []).map((t) => (<li key={t}>{t}</li>))}
              </ul>
            </CardContent>
          </Card>
        )}

        {ok && (
          <>
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{recipe.title}</h2>
                    <div className="mt-1 flex gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">CO₂ saved: {(recipe.carbonFootprintGramsCO2e||0).toLocaleString()} g</span>
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Water saved: {(recipe.waterSavingsLiters||0).toLocaleString()} L</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold">Ingredients</h3>
                  <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    {recipe.ingredients.map((ing: string) => (<li key={ing}>• {ing}</li>))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold">Steps</h3>
                  <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {recipe.steps.map((s: string, i: number) => (
                      <li key={i} className="rounded-xl bg-white border p-3">
                        <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">{i+1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold">Watch Video</h3>
                  <div className="mt-2 overflow-hidden rounded-xl border aspect-video bg-black/5">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(recipe.videoQuery || (foodType+" leftover recipe"))}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Cook this</Button>
                  <Button variant="secondary">Share</Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
