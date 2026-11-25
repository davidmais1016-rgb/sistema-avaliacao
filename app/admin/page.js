
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("Faça login para acessar o painel.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setReviews(data || []);

      setLoading(false);
    }

    loadReviews();
  }, []);

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.overall), 0) / reviews.length).toFixed(1)
    : "0.0";

  const categories = [
    ["Qualidade", "product_quality"],
    ["Sabor e apresentação", "taste_presentation"],
    ["Atendimento", "service"],
    ["Tempo de espera", "waiting_time"],
    ["Experiência geral", "overall"]
  ];

  if (loading) return <main style={{padding:30}}>Carregando avaliações...</main>;

  return (
    <main style={{
      minHeight:"100vh",
      background:"#f7f3f4",
      padding:24,
      fontFamily:"Arial",
      color:"#451020"
    }}>
      <header style={{
        background:"#5b1025",
        color:"white",
        padding:25,
        borderRadius:18
      }}>
        <h1 style={{fontSize:36, margin:0}}>Iaiá</h1>
        <p>Painel administrativo de avaliações Iaiá</p>
      </header>

      {error && <p style={{color:"red"}}>{error}</p>}

      <section style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
        gap:15,
        marginTop:20
      }}>
        <article style={box}>
          <h2>{reviews.length}</h2>
          <p>Total de avaliações</p>
        </article>
        <article style={box}>
          <h2>{average} ⭐</h2>
          <p>Média geral</p>
        </article>
      </section>

      <h2>Desempenho por categoria</h2>

      {categories.map(([name, key]) => {
        const avg = reviews.length
          ? reviews.reduce((s,r) => s + Number(r[key] || 0),0) / reviews.length
          : 0;

        return (
          <article key={key} style={box}>
            <strong>{name}</strong>
            <p>{avg.toFixed(1)} / 5 ⭐</p>
            <div style={{background:"#e6dadd",height:9,borderRadius:10}}>
              <div style={{
                background:"#b58a27",
                width:`${avg * 20}%`,
                height:9,
                borderRadius:10
              }}/>
            </div>
          </article>
        );
      })}

      <h2>Comentários dos clientes</h2>

      {reviews.map(r => (
        <article key={r.id} style={box}>
          <strong>{r.flavor || "Sabor não informado"}</strong>
          <p>Nota: {r.overall}/5 ⭐</p>
          <p>{r.comment || "Sem comentário"}</p>
          <small>
            {new Date(r.created_at).toLocaleString("pt-BR")}
          </small>
        </article>
      ))}

      {reviews.length === 0 && !error &&
        <p>Nenhuma avaliação recebida ainda.</p>
      }
    </main>
  );
}

const box = {
  background:"white",
  padding:20,
  borderRadius:14,
  marginBottom:14,
  boxShadow:"0 2px 8px #0000000a"
};

