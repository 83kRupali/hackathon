import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeafIcon, TrophyIcon, RecycleIcon } from "@/components/icons";

export default function Rewards() {
  const badges = [
    { name: "Food Saver", icon: LeafIcon, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { name: "Water Warrior", icon: RecycleIcon, color: "text-teal-700 bg-teal-50 border-teal-200" },
    { name: "CO₂ Cutter", icon: TrophyIcon, color: "text-lime-700 bg-lime-50 border-lime-200" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Rewards</h1>
          <a href="/" className="text-sm rounded-full border px-3 py-1.5 bg-white hover:bg-muted">Back to Home</a>
        </div>
        <p className="text-sm text-muted-foreground">Earn coins, badges and climb the leaderboard</p>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Coins</div>
                <div className="text-2xl font-bold text-emerald-600">340</div>
              </div>
              <Badge className="bg-amber-500 text-white border-amber-600">Level 4</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Badges</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {badges.map((b) => (
                <div key={b.name} className={`rounded-2xl border p-3 text-center ${b.color}`}>
                  <div className="mx-auto size-10 rounded-xl bg-white/60 grid place-items-center">
                    <b.icon className="size-5" />
                  </div>
                  <div className="mt-2 text-xs font-medium">{b.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Leaderboard</h3>
            <div className="mt-2 space-y-2 text-sm">
              {["You", "Ava", "Noah", "Liam"].map((n, i) => (
                <div key={n} className="flex items-center justify-between rounded-xl border bg-white p-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 grid place-items-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">{i+1}</div>
                    <span>{n}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{(400 - i*20)} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
