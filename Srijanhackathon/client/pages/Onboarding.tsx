import { useEffect, useRef, useState } from "react";
import { LeafIcon, PlateIcon, RecycleIcon } from "@/components/icons";
import { Link } from "react-router-dom";

export default function Onboarding() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const slides = [
    {
      title: "Food waste is a global problem",
      desc: "EcoBite helps you reuse leftovers to save money and the planet.",
      icon: LeafIcon,
      bg: "from-emerald-100 to-emerald-50",
    },
    {
      title: "Scan leftovers, get recipes",
      desc: "AI detects food type and suggests tasty ways to reuse it.",
      icon: PlateIcon,
      bg: "from-amber-100 to-amber-50",
    },
    {
      title: "Track your impact",
      desc: "See CO₂ and water saved with clean, friendly visuals.",
      icon: RecycleIcon,
      bg: "from-teal-100 to-teal-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 pt-10">
        <h1 className="text-2xl font-semibold tracking-tight">EcoBite</h1>
        <p className="mt-1 text-sm text-muted-foreground">Reuse leftovers. Reduce waste.</p>
      </div>
      <div className="mt-6 overflow-x-auto scroll-smooth" ref={scrollRef} style={{ scrollSnapType: "x mandatory" }}>
        <div className="flex" style={{ width: "300%" }}>
          {slides.map((s, i) => (
            <div className="min-w-0 flex-[0_0_100%] px-4" key={i} style={{ scrollSnapAlign: "start" }}>
              <div className={`mt-4 rounded-3xl border bg-gradient-to-b ${s.bg} p-6`}>
                <div className="mx-auto mb-5 size-20 rounded-3xl bg-white grid place-items-center border">
                  <s.icon className="size-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-6 rounded-2xl bg-white p-4 border">
                  <p className="text-xs text-muted-foreground">Infographic</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="h-20 rounded-xl bg-emerald-200" />
                    <div className="h-20 rounded-xl bg-amber-200" />
                    <div className="h-20 rounded-xl bg-teal-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-md px-4">
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${i === index ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <Link to="/" className="mt-6 mb-8 block rounded-2xl bg-primary px-4 py-3 text-center text-white font-medium">Start Saving Food</Link>
      </div>
    </div>
  );
}
