import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LeafIcon,
  PlateIcon,
  RiceIcon,
  BreadIcon,
  CurryIcon,
} from "@/components/icons";
import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function Index() {
  const [scanOpen, setScanOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-amber-50/60 to-emerald-50/60">
      <div className="px-4 pb-24">
        <Hero />
        <Stats />
        <Scan setOpen={setScanOpen} />
        <Reminders />
        <QuickRecipes />
      </div>

      {scanOpen && <ScanModal onClose={() => setScanOpen(false)} />}
    </div>
  );
}

function Hero() {
  return (
    <div className="pt-5">
      <div className="rounded-3xl bg-white border p-4 flex items-center gap-3">
        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <LeafIcon className="size-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Your impact this week</p>
          <p className="text-base font-semibold">5 days waste-free</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
          +12%
        </span>
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { label: "Meals Saved", value: 24, unit: "meals", color: "bg-emerald-500" },
    { label: "CO₂ Saved", value: 18, unit: "kg", color: "bg-lime-500" },
    { label: "Water Saved", value: 320, unit: "L", color: "bg-teal-500" },
  ];
  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="rounded-2xl border-none shadow-sm bg-white">
            <CardContent className="p-3">
              <div className="text-[10px] text-muted-foreground">
                {it.label}
              </div>
              <div className="mt-1 flex items-end gap-1">
                <div className="text-xl font-bold leading-none">{it.value}</div>
                <div className="text-[10px] text-muted-foreground mb-0.5">
                  {it.unit}
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                <div
                  className={`h-1.5 rounded-full ${it.color}`}
                  style={{ width: `${Math.min(100, it.value)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function Scan({ setOpen }: { setOpen: (v: boolean) => void }) {
  return (
    <div className="mt-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="rounded-3xl border bg-gradient-to-br from-emerald-100 via-amber-100 to-transparent p-6 text-center">
          <p className="text-sm text-muted-foreground">Primary action</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="mx-auto mt-3 block size-28 rounded-3xl bg-primary text-primary-foreground shadow-lg shadow-emerald-500/20 grid place-items-center"
            onClick={() => setOpen(true)}
            aria-label="Scan Food"
          >
            <PlateIcon className="size-10 text-primary-foreground" />
          </motion.button>
          <div className="mt-3 text-sm font-medium">Scan Food</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload or take a photo to get recipe ideas
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function QuickRecipes() {
  const items = [
    {
      name: "Veggie Fried Rice",
      icon: RiceIcon,
      steps: ["Heat pan", "Add rice + veg", "Stir sauce"],
      save: "Saves 20L water vs alt",
    },
    {
      name: "Masala Bread Upma",
      icon: BreadIcon,
      steps: ["Toast bread", "Saute veggies", "Mix masala"],
      save: "Saves 12L water vs alt",
    },
    {
      name: "Leftover Curry Pasta",
      icon: CurryIcon,
      steps: ["Boil pasta", "Mix curry", "Top with herbs"],
      save: "Saves 9L water vs alt",
    },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-base font-semibold">Recipe Suggestions</h3>
        <span className="text-xs text-muted-foreground">3 ideas</span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3">
        {items.map((it) => (
          <Card key={it.name} className="rounded-2xl overflow-hidden border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="size-12 rounded-xl bg-amber-50 border grid place-items-center">
                  <it.icon className="size-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{it.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Low impact
                    </span>
                  </div>
                  <ul className="mt-1 text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    {it.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="mt-2 text-xs font-medium text-teal-700">
                    {it.save}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button asChild size="sm">
                      <Link
                        to={`/recipes/${it.name.toLowerCase().replace(/\s+/g, "-")}`}
                        state={{ foodType: it.name }}
                      >
                        View Full Recipe
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                      <Link
                        to={`/recipes/${it.name.toLowerCase().replace(/\s+/g, "-")}`}
                        state={{ foodType: it.name }}
                      >
                        Watch Video
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Reminders() {
  type Reminder = { id: string; name: string; at: number; done?: boolean };
  const [name, setName] = useState("");
  const [delta, setDelta] = useState<number>(60);
  const [at, setAt] = useState<string>("");
  const [items, setItems] = useState<Reminder[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ecb_reminders") || "[]");
    } catch {
      return [];
    }
  });
  const [now, setNow] = useState(Date.now());
  const [alert, setAlert] = useState<Reminder | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("ecb_reminders", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const timers = items
      .filter((r) => !r.done && r.at > Date.now())
      .map((r) => {
        const ms = Math.max(0, r.at - Date.now());
        const id = setTimeout(() => trigger(r), ms);
        return () => clearTimeout(id);
      });
    return () => {
      timers.forEach((fn) => fn());
    };
  }, [items]);

  function human(ms: number) {
    if (ms <= 0) return "now";
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const remM = m % 60;
    const remS = s % 60;
    return h > 0 ? `${h}h ${remM}m` : m > 0 ? `${m}m` : `${remS}s`;
  }

  function schedule(r: Reminder) {
    setItems((prev) => [...prev, r].sort((a, b) => a.at - b.at));
  }

  async function trigger(r: Reminder) {
    setAlert(r);
    try {
      await playChime();
    } catch {}
    if ("Notification" in window) {
      try {
        if (Notification.permission === "granted") {
          new Notification(`Reminder: ${r.name}`, {
            body: "Time to enjoy before it spoils!",
            icon: "/placeholder.svg",
          });
        }
      } catch {}
    }
  }

  function onSetReminder(e: React.FormEvent) {
    e.preventDefault();
    const base = at ? new Date(at).getTime() : Date.now() + delta * 60 * 1000;
    if (!isFinite(base) || base <= Date.now()) {
      toast({ title: "Pick a future time" });
      return;
    }
    const r: Reminder = {
      id: cryptoRandomId(),
      name: name || "Leftover",
      at: base,
    };
    schedule(r);
    requestNotif();
    toast({ title: "Reminder set successfully!" });
    setName("");
  }

  function markDone(id: string) {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: true } : r)),
    );
    if (alert?.id === id) setAlert(null);
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-base font-semibold">Food Reminders</h3>
        <span className="text-xs text-muted-foreground">Reduce waste</span>
      </div>
      <Card className="mt-3 rounded-2xl">
        <CardContent className="p-4">
          <form
            onSubmit={onSetReminder}
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
          >
            <div>
              <label className="text-xs">Food name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cooked Rice"
                className="mt-1 w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setAt("");
                  setDelta(30);
                }}
                className={`rounded-xl border px-3 py-2 text-sm ${delta === 30 && !at ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}
              >
                30m
              </button>
              <button
                type="button"
                onClick={() => {
                  setAt("");
                  setDelta(60);
                }}
                className={`rounded-xl border px-3 py-2 text-sm ${delta === 60 && !at ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}
              >
                1h
              </button>
              <button
                type="button"
                onClick={() => {
                  setAt("");
                  setDelta(120);
                }}
                className={`rounded-xl border px-3 py-2 text-sm ${delta === 120 && !at ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}
              >
                2h
              </button>
            </div>
            <div>
              <label className="text-xs">Or pick time</label>
              <input
                type="datetime-local"
                value={at}
                onChange={(e) => setAt(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="w-full">
                Set Reminder
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <div className="mt-3 grid grid-cols-1 gap-2">
          {items
            .filter((r) => !r.done)
            .map((r) => (
              <Card key={r.id} className="rounded-2xl border bg-white">
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Reminder in {human(r.at - now)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => markDone(r.id)}
                  >
                    Mark as Done
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {alert && (
        <div className="mt-3 rounded-2xl border bg-amber-50 p-4 text-amber-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">
                Hey! Your {alert.name} is ready to eat 🍽️
              </p>
              <p className="text-xs mt-1">
                Enjoy while fresh. Green habits save water and carbon!
              </p>
            </div>
            <Button size="sm" onClick={() => markDone(alert.id)}>
              Mark as Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ScanModal({ onClose }: { onClose: () => void }) {
  const [freshness, setFreshness] = useState<
    "fresh" | "warn" | "expired" | null
  >(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [detected, setDetected] = useState<string>("");
  const [foodName, setFoodName] = useState("");
  const [desc, setDesc] = useState("");

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const detectFromFile = async (file: File) => {
    try {
      const fd = new FormData();
      fd.append("image", file, file.name || "photo.jpg");
      const r = await fetch("/api/vision/detect", { method: "POST", body: fd });
      const data = await r.json();
      const det = data?.detection || {};
      const name: string = String(det.name || "");
      const categoryRaw: string = String(det.category || "").toLowerCase();
      const n = name.toLowerCase();
      const isBread =
        /\b(bread|roti|chapati|chapathi|phulka|paratha|naan|tortilla|flatbread)\b/.test(
          n,
        ) ||
        categoryRaw.includes("bread") ||
        categoryRaw.includes("flatbread");
      const isCurry =
        /\b(curry|gravy|dal|daal|dhal|dahl|sambar|masala)\b/.test(n) ||
        categoryRaw.includes("curry") ||
        categoryRaw.includes("gravy");
      const isRice =
        /\b(rice|pulao|biryani|khichdi|khichri|fried rice)\b/.test(n) ||
        categoryRaw.includes("rice");
      let category: "rice" | "bread" | "curry" = isBread
        ? "bread"
        : isCurry
          ? "curry"
          : isRice
            ? "rice"
            : "rice";
      setDetected(category);
      if (!foodName) setFoodName(name || category);
    } catch {
      // ignore
    }
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPhoto(url);
    detectFromFile(f);
  };

  const DetectedIcon = useMemo(
    () =>
      detected === "rice"
        ? RiceIcon
        : detected === "bread"
          ? BreadIcon
          : detected === "curry"
            ? CurryIcon
            : PlateIcon,
    [detected],
  );

  const impact = useMemo(() => {
    const n = (foodName || detected || "").toLowerCase();
    let key: "rice" | "bread" | "curry" | "general" = "general";
    if (
      /\b(bread|roti|chapati|chapathi|phulka|paratha|naan|flatbread)\b/.test(n)
    )
      key = "bread";
    else if (/\b(curry|gravy|dal|daal|dhal|dahl|sambar|masala)\b/.test(n))
      key = "curry";
    else if (/\b(rice|pulao|biryani|khichdi|khichri|fried rice)\b/.test(n))
      key = "rice";
    const map = {
      rice: { co2: 450, water: 20 },
      bread: { co2: 350, water: 12 },
      curry: { co2: 550, water: 18 },
      general: { co2: 400, water: 15 },
    } as const;
    return map[key];
  }, [foodName, detected]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-3xl bg-white p-5">
        <div className="mx-auto h-1 w-12 rounded-full bg-muted" />
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-base font-semibold">Scan Food</h3>
          <button className="text-sm text-muted-foreground" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="block rounded-2xl border bg-white p-4 text-center hover:bg-muted/50"
          >
            <div className="text-sm font-medium">Take Photo</div>
            <p className="mt-1 text-xs text-muted-foreground">Open camera</p>
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="block rounded-2xl border bg-white p-4 text-center hover:bg-muted/50"
          >
            <div className="text-sm font-medium">Upload from Gallery</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose an existing photo
            </p>
          </button>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onPick}
            className="hidden"
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={onPick}
            className="hidden"
          />
        </div>
        <div className="mt-3 rounded-2xl border p-2 flex items-center gap-3">
          <div className="size-12 rounded-xl bg-amber-50 border grid place-items-center">
            <DetectedIcon className="size-6 text-amber-600" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Detected</div>
            <div className="text-sm font-medium capitalize">
              {foodName || detected || "unknown"}
            </div>
          </div>
        </div>

        {photo && (
          <div className="mt-3 overflow-hidden rounded-2xl border">
            <img
              src={photo}
              alt="Scanned food"
              className="h-36 w-full object-cover"
            />
          </div>
        )}

        <div className="mt-3 grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm">Food name</label>
            <input
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder={
                detected === "rice"
                  ? "Leftover rice"
                  : detected === "bread"
                    ? "Day-old bread"
                    : detected === "curry"
                      ? "Leftover curry"
                      : "Food name"
              }
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Any notes (spicy, ingredients, etc.)"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              rows={2}
            />
          </div>
        </div>

        <div
          className="mt-4 grid grid-cols-3 gap-2"
          aria-label="Select freshness"
        >
          <button
            onClick={() => setFreshness("fresh")}
            className={`rounded-2xl border px-3 py-3 text-center ${freshness === "fresh" ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}
          >
            <div className="text-2xl">🟢</div>
            <div className="mt-1 text-xs font-medium">Fresh</div>
          </button>
          <button
            onClick={() => setFreshness("warn")}
            className={`rounded-2xl border px-3 py-3 text-center ${freshness === "warn" ? "bg-amber-50 border-amber-200" : "bg-white"}`}
          >
            <div className="text-2xl">🟡</div>
            <div className="mt-1 text-xs font-medium">Close to Expiry</div>
          </button>
          <button
            onClick={() => setFreshness("expired")}
            className={`rounded-2xl border px-3 py-3 text-center ${freshness === "expired" ? "bg-rose-50 border-rose-200" : "bg-white"}`}
          >
            <div className="text-2xl">🔴</div>
            <div className="mt-1 text-xs font-medium">Expired</div>
          </button>
        </div>

        {freshness === "expired" ? (
          <div className="mt-4 rounded-2xl border bg-rose-50 p-4 text-rose-800">
            <p className="text-sm font-semibold">
              This looks expired — avoid eating.
            </p>
            <div className="mt-2 flex gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                CO₂ impact: {impact.co2.toLocaleString()} g
              </span>
              <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                Water impact: {impact.water.toLocaleString()} L
              </span>
            </div>
            <p className="text-xs mt-2">
              Composting prevents these emissions and water losses. Store food
              properly and plan portions to reduce waste.
            </p>
          </div>
        ) : freshness ? (
          <div className="mt-4 rounded-2xl border bg-emerald-50 p-4 text-emerald-800">
            <p className="text-sm font-medium">Good to go</p>
            <p className="text-xs mt-1">
              We'll suggest recipes using your item. Check out the ideas below
              on Home.
            </p>
          </div>
        ) : null}

        {(freshness === "fresh" || freshness === "warn") && (
          <SuggestedRecipes
            detected={detected}
            foodName={foodName}
            freshness={freshness}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

function SuggestedRecipes({
  detected,
  foodName,
  freshness,
  onClose,
}: {
  detected: string;
  foodName: string;
  freshness: "fresh" | "warn" | "expired" | null;
  onClose: () => void;
}) {
  const base = {
    rice: ["Veggie Fried Rice", "Rice Veg Stir-Fry", "Rice Cutlets"],
    bread: ["Masala Bread Upma", "Bread Poha", "Garlic Bread Scramble"],
    curry: ["Leftover Curry Pasta", "Curry Fried Rice", "Curry Quesadilla"],
  } as const;
  const nm = (foodName || detected || "").toLowerCase();
  const key: "rice" | "bread" | "curry" =
    /\b(bread|roti|chapati|chapathi|phulka|paratha|naan|flatbread)\b/.test(nm)
      ? "bread"
      : /\b(curry|gravy|dal|daal|dhal|dahl|sambar|masala)\b/.test(nm)
        ? "curry"
        : /\b(rice|pulao|biryani|khichdi|khichri|fried rice)\b/.test(nm)
          ? "rice"
          : detected.includes("bread")
            ? "bread"
            : detected.includes("curry")
              ? "curry"
              : "rice";

  let list = base[key];
  if (
    key === "bread" &&
    /\b(roti|chapati|chapathi|phulka|paratha|naan)\b/.test(nm)
  ) {
    list = ["Chapati Veg Roll", "Masala Chapati Upma", "Chapati Quesadilla"];
  }
  const name = foodName.trim() || key;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold">Recipe options</h4>
      <div className="mt-2 grid grid-cols-1 gap-2">
        {list.map((label) => {
          const slug = label.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link
              key={label}
              to={`/recipes/${slug}`}
              state={{ foodType: name, freshness: freshness ?? "fresh" }}
              onClick={onClose}
              className="block rounded-xl border px-3 py-2 bg-emerald-50 text-emerald-800 border-emerald-200 text-sm font-medium text-center"
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function cryptoRandomId() {
  const a = new Uint8Array(8);
  (window.crypto || (window as any).msCrypto).getRandomValues(a);
  return Array.from(a)
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

async function playChime() {
  try {
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    o.start();
    setTimeout(() => {
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      o.stop(ctx.currentTime + 0.25);
    }, 200);
  } catch {}
}

function requestNotif() {
  if ("Notification" in window && Notification.permission === "default") {
    try {
      Notification.requestPermission();
    } catch {}
  }
}
