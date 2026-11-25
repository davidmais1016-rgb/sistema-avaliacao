
"use client";

import { useState } from "react";

const criterios = [
  ["pizza", "Experiência com a pizza", "O conjunto da sua experiência"],
  ["massa", "Massa artesanal", "Textura, leveza e assamento"],
  ["recheio", "Recheio e ingredientes", "Qualidade e generosidade"],
  ["sabor", "Sabor", "O sabor que fica na memória"],
  ["atendimento", "Nosso atendimento", "A atenção da nossa equipe"],
  ["agilidade", "Tempo de espera", "Agilidade no preparo e entrega"]
];

const sabores = [
  "Margherita",
  "Calabresa",
  "Frango com Catupiry",
  "Portuguesa",
  "Quatro queijos",
  "Milho",
  "Camarão",
  "Outro sabor"
];

export default function Home() {
  const [etapa, setEtapa] = useState(0);
  const [notas, setNotas] = useState({});
  const [sabor, setSabor] = useState("");
  const [nome, setNome] = useState("");
  const [comentario, setComentario] = useState("");
  const [voltaria, setVoltaria] = useState("");
  const [enviado, setEnviado] = useState(false);

  function avancar() {
    if (etapa === 0 && !sabor) {
      alert("Selecione o sabor da pizza.");
      return;
    }
    if (etapa === 1 && criterios.some(c => !notas[c[0]])) {
      alert("Avalie todos os itens antes de continuar.");
      return;
    }
    setEtapa(etapa + 1);
  }

  function finalizar() {
    if (!voltaria) {
      alert("Responda se voltaria à Iaiá.");
      return;
    }
    setEnviado(true);
  }

  return (
    <main className="experience">
      <div className="ornamento ornamento1" />
      <div className="ornamento ornamento2" />

      <header className="header">
        <div>
          <div className="brand">Iaiá<span>.</span></div>
          <div className="brand-sub">PIZZARIA ARTESANAL</div>
        </div>
        <div className="header-right">
          <span>UMA EXPERIÊNCIA ESPECIAL</span>
          <div className="gold-line" />
        </div>
      </header>

      <section className="main-content">
        {!enviado ? (
          <>
            <div className="intro">
              <div className="eyebrow">
                <span>✦</span> IAIÁ EXPERIENCE <span>✦</span>
              </div>
              <h1>
                Cada detalhe<br />
                tem <i>sabor.</i>
              </h1>
              <p>
                Queremos conhecer sua experiência.
                Sua opinião inspira tudo aquilo que fazemos.
              </p>
            </div>

            <div className="survey">
              <div className="survey-top">
                <div>
                  <span className="muted-label">SUA AVALIAÇÃO</span>
                  <h2>
                    {etapa === 0 && "Vamos nos conhecer?"}
                    {etapa === 1 && "Conte como foi"}
                    {etapa === 2 && "Sua opinião importa"}
                  </h2>
                </div>
                <div className="step-number">
                  <strong>0{etapa + 1}</strong>
                  <span>/ 03</span>
                </div>
              </div>

              <div className="progress">
                <div style={{ width: `${(etapa + 1) * 33.333}%` }} />
              </div>

              {etapa === 0 && (
                <div className="form-content">
                  <div className="section-label">01 — SUA EXPERIÊNCIA</div>
                  <h3>Qual foi sua escolha?</h3>
                  <p className="help">Queremos saber qual sabor passou pela sua mesa.</p>

                  <div className="flavors">
                    {sabores.map((s, i) => (
                      <button
                        key={s}
                        className={sabor === s ? "flavor active" : "flavor"}
                        onClick={() => setSabor(s)}
                      >
                        <span className="flavor-number">0{i + 1}</span>
                        {s}
                        <span className="check">{sabor === s ? "✓" : "＋"}</span>
                      </button>
                    ))}
                  </div>

                  <div className="field">
                    <label>Como podemos chamar você?</label>
                    <input
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      placeholder="Seu nome (opcional)"
                    />
                  </div>

                  <button className="next" onClick={avancar}>
                    CONTINUAR <span>→</span>
                  </button>
                </div>
              )}

              {etapa === 1 && (
                <div className="form-content">
                  <div className="section-label">02 — NOSSA QUALIDADE</div>
                  <h3>Seu olhar faz a diferença.</h3>
                  <p className="help">Toque nas estrelas para avaliar cada experiência.</p>

                  {criterios.map((c, index) => (
                    <div className="rating" key={c[0]}>
                      <div className="rating-heading">
                        <div>
                          <span className="rating-index">0{index + 1}</span>
                          <strong>{c[1]}</strong>
                          <p>{c[2]}</p>
                        </div>
                        <span className="rating-value">
                          {notas[c[0]] ? `${notas[c[0]]}/5` : "—"}
                        </span>
                      </div>
                      <div className="stars">
                        {[1,2,3,4,5].map(n => (
                          <button
                            key={n}
                            className={n <= (notas[c[0]] || 0) ? "star chosen" : "star"}
                            onClick={() => setNotas({ ...notas, [c[0]]: n })}
                            aria-label={`Nota ${n}`}
                          >★</button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="buttons">
                    <button className="back" onClick={() => setEtapa(0)}>← VOLTAR</button>
                    <button className="next" onClick={avancar}>CONTINUAR →</button>
                  </div>
                </div>
              )}

              {etapa === 2 && (
                <div className="form-content">
                  <div className="section-label">03 — SUA VOZ</div>
                  <h3>Queremos ouvir você.</h3>
                  <p className="help">Uma sugestão pode fazer nossa próxima experiência ainda melhor.</p>

                  <div className="field">
                    <label>Você voltaria à Iaiá?</label>
                    <div className="choices">
                      {["Com certeza!", "Talvez", "Não"].map(v => (
                        <button
                          key={v}
                          className={voltaria === v ? "choice selected" : "choice"}
                          onClick={() => setVoltaria(v)}
                        >{v}</button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>Deixe uma mensagem para nós</label>
                    <textarea
                      rows={5}
                      maxLength={1000}
                      value={comentario}
                      onChange={e => setComentario(e.target.value)}
                      placeholder="O que você amou? O que podemos melhorar?"
                    />
                    <span className="counter">{comentario.length}/1000</span>
                  </div>

                  <div className="buttons">
                    <button className="back" onClick={() => setEtapa(1)}>← VOLTAR</button>
                    <button className="next" onClick={finalizar}>FINALIZAR →</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bottom-note">
              <span>✦</span> Obrigado por fazer parte da nossa história.
            </div>
          </>
        ) : (
          <div className="thank-you">
            <div className="thank-symbol">✦</div>
            <div className="eyebrow">COM CARINHO, IAIÁ</div>
            <h1>Obrigado{nome ? `, ${nome}` : ""}.<br /><i>Você é especial.</i></h1>
            <p>
              Sua opinião foi recebida nesta demonstração.
              Será sempre um prazer receber você novamente.
            </p>
            <div className="thank-divider">✦</div>
            <div className="brand">Iaiá<span>.</span></div>
            <button className="next restart" onClick={() => {
              setEtapa(0);
              setNotas({});
              setSabor("");
              setNome("");
              setComentario("");
              setVoltaria("");
              setEnviado(false);
            }}>NOVA AVALIAÇÃO</button>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>IAIÁ PIZZARIA ARTESANAL</span>
        <span>FEITO COM CARINHO ♥</span>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        button, input, textarea { font-family: inherit; }

        .experience {
          min-height: 100vh;
          background: #3a101e;
          color: #fff;
          font-family: Arial, sans-serif;
          padding: 30px 22px;
          position: relative;
          overflow: hidden;
        }

        .ornamento {
          position: absolute;
          border: 1px solid #d5b36b20;
          border-radius: 50%;
          pointer-events: none;
        }
        .ornamento1 {
          width: 450px; height: 450px;
          top: 80px; left: -300px;
        }
        .ornamento2 {
          width: 650px; height: 650px;
          bottom: -400px; right: -350px;
        }

        .header {
          max-width: 1050px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .brand {
          font: bold 48px Georgia, serif;
          letter-spacing: -3px;
          color: #fff8ed;
        }
        .brand span { color: #d7b16a; }
        .brand-sub {
          color: #d7b16a;
          letter-spacing: 3px;
          font-size: 8px;
          margin-top: -3px;
        }
        .header-right {
          color: #d7b16a;
          font-size: 9px;
          letter-spacing: 2px;
          text-align: right;
        }
        .gold-line {
          width: 75px;
          height: 1px;
          background: #d7b16a;
          margin: 10px 0 0 auto;
        }

        .main-content {
          max-width: 650px;
          margin: 45px auto;
          position: relative;
          z-index: 1;
        }
        .intro { text-align: center; margin-bottom: 32px; }
        .eyebrow {
          color: #d7b16a;
          letter-spacing: 4px;
          font-size: 9px;
          font-weight: bold;
        }
        .intro h1, .thank-you h1 {
          font: 57px/1.08 Georgia, serif;
          color: #fff8ed;
          margin: 19px 0 13px;
        }
        .intro h1 i, .thank-you h1 i {
          color: #dfc18a;
          font-weight: normal;
        }
        .intro p {
          color: #d3bdba;
          font: 14px/1.7 Georgia, serif;
          max-width: 380px;
          margin: auto;
        }

        .survey {
          background: #fbf7f0;
          color: #461625;
          border-radius: 4px;
          padding: 35px 38px;
          box-shadow: 0 25px 80px #16050b70;
        }
        .survey-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .muted-label {
          color: #ad8950;
          font-size: 9px;
          letter-spacing: 2px;
        }
        .survey-top h2 {
          font: 27px Georgia, serif;
          margin: 8px 0;
        }
        .step-number strong {
          color: #8d5e36;
          font: 31px Georgia, serif;
        }
        .step-number span {
          color: #a99c8c;
          font-size: 12px;
        }
        .progress {
          background: #e9dfd2;
          height: 2px;
          margin: 20px 0 30px;
        }
        .progress div {
          height: 2px;
          background: #b18a4c;
          transition: width .35s;
        }
        .section-label {
          color: #a27a40;
          font-size: 9px;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .form-content h3 {
          font: 27px Georgia, serif;
          margin: 12px 0 7px;
        }
        .help {
          color: #93877b;
          font: 13px/1.6 Georgia, serif;
          margin-bottom: 24px;
        }

        .flavors {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }
        .flavor {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          padding: 14px 10px;
          background: #fffdf9;
          border: 1px solid #e9dfd3;
          color: #522438;
          font-size: 12px;
          cursor: pointer;
          transition: .2s;
        }
        .flavor.active {
          border-color: #b18a4c;
          background: #f5ecdc;
        }
        .flavor-number {
          color: #b18a4c;
          font: 12px Georgia, serif;
        }
        .check {
          margin-left: auto;
          color: #a47c40;
        }

        .field { margin: 25px 0; }
        .field label {
          display: block;
          font: 16px Georgia, serif;
          margin-bottom: 11px;
          color: #522438;
        }
        .field input, .field textarea {
          width: 100%;
          background: #fffdf9;
          border: 1px solid #e7ddd1;
          padding: 15px;
          border-radius: 2px;
          color: #522438;
          font-size: 13px;
          outline-color: #b18a4c;
        }
        .field textarea { resize: vertical; line-height: 1.6; }

        .rating {
          padding: 19px 0;
          border-bottom: 1px solid #e9dfd3;
        }
        .rating-heading {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .rating-heading strong {
          font: 15px Georgia, serif;
          color: #522438;
        }
        .rating-index {
          color: #b18a4c;
          font: 11px Georgia, serif;
          margin-right: 9px;
        }
        .rating-heading p {
          color: #998d81;
          font-size: 10px;
          margin: 6px 0 0 27px;
        }
        .rating-value { color: #a17a42; font: 13px Georgia, serif; }
        .stars { display: flex; gap: 9px; margin: 12px 0 0 25px; }
        .star {
          color: #ded4c6;
          background: none;
          border: 0;
          font-size: 29px;
          padding: 0;
          cursor: pointer;
          transition: transform .2s, color .2s;
        }
        .star.chosen { color: #bd944d; }
        .star:hover { transform: scale(1.18); }

        .choices { display: flex; gap: 8px; flex-wrap: wrap; }
        .choice {
          flex: 1;
          min-width: 90px;
          padding: 13px 8px;
          border: 1px solid #e7ddd1;
          color: #522438;
          background: #fffdf9;
          cursor: pointer;
          font-size: 12px;
        }
        .choice.selected {
          background: #f1e7d5;
          border-color: #b18a4c;
        }
        .counter {
          display: block;
          text-align: right;
          color: #a99c8c;
          font-size: 10px;
          margin-top: 7px;
        }

        .buttons { display: flex; gap: 10px; margin-top: 25px; }
        .next, .back {
          padding: 16px 18px;
          font-size: 10px;
          letter-spacing: 1.5px;
          cursor: pointer;
        }
        .next {
          flex: 1;
          border: 0;
          color: white;
          background: #52192e;
          transition: .2s;
        }
        .next:hover { background: #7a3049; }
        .back {
          border: 1px solid #d9c9b6;
          background: transparent;
          color: #6a3444;
        }

        .bottom-note {
          text-align: center;
          color: #dfc18a;
          font: italic 13px Georgia, serif;
          margin-top: 25px;
        }
        .bottom-note span { color: #d7b16a; }

        .thank-you {
          background: #fbf7f0;
          color: #461625;
          text-align: center;
          padding: 65px 30px;
          box-shadow: 0 25px 80px #16050b70;
        }
        .thank-symbol {
          color: #bd944d;
          font-size: 65px;
          margin: 30px;
        }
        .thank-you h1 { color: #522438; font-size: 43px; }
        .thank-you p {
          color: #93877b;
          font: 15px/1.8 Georgia, serif;
          max-width: 380px;
          margin: 20px auto;
        }
        .thank-divider { color: #bd944d; margin: 35px; }
        .thank-you .brand { color: #522438; font-size: 42px; }
        .restart { display: block; width: 100%; margin-top: 30px; }

        .footer {
          max-width: 1050px;
          width: 100%;
          margin: auto auto 0;
          display: flex;
          justify-content: space-between;
          color: #cdb17d;
          font-size: 8px;
          letter-spacing: 2px;
          position: relative;
          z-index: 1;
        }

        @media(max-width: 520px) {
          .experience { padding: 22px 13px; }
          .brand { font-size: 40px; }
          .header-right { font-size: 7px; letter-spacing: 1px; }
          .main-content { margin: 38px auto; }
          .intro h1 { font-size: 48px; }
          .survey { padding: 27px 19px; }
          .survey-top h2 { font-size: 23px; }
          .form-content h3 { font-size: 24px; }
          .flavors { grid-template-columns: 1fr; }
          .footer { font-size: 7px; letter-spacing: 1px; }
        }
      `}</style>
    </main>
  );
}
