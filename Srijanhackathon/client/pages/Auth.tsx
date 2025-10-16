import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-6">
        <h1 className="text-xl font-semibold">{mode === "login" ? "Login" : "Create Account"}</h1>
        <AuthForm mode={mode} />
        <div className="mt-3 text-sm">
          {mode === "login" ? (
            <button className="text-primary underline" onClick={() => setMode("register")}>No account? Register</button>
          ) : (
            <button className="text-primary underline" onClick={() => setMode("login")}>Have an account? Login</button>
          )}
        </div>
      </div>
    </div>
  );
}

function AuthForm({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
      const data = await r.json();
      if (!r.ok || data?.ok === false) {
        setError(data?.error || "Authentication failed");
        setLoading(false);
        return;
      }
      navigate("/");
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4 rounded-2xl">
      <CardContent className="p-4">
        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-sm">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" required={mode === "register"} />
            </div>
          )}
          <div>
            <label className="text-sm">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" required />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" required />
          </div>
          {error && <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
