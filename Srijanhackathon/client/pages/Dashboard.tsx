import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const trend = [
  { day: "Mon", meals: 2, water: 40 },
  { day: "Tue", meals: 3, water: 60 },
  { day: "Wed", meals: 1, water: 18 },
  { day: "Thu", meals: 4, water: 70 },
  { day: "Fri", meals: 2, water: 35 },
  { day: "Sat", meals: 5, water: 90 },
  { day: "Sun", meals: 3, water: 54 },
];

const totals = [
  { name: "CO₂", value: 62, color: "#059669" },
  { name: "Water", value: 38, color: "#0ea5a4" },
];

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Impact Dashboard</h1>
          <a href="/" className="text-sm rounded-full border px-3 py-1.5 bg-white hover:bg-muted">Back to Home</a>
        </div>
        <p className="text-sm text-muted-foreground">Your sustainability at a glance</p>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Meals & Water Saved (week)</h3>
            <div className="mt-2 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="meals" stroke="#16a34a" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="water" stroke="#0ea5a4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Total Savings Split</h3>
            <div className="mt-2 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={totals} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={4}>
                    {totals.map((t, i) => (<Cell key={i} fill={t.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold">Streak & Achievements</h3>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
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
            <h3 className="text-sm font-semibold">Category Savings</h3>
            <div className="mt-2 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{cat:"Grains",v:30},{cat:"Bread",v:18},{cat:"Curries",v:25},{cat:"Veggies",v:22}] }>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="cat" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="v" fill="#f59e0b" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
