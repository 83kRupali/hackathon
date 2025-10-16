import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LeafIcon, TrophyIcon, UserIcon, ChartIcon, BookIcon } from "@/components/icons";

export default function Layout() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith("/onboarding");

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background text-foreground flex flex-col">
      {!hideChrome && (
        <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <LeafIcon className="size-5 text-primary" />
              </div>
              <div className="leading-tight">
                <p className="text-xs text-muted-foreground">Welcome to</p>
                <h1 className="text-lg font-semibold tracking-tight">EcoBite</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AuthBadge />
            </div>
          </div>
        </header>
      )}

      <main className={cn("flex-1", hideChrome ? "pb-0" : "pb-20")}> 
        <Outlet />
      </main>

      {!hideChrome && (
        <nav className="fixed inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-md border-t bg-white/90 backdrop-blur">
            <div className="grid grid-cols-4 px-1 py-1.5">
              <Tab to="/recipes" label="Recipes" icon={BookIcon} />
              <Tab to="/dashboard" label="Dashboard" icon={ChartIcon} />
              <Tab to="/rewards" label="Rewards" icon={TrophyIcon} />
              <Tab to="/profile" label="Profile" icon={UserIcon} />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

function Tab({ to, label, icon: Icon }: { to: string; label: string; icon: (props: { className?: string }) => JSX.Element }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className={cn("size-9 rounded-xl flex items-center justify-center border", isActive ? "bg-primary/10 border-primary/20" : "bg-muted/60 border-transparent")}> 
            <Icon className={cn("size-5", isActive ? "text-primary" : "text-foreground/70")} />
          </div>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

function AuthBadge() {
  const [me, setMe] = useState<{ name?: string; email?: string } | null>(null);
  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => { if (d?.ok && d.user) setMe(d.user); }).catch(() => {});
  }, []);
  if (!me) {
    return (
      <a href="/auth" className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Login</a>
    );
  }
  return (
    <button
      className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200"
      onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); location.reload(); }}
    >
      Logout
    </button>
  );
}
