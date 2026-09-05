"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0e1a",
          color: "#eef0ff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "1rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <p
            style={{
              display: "inline-block",
              margin: 0,
              marginBottom: "1.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,138,42,0.3)",
              background: "rgba(255,138,42,0.1)",
              color: "#ff8a2a",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            CRITICAL ERROR
          </p>
          <h1 style={{ margin: 0, fontSize: "2.2rem", lineHeight: 1.2 }}>
            NOVERA OSS Crashed
          </h1>
          <p style={{ color: "#aab3d6", lineHeight: 1.6 }}>
            The server hit an unexpected fatal error. Please reload the page
            or try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              padding: "0.9rem 2rem",
              borderRadius: "1rem",
              border: "none",
              background:
                "linear-gradient(92deg, #3b6bff, #e23bff 60%, #ff8a2a)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          <p style={{ marginTop: "3rem", fontSize: "0.8rem", color: "#6b74a0" }}>
            Copyright NOVERA OSS — All Rights Reserved
          </p>
        </div>
      </body>
    </html>
  );
}
