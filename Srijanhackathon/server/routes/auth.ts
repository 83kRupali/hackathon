import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb } from "../mongo";

const COOKIE_NAME = "ecobite_token";
const JWT_SECRET = process.env.JWT_SECRET || "insecure-dev-secret-change";

function setAuthCookie(res: any, token: string) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    secure: isProd,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}

export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    res.status(400).json({ ok: false, error: "Missing name, email or password" });
    return;
  }
  try {
    const db = await getDb();
    const users = db.collection("users");
    const existing = await users.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      res.status(409).json({ ok: false, error: "Email already registered" });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = { name, email: String(email).toLowerCase(), passwordHash: hash, createdAt: new Date() };
    const { insertedId } = await users.insertOne(user as any);
    const token = jwt.sign({ sub: String(insertedId), email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
    setAuthCookie(res, token);
    res.json({ ok: true, user: { id: String(insertedId), name: user.name, email: user.email } });
  } catch (e: any) {
    if (String(e?.message || '').includes('MONGODB_URI')) {
      res.status(503).json({ ok: false, error: "MongoDB not configured. Set MONGODB_URI to enable auth." });
      return;
    }
    res.status(500).json({ ok: false, error: "Registration failed" });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ ok: false, error: "Missing email or password" });
    return;
  }
  try {
    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne<{ _id: any; name: string; email: string; passwordHash: string }>({ email: String(email).toLowerCase() } as any);
    if (!user) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
      return;
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ sub: String(user._id), email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
    setAuthCookie(res, token);
    res.json({ ok: true, user: { id: String(user._id), name: user.name, email: user.email } });
  } catch (e: any) {
    if (String(e?.message || '').includes('MONGODB_URI')) {
      res.status(503).json({ ok: false, error: "MongoDB not configured. Set MONGODB_URI to enable auth." });
      return;
    }
    res.status(500).json({ ok: false, error: "Login failed" });
  }
};

export const logout: RequestHandler = async (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ ok: true });
};

export const me: RequestHandler = async (req, res) => {
  try {
    const token = (req as any).cookies?.[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!token) {
      res.json({ ok: true, user: null });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    res.json({ ok: true, user: { id: decoded.sub, name: decoded.name, email: decoded.email } });
  } catch {
    res.json({ ok: true, user: null });
  }
};
