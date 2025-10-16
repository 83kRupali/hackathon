import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiceIcon, BreadIcon, CurryIcon } from "@/components/icons";
import { Link } from "react-router-dom";

const data = [
  { slug: "veggie-fried-rice", name: "Veggie Fried Rice", icon: RiceIcon, tag: "Low impact" },
  { slug: "masala-bread-upma", name: "Masala Bread Upma", icon: BreadIcon, tag: "Low impact" },
  { slug: "leftover-curry-pasta", name: "Leftover Curry Pasta", icon: CurryIcon, tag: "Low impact" },
];

export default function Recipes() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Recipes</h1>
          <Link to="/" className="text-sm rounded-full border px-3 py-1.5 bg-white hover:bg-muted">Back to Home</Link>
        </div>
        <p className="text-sm text-muted-foreground">Creative ways to reuse leftovers</p>

        <div className="mt-4 grid gap-3">
          {data.map((it) => (
            <Card key={it.slug} className="rounded-2xl overflow-hidden border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="size-12 rounded-xl bg-amber-50 border grid place-items-center">
                    <it.icon className="size-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{it.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{it.tag}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button asChild size="sm"><Link to={`/recipes/${it.slug}`} state={{ foodType: it.name }}>View Full Recipe</Link></Button>
                      <Button asChild size="sm" variant="secondary"><Link to={`/recipes/${it.slug}`} state={{ foodType: it.name }}>Watch Video</Link></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
