"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/review";

type Props = {
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
};

export function ProductPicker({ selectedProduct, onSelect }: Props) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const keyword = q.trim();
    if (keyword.length === 0) {
      setResults([]);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/products?q=${encodeURIComponent(keyword)}`, { cache: "no-store" });
        const data = (await res.json()) as Product[];
        if (!res.ok) {
          setError("検索に失敗した");
          setResults([]);
          return;
        }
        setResults(data);
      } catch {
        setError("検索に失敗した");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [q]);

  const handleCreateProduct = async () => {
    const keyword = q.trim();
    if (!keyword) return;

    try {
      setCreating(true);
      setError("");

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            name: keyword,
            image_url: "",
            product_url: "",
          },
        }),
      });

      const data = (await res.json()) as Product;

      if (!res.ok) {
        setError("商品作成に失敗した");
        return;
      }

      setResults([data]);
      onSelect(data);
      setQ(data.name);
    } catch {
      setError("商品作成に失敗した");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section style={{ display: "grid", gap: 10 }}>
      <div style={{ fontWeight: 700 }}>商品を選ぶ</div>

      {selectedProduct ? (
        <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 10 }}>
          <div style={{ fontWeight: 700 }}>{selectedProduct.name}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {selectedProduct.source}:{selectedProduct.external_id}
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 12, opacity: 0.7 }}>まだ選ばれていません</div>
      )}

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="例: 果汁"
        style={{ border: "1px solid #ddd", borderRadius: 10, padding: 10 }}
      />

      {loading && <div style={{ fontSize: 12, opacity: 0.7 }}>検索中...</div>}
      {error && <div style={{ color: "crimson", fontSize: 12 }}>{error}</div>}

      {results.length > 0 && (
        <div style={{ display: "grid", gap: 8 }}>
          {results.slice(0, 5).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              style={{
                textAlign: "left",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 10,
                background: "white",
                color: "#111",
              }}
            >
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {p.source}:{p.external_id}
              </div>
            </button>
          ))}
        </div>
      )}

      {q.trim().length > 0 && !loading && results.length === 0 && !error && (
        <button
          type="button"
          onClick={handleCreateProduct}
          disabled={creating}
          style={{
            textAlign: "left",
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 10,
            background: "white",
            color: "#111",
          }}
        >
          {creating ? "追加中..." : `「${q.trim()}」を追加（manual）`}
        </button>
      )}
    </section>
  );
}