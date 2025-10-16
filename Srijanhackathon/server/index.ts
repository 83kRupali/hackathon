import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleDemo } from "./routes/demo";
import { generateRecipe } from "./routes/recipes";
import { register, login, logout, me } from "./routes/auth";
import { detectFood, detectFoodMiddleware } from "./routes/vision";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Recipes
  app.post("/api/recipes/generate", generateRecipe);

  // Vision
  app.post("/api/vision/detect", detectFoodMiddleware, detectFood);

  // Auth
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.post("/api/auth/logout", logout);
  app.get("/api/auth/me", me);

  return app;
}
