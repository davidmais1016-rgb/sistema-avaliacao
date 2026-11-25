"use client";

import { useState } from "react";

/* ===== AJUSTE AQUI ===== */
// Rota que já recebe as avaliações no seu projeto (mantenha a atual, se for diferente).
const ENDPOINT = "/api/avaliacoes";
// Sabores exibidos. Edite à vontade.
const SABORES = ["Margherita", "Calabresa", "Quatro Queijos", "Portuguesa", "Frango com Catupiry", "Marguerita Especial"];
/* ======================= */

const CRITERIOS = [
  { id: "massa", nome: "Massa" },
  { id: "recheio", nome: "Recheio" },
  { id: "sabor", nome: "Sabor" },
  { id: "apresentacao", nome: "Apresentação" },
  { id: "atendimento", nome: "Atendimento" },
];
const NOTAS = ["", "Precisa melhorar", "Poderia ser melhor", "Bom", "Muito bom", "Perfeito!"];
const ESPERA = ["Muito rápido", "Dentro do esperado", "Demorou um pouco", "Demorou demais"];
const VOLTARIA = ["Com certeza", "Talvez", "Provavelmente não"];

function Estrela() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" strokeLinejoin="round" />
    </svg>
  );
}

function Estrelas({ valor, onChange, nome }) {
  const [pop, setPop] = useState(0);
  return (
    <div className="estrelas" role="radiogroup" aria-label={`Nota para ${nome}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={valor === n}
          aria-label={`${n} de 5`}
          className={`estrela ${n <= valor ? "on" : ""} ${pop === n ? "pop" : ""}`}
          onClick={() => { onChange(n); setPop(n); setTimeout(() => setPop(0), 450); }}
        >
          <Estrela />
        </button>
      ))}
    </div>
  );
}

function Chips({ opcoes, valor, onChange }) {
  return (
    <div className="chips">
      {opcoes.map((o) => (
        <button key={o} type="button" className="chip" aria-pressed={valor === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Page() {
  const [etapa, setEtapa] = useState(0); // 0 boas-vindas · 1-4 formulário · 5 obrigado
  const [dir, setDir] = useState("avanca");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [d, setD] = useState({
    sabor: "", outroSabor: "", nome: "", notas: {}, espera: "", voltaria: "", comentario: "",
  });

  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const saborFinal = d.sabor === "Outro" ? d.outroSabor.trim() : d.sabor;

  const valido = {
    1: !!saborFinal,
    2: CRITERIOS.every((c) => d.notas[c.id]),
    3: !!d.espera && !!d.voltaria,
    4: true,
  };

  const ir = (n) => { setDir(n > etapa ? "avanca" : "volta"); setErro(""); setEtapa(n); };

  async function enviar() {
    setEnviando(true); setErro("");
    const payload = {
      sabor: saborFinal,
      nome: d.nome.trim() || null,
      massa: d.notas.massa,
      recheio: d.notas.recheio,
      sabor_nota: d.notas.sabor,
      apresentacao: d.notas.apresentacao,
      atendimento: d.notas.atendimento,
      tempo_espera: d.espera,
      voltaria: d.voltaria,
      comentario: d.comentario.trim(),
    };
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error();
      ir(5);
    } catch {
      setErro("Não conseguimos enviar agora. Confira sua conexão e toque em enviar de novo.");
    } finally {
      setEnviando(false);
    }
  }

  function reiniciar() {
    setD({ sabor: "", outroSabor: "", nome: "", notas: {}, espera: "", voltaria: "", comentario: "" });
    setDir("volta"); setEtapa(0);
  }

  const primeiroNome = d.nome.trim().split(" ")[0];

  return (
    <main className="app">
      <div className="palco">
        {/* ---------- BOAS-VINDAS ---------- */}
        {etapa === 0 && (
          <section className="obrigado" style={{ animation: "none" }}>
            <div className="logo entrada" role="img" aria-label="Iaiá Pizzaria Artesanal" />
            <h1>Como foi a sua noite na Iaiá?</h1>
            <p className="sub centro">Leva menos de um minuto e ajuda a gente a assar uma pizza ainda melhor.</p>
            <button className="btn principal grande" onClick={() => ir(1)}>Começar avaliação</button>
          </section>
        )}

        {/* ---------- FORMULÁRIO ---------- */}
        {etapa >= 1 && etapa <= 4 && (
          <>
            <div className="logo pequena" role="img" aria-label="Iaiá Pizzaria Artesanal" style={{ alignSelf: "center" }} />
            <div className="fatias" aria-label={`Etapa ${etapa} de 4`}>
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className={`fatia ${n < etapa ? "on" : n === etapa ? "atual" : ""}`} />
              ))}
            </div>

            <section className={`cartao ${dir}`} key={etapa}>
              {etapa === 1 && (
                <>
                  <h2>Qual pizza você provou?</h2>
                  <p className="sub">Escolha o sabor que veio à sua mesa.</p>
                  <Chips opcoes={[...SABORES, "Outro"]} valor={d.sabor} onChange={(v) => set("sabor", v)} />
                  {d.sabor === "Outro" && (
                    <input className="campo" style={{ marginTop: 12 }} placeholder="Qual sabor?" value={d.outroSabor}
                      onChange={(e) => set("outroSabor", e.target.value)} autoFocus />
                  )}
                  <label className="rotulo" htmlFor="nome">Seu nome <small>(opcional)</small></label>
                  <input id="nome" className="campo" placeholder="Como podemos te chamar?" value={d.nome}
                    onChange={(e) => set("nome", e.target.value)} autoComplete="given-name" />
                </>
              )}

              {etapa === 2 && (
                <>
                  <h2>Dê sua nota</h2>
                  <p className="sub">Toque nas estrelas para cada item.</p>
                  {CRITERIOS.map((c) => (
                    <div className="item" key={c.id}>
                      <div className="item-topo">
                        <span className="item-nome">{c.nome}</span>
                        <span className="item-dica">{NOTAS[d.notas[c.id] || 0]}</span>
                      </div>
                      <Estrelas nome={c.nome} valor={d.notas[c.id] || 0}
                        onChange={(n) => set("notas", { ...d.notas, [c.id]: n })} />
                    </div>
                  ))}
                </>
              )}

              {etapa === 3 && (
                <>
                  <h2>Tempo de espera</h2>
                  <p className="sub">Do pedido até a pizza chegar à mesa.</p>
                  <Chips opcoes={ESPERA} valor={d.espera} onChange={(v) => set("espera", v)} />
                  <span className="rotulo" style={{ marginTop: 28 }}>Você voltaria à Iaiá?</span>
                  <Chips opcoes={VOLTARIA} valor={d.voltaria} onChange={(v) => set("voltaria", v)} />
                </>
              )}

              {etapa === 4 && (
                <>
                  <h2>Quer nos contar mais?</h2>
                  <p className="sub">Elogios, ideias e sugestões são bem-vindos.</p>
                  <label className="rotulo" htmlFor="coment" style={{ position: "absolute", left: -9999 }}>Comentários</label>
                  <textarea id="coment" className="campo" placeholder="Escreva aqui o que quiser…" maxLength={800}
                    value={d.comentario} onChange={(e) => set("comentario", e.target.value)} />
                </>
              )}

              {erro && <p className="erro" role="alert">{erro}</p>}

              <div className="acoes">
                <button className="btn fantasma" onClick={() => ir(etapa - 1)}>Voltar</button>
                {etapa < 4 ? (
                  <button className="btn principal" disabled={!valido[etapa]} onClick={() => ir(etapa + 1)}>Continuar</button>
                ) : (
                  <button className="btn principal" disabled={enviando} onClick={enviar}>
                    {enviando ? "Enviando…" : "Enviar avaliação"}
                  </button>
                )}
              </div>
            </section>
          </>
        )}

        {/* ---------- AGRADECIMENTO ---------- */}
        {etapa === 5 && (
          <section className="obrigado">
            <span className="fatia" aria-hidden="true" />
            <h1>{primeiroNome ? `Obrigada, ${primeiroNome}!` : "Muito obrigada!"}</h1>
            <p className="sub centro">Sua opinião foi para a nossa cozinha. A Iaiá agradece e espera você de volta à mesa.</p>
            <div className="logo" role="img" aria-label="Iaiá Pizzaria Artesanal" />
            <button className="btn fantasma" style={{ marginTop: 8 }} onClick={reiniciar}>Nova avaliação</button>
          </section>
        )}

        <p className="rodape">Iaiá Pizzaria Artesanal</p>
      </div>
    </main>
  );
}
