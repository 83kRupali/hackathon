/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export interface GenerateRecipeRequest {
  foodType: string;
  freshness: "fresh" | "warn" | "expired";
}

export interface GeneratedRecipe {
  title: string;
  ingredients: string[];
  steps: string[];
  carbonFootprintGramsCO2e: number;
  waterSavingsLiters: number;
  videoQuery: string;
}

export type GenerateRecipeResponse =
  | { ok: true; recipe: GeneratedRecipe }
  | { ok: false; reason: string; tips?: string[] };

export interface DetectFoodResponse {
  ok: boolean;
  detection?: { name: string; category: string; confidence: number };
  error?: string;
}
