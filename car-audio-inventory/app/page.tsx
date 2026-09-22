"use client";

import { FormEvent, useEffect, useState } from "react";

type InventoryItem = {
  id: string;
  componentType: string;
  specs: string;
};

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

export default function Home() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedType, setSelectedType] = useState("subwoofer");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const filteredInventory = inventory.filter((item) =>
    `${item.componentType} ${item.specs}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetch("/api/inventory")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load inventory");
        setInventory(await response.json());
      })
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "Could not load inventory");
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not add component");
      setInventory((currentInventory) => [...currentInventory, result]);
    } catch (saveError: unknown) {
      setError(saveError instanceof Error ? saveError.message : "Could not add component");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError("");

    try {
      const response = await fetch(`/api/inventory?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const result = response.status === 204 ? null : await response.json();
      if (!response.ok) throw new Error(result?.error ?? "Could not delete component");
      setInventory((currentInventory) => currentInventory.filter((item) => item.id !== id));
    } catch (deleteError: unknown) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete component");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="inventory-shell">
      <div>
        <header className="inventory-hero">
          <div>
            <p className="eyebrow">Inventario / Audio automotriz</p>
            <h1 className="inventory-title">Sonido serio para cada instalación.</h1>
            <p className="inventory-intro">Controla bocinas, amplificadores y señal desde un solo catálogo de taller.</p>
          </div>
          <div className="hero-count"><strong>{inventory.length}</strong><span>piezas en stock</span></div>
        </header>

        <section className="inventory-toolbar">
          <form className="contents" onSubmit={handleSubmit}>
            <label className="field-label">
              Agregar componente
              <select
                className="field-control"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                {componentTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <button className="action-button" disabled={isSaving} type="submit">
              {isSaving ? "Guardando..." : "+ Agregar pieza"}
            </button>
          </form>
          {error && <p className="error-message" role="alert">{error}</p>}
        </section>

        <section>
          <div className="section-heading">
            <h2>Catálogo de componentes</h2>
            <label className="field-label" htmlFor="inventory-search">
              Buscar
              <input
                className="field-control"
                id="inventory-search"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Nombre o especificación"
                type="search"
                value={searchTerm}
              />
            </label>
          </div>
          {isLoading ? <p className="loading-state">Cargando inventario...</p> : (
            <div className="inventory-grid">
              {filteredInventory.map((item, index) => (
                <article className="inventory-card" key={item.id}>
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="card-type">{item.componentType}</p>
                  <p className="card-specs">{item.specs}</p>
                  <button
                    className="delete-button"
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    type="button"
                  >
                    {deletingId === item.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      </main>
  );
}
