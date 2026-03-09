"use client";

import { useState } from "react";

export default function NewReviewPage() {
  const [productId, setProductId] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [flavor, setFlavor] = useState<number>(3);
  const [texture, setTexture] = useState<number>(3);
  const [hardness, setHardness] = useState<number>(3);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const pid = Number(productId);
    if (!pid || pid <= 0) {
      setError("product_id を正しく入力してね");
      return;
    }
    if (!body.trim()) {
      setError("本文(body)は必須だよ");
      return;
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: pid,
        review: {
          body,
          flavor_rating: flavor,
          texture_rating: texture,
          hardness_level: hardness,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data?.errors?.join("\n") ?? data?.error ?? "投稿に失敗した");
      return;
    }

    setSuccess("投稿できた！");
    setBody("");
  }

  return (
    <main style={{ padding: 16, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>レビュー投稿</h1>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>product_id（数字）</span>
          <input
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            inputMode="numeric"
            placeholder="例: 1"
            style={{ border: "1px solid #ddd", borderRadius: 10, padding: 10 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>本文</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            style={{ border: "1px solid #ddd", borderRadius: 10, padding: 10 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>味（1〜5）</span>
          <input type="number" min={1} max={5} value={flavor} onChange={(e) => setFlavor(Number(e.target.value))} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>食感（1〜5）</span>
          <input type="number" min={1} max={5} value={texture} onChange={(e) => setTexture(Number(e.target.value))} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>固さ（1〜5）</span>
          <input
            type="number"
            min={1}
            max={5}
            value={hardness}
            onChange={(e) => setHardness(Number(e.target.value))}
          />
        </label>

        {error && <pre style={{ whiteSpace: "pre-wrap", color: "crimson" }}>{error}</pre>}
        {success && <div style={{ color: "green" }}>{success}</div>}

        <button type="submit" style={{ border: "1px solid #ddd", borderRadius: 10, padding: 10 }}>
          投稿する
        </button>
      </form>
    </main>
  );
}