// Location: app/stats/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type InventoryItem = {
  componentType: string;
};

const componentTypes = [
  ["Subwoofer", "Subwoofers"],
  ["Equalizer", "Equalizers"],
  ["HeadUnit", "Head Units"],
  ["Amplifier", "Amplifiers"],
  ["Speakers", "Speakers"],
  ["Tweeters", "Tweeters"],
  ["DSP", "DSP"],
  ["WiringKit", "Wiring Kits"],
  ["Capacitor", "Capacitors"],
] as const;

export default function StatsPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/inventory")
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudieron cargar las estadísticas");
        setInventory(await response.json());
      })
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar las estadísticas");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="inventory-shell">
      <div>
        <header className="inventory-hero">
          <div>
            <p className="eyebrow">Inventario / Lectura del sistema</p>
            <h1 className="inventory-title">La instalación, en números.</h1>
            <p className="inventory-intro">Consulta la distribución actual de componentes registrados en el catálogo del taller.</p>
          </div>
          <div className="hero-count"><strong>{inventory.length}</strong><span>piezas registradas</span></div>
        </header>

        {error && <p className="error-message" role="alert">{error}</p>}
        {isLoading ? <p className="loading-state">Cargando estadísticas...</p> : (
          <section>
            <div className="section-heading">
              <h2>Distribución por componente</h2>
              <Link href="/">Volver al inventario</Link>
            </div>
            <div className="inventory-grid">
              {componentTypes.map(([componentType, label], index) => (
                <article className="inventory-card" key={componentType}>
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="card-type">{label}</p>
                  <p className="inventory-stat-value">
                    {inventory.filter((item) => item.componentType === componentType).length}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}