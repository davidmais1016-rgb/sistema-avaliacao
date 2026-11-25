
"use client";

import { useState } from "react";

export default function Home() {
  const [pizza, setPizza] = useState(0);
  const [qualidade, setQualidade] = useState(0);
  const [atendimento, setAtendimento] = useState(0);
  const [ambiente, setAmbiente] = useState(0);
  const [sabor, setSabor] = useState("");
  const [comentario, setComentario] = useState("");
  const [nome, setNome] = useState("");
  const [enviado, setEnviado] = useState(false);

  const perguntas = [
    { titulo: "Como você avalia nossas pizzas?", valor: pizza, alterar: setPizza },
    { titulo: "Qualidade dos ingredientes e recheio", valor: qualidade, alterar: setQualidade },
    { titulo: "Como foi nosso atendimento?", valor: atendimento, alterar: setAtendimento },
    { titulo: "Como avalia nosso ambiente?", valor: ambiente, alterar: setAmbiente }
  ];

  function enviar() {
    if (!pizza || !qualidade || !atendimento || !ambiente) {
      alert("Por favor, responda todas as avaliações.");
      return;
    }
    setEnviado(true);
  }

  return (
    <main className="pagina">
      <header className="topo">
        <div className="logo">Iaiá<span>.</span></div>
        <div className="assinatura">EXPERIÊNCIA DO CLIENTE</div>
      </header>

      <section className="painel">
        {!enviado ? (
          <>
            <div className="selo">SUA OPINIÃO TEM VALOR</div>

            <h1>Queremos ouvir <span>você!</span></h1>
            <p className="descricao">
              Conte como foi sua experiência.
              Sua opinião faz a Iaiá crescer.
            </p>

            {perguntas.map((p, index) => (
              <div className="pergunta" key={index}>
                <h3>{index + 1}. {p.titulo}</h3>
                <div className="estrelas">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => p.alterar(n)}
                      className={n <= p.valor ? "ativa" : ""}
                    >★</button>
                  ))}
                </div>
                <small>
                  {["","Péssimo","Ruim","Regular","Muito bom","Excelente"][p.valor]}
                </small>
              </div>
            ))}

            <div className="campo">
              <label>Qual pizza você pediu?</label>
              <select value={sabor} onChange={e => setSabor(e.target.value)}>
                <option value="">Selecione o sabor</option>
                <option>Margherita</option>
                <option>Calabresa</option>
                <option>Frango com Catupiry</option>
                <option>Portuguesa</option>
                <option>Outro sabor</option>
              </select>
            </div>

            <div className="campo">
              <label>Seu nome (opcional)</label>
              <input
                placeholder="Como podemos chamar você?"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Deixe seu comentário</label>
              <textarea
                placeholder="O que você mais gostou? O que podemos melhorar?"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                rows={4}
              />
            </div>

            <button className="enviar" onClick={enviar}>
              ENVIAR MINHA AVALIAÇÃO →
            </button>

            <p className="privacidade">
              Obrigado por ajudar a Iaiá a melhorar!
            </p>
          </>
        ) : (
          <div className="sucesso">
            <div className="coracao">♥</div>
            <h1>Obrigado!</h1>
            <p>
              Sua opinião é muito importante
              para nós. Esperamos você novamente!
            </p>
            <button className="enviar" onClick={() => {
              setPizza(0);
              setQualidade(0);
              setAtendimento(0);
              setAmbiente(0);
              setSabor("");
              setComentario("");
              setNome("");
              setEnviado(false);
            }}>
              NOVA AVALIAÇÃO
            </button>
          </div>
        )}
      </section>

      <footer>
        <strong>IAIÁ</strong>
        <p>Feito com carinho para você ♥</p>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; }

        .pagina {
          min-height: 100vh;
          background: radial-gradient(circle at top right,#812d46,transparent 40%),linear-gradient(145deg,#350b1b,#68182f);
          padding: 30px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .topo {
          width: 100%;
          max-width: 700px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .logo {
          font: bold 43px Georgia,serif;
          letter-spacing: -2px;
        }
        .logo span { color: #e9bc58; }
        .assinatura { color: #e9c77e; font-size: 9px; letter-spacing: 2px; }

        .painel {
          background: #fffdf9;
          width: 100%;
          max-width: 620px;
          border-radius: 22px;
          padding: 38px 30px;
          margin: 35px 0;
          box-shadow: 0 25px 70px #21071366;
        }

        .selo {
          color: #a77b31;
          text-align: center;
          font-size: 10px;
          letter-spacing: 3px;
          font-weight: bold;
        }

        h1 {
          font: 42px Georgia,serif;
          color: #501329;
          text-align: center;
          margin: 22px 0 10px;
        }
        h1 span { color: #b78b3d; }

        .descricao {
          text-align: center;
          color: #77716d;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .pergunta {
          border-top: 1px solid #eee4dc;
          padding: 19px 0;
        }

        .pergunta h3 {
          color: #501329;
          font-size: 15px;
          margin: 0 0 13px;
        }

        .estrelas { display: flex; gap: 10px; }
        .estrelas button {
          border: none;
          background: transparent;
          color: #ddd5cc;
          font-size: 34px;
          cursor: pointer;
          padding: 0;
        }
        .estrelas button.ativa { color: #c49a43; }

        .pergunta small {
          color: #a77b31;
          display: block;
          margin-top: 6px;
        }

        .campo { margin: 19px 0; }
        .campo label {
          display: block;
          color: #501329;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 9px;
        }

        .campo input, .campo select, .campo textarea {
          width: 100%;
          border: 1px solid #e7ded5;
          border-radius: 10px;
          padding: 14px;
          font: 14px Arial;
          color: #501329;
          background: white;
          outline-color: #b78b3d;
        }

        .campo textarea { resize: vertical; }

        .enviar {
          width: 100%;
          background: #64182f;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 17px;
          font-weight: bold;
          letter-spacing: 1px;
          cursor: pointer;
          margin-top: 15px;
        }

        .enviar:hover { background: #8a2948; }

        .privacidade {
          text-align: center;
          color: #999;
          font-size: 11px;
          margin-top: 18px;
        }

        .sucesso { text-align: center; padding: 35px 0; }
        .sucesso p { color: #777; line-height: 1.7; }
        .coracao { color: #b78b3d; font-size: 65px; }

        footer {
          text-align: center;
          color: #e9c77e;
          font-size: 11px;
          letter-spacing: 2px;
        }
        footer p { color: #ffffffa0; letter-spacing: 1px; }

        @media(max-width:480px) {
          .painel { padding: 30px 19px; }
          h1 { font-size: 35px; }
          .assinatura { font-size: 8px; letter-spacing: 1px; }
        }
      `}</style>
    </main>
  );
}
