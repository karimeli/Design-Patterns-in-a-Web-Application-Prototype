// Location: app/add/page.tsx
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const componentTypes = [
  ["subwoofer", "Subwoofer"],
  ["equalizer", "Equalizer"],
  ["headunit", "Head Unit"],
  ["amplifier", "Amplifier"],
  ["speakers", "Speakers"],
  ["tweeters", "Tweeters"],
  ["dsp", "DSP"],
  ["wiringkit", "Wiring Kit"],
  ["capacitor", "Capacitor"],
] as const;

export default function AddComponentPage() {
  const [type, setType] = useState("subwoofer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "No se pudo agregar el componente");
      router.push("/");
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo agregar el componente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="inventory-shell">
      <div>
        <header className="inventory-hero">
          <div>
            <p className="eyebrow">Inventario / Alta de componente</p>
            <h1 className="inventory-title">Suma una pieza al catálogo.</h1>
            <p className="inventory-intro">Selecciona el componente que acaba de llegar al taller y quedará disponible en el inventario.</p>
          </div>
        </header>

        <section className="inventory-toolbar">
          <form className="contents" onSubmit={handleSubmit}>
            <label className="field-label">
              Tipo de componente
              <select className="field-control" value={type} onChange={(event) => setType(event.target.value)}>
                {componentTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <button className="action-button" disabled={loading} type="submit">
              {loading ? "Guardando..." : "+ Agregar pieza"}
            </button>
          </form>
          {error && <p className="error-message" role="alert">{error}</p>}
        </section>

        <p className="loading-state"><Link href="/">Volver al inventario</Link></p>
      </div>
    </main>
  );
}