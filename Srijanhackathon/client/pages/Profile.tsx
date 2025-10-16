import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LeafIcon, TrophyIcon, RecycleIcon } from "@/components/icons";

export default function Profile() {
  const achievements = ["Food Saver", "Water Warrior", "CO₂ Cutter"];
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Profile</h1>
          <a href="/" className="text-sm rounded-full border px-3 py-1.5 bg-white hover:bg-muted">Back to Home</a>
        </div>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Anshumala Pandit</div>
                <div className="text-xs text-muted-foreground">@ecobiter</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border bg-white p-3">
                <div className="text-2xl font-bold text-emerald-600">5</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="rounded-2xl border bg-white p-3">
                <div className="text-2xl font-bold text-amber-600">12</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
              <div className="rounded-2xl border bg-white p-3">
                <div className="text-2xl font-bold text-emerald-600">340</div>
                <div className="text-xs text-muted-foreground">Coins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Achievements</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[LeafIcon, RecycleIcon, TrophyIcon].map((Icon, i) => (
                <div key={i} className="rounded-2xl border bg-white p-3 text-center">
                  <div className="mx-auto size-10 rounded-xl bg-emerald-50 grid place-items-center border">
                    <Icon className="size-5 text-emerald-700" />
                  </div>
                  <div className="mt-2 text-xs font-medium">{achievements[i]}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Settings</h3>
            <div className="mt-2 space-y-2 text-sm">
              {["Edit profile", "Notifications", "Privacy", "Logout"].map((s) => (
                <div key={s} className="flex items-center justify-between rounded-xl border bg-white p-3">
                  <span>{s}</span>
                  <span className="text-xs text-muted-foreground">›</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
