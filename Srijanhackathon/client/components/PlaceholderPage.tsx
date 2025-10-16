import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RecycleIcon } from "@/components/icons";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <RecycleIcon className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">This screen will be built next. Continue prompting to fill it out.</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Want this screen to be fully functional? Ask to generate it now. We'll match EcoBite's modern, minimal, food-themed style.
          </p>
          <div className="mt-4">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
