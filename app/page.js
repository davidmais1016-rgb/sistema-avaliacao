

"use client";

import { useState } from "react";

export default function Home() {
  const [nota, setNota] = useState(0);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#5b1025",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "Arial"
    }}>
      <section style={{
        background: "#fff",
        color: "#5b1025",
        borderRadius: 24,
        padding: 35,
        maxWidth: 500,
        width: "100%",
        textAlign: "center"
      }}>
        <h1 style={{fontSize: 48, margin: 0}}>
          Iaiá
        </h1>
        <h2 style={{color: "#d5a329"}}>
          SUA OPINIÃO IMPORTA!
        </h2>
        <p>Como foi sua experiência conosco?</p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap"
        }}>
          {[1,2,3,4,5].map((n) => (
            <button key={n}
              onClick={() => setNota(n)}
              style={{
                fontSize: 35,
                border: "none",
                background: "transparent",
                cursor: "pointer"
              }}>
              {n <= nota ? "⭐" : "☆"}
            </button>
          ))}
        </div>

        {nota > 0 && (
          <h3>Obrigado por avaliar! ❤️</h3>
        )}

        <p style={{color: "#777", marginTop: 30}}>
          Iaiá • Atendimento com carinho
        </p>
      </section>
    </main>
  );
}
