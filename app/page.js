
"use client";

import { useState } from "react";

const perguntas = [
  { id: "pizza", titulo: "Como estava sua pizza?", subtitulo: "Sua experiência com nosso principal produto", opcoes: ["Péssima", "Ruim", "Regular", "Muito boa", "Perfeita"] },
  { id: "massa", titulo: "O que achou da nossa massa?", subtitulo: "Textura, leveza e ponto de assamento", opcoes: ["Péssima", "Ruim", "Regular", "Muito boa", "Perfeita"] },
  { id: "recheio", titulo: "E o recheio?", subtitulo: "Quantidade e qualidade dos ingredientes", opcoes: ["Péssimo", "Ruim", "Regular", "Muito bom", "Excelente"] },
  { id: "sabor", titulo: "Como estava o sabor?", subtitulo: "Queremos saber se conquistamos seu paladar", opcoes: ["Péssimo", "Ruim", "Regular", "Muito bom", "Excelente"] },
  { id: "atendimento", titulo: "Como foi nosso atendimento?", subtitulo: "A atenção e cordialidade da nossa equipe", opcoes: ["Péssimo", "Ruim", "Regular", "Muito bom", "Excelente"] },
  { id: "agilidade", titulo: "Como foi o tempo de espera?", subtitulo: "A rapidez na preparação e entrega", opcoes: ["Muito demorado", "Demorado", "Normal", "Rápido", "Muito rápido"] }
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
  const [comentario, setComentario] = useState("");
  const [nome, setNome] = useState("");
  const [voltaria, setVoltaria] = useState("");
  const [enviado, setEnviado] = useState(false);

  function avancar() {
    if (etapa === 1 && perguntas.some(p => !notas[p.id])) {
      alert("Por favor, avalie todos os itens.");
      return;
    }
    setEtapa(etapa + 1);
  }

  function finalizar() {
    if (!sabor || !voltaria) {
      alert("Selecione o sabor e responda se voltaria.");
      return;
    }
    setEnviado(true);
  }

  const progresso = etapa === 0 ? 0 : etapa === 1 ? 33 : etapa === 2 ? 66 : 100;

  return (
    <main className="pagina">
      <header className="topo">
        <div className="marca">
          <div className="logo">Iaiá<span>.</span></div>
          <div className="marca-legenda">PIZZARIA ARTESANAL</div>
        </div>
        <div className="selo-topo">EXPERIÊNCIA DO CLIENTE</div>
      </header>

      <section className="conteudo">
        {!enviado ? (
          <>
            <div className="cartao">
              <div className="cabecalho-cartao">
                <span className="etiqueta">SUA OPINIÃO É ESPECIAL</span>
                <h1>Uma boa experiência<br />merece ser <span>compartilhada.</span></h1>
                <p>Ajude a Iaiá a ficar ainda melhor. Sua opinião faz toda a diferença!</p>
              </div>

              <div className="progresso-info">
                <span>ETAPA {etapa + 1} DE 3</span>
                <span>{progresso}% concluído</span>
              </div>
              <div className="barra">
                <div style={{ width: `${progresso}%` }} />
              </div>

              {etapa === 0 && (
                <div className="etapa">
                  <div className="icone-etapa">01</div>
                  <h2>Vamos começar?</h2>
                  <p className="subtitulo">Queremos conhecer um pouquinho da sua experiência com a Iaiá.</p>

                  <div className="campo">
                    <label>Qual pizza você experimentou?</label>
                    <select value={sabor} onChange={e => setSabor(e.target.value)}>
                      <option value="">Escolha o sabor</option>
                      {sabores.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="campo">
                    <label>Seu nome <small>(opcional)</small></label>
                    <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite seu nome" />
                  </div>

                  <button className="principal" onClick={() => {
                    if (!sabor) {
                      alert("Selecione o sabor da pizza.");
                      return;
                    }
                    setEtapa(1);
                  }}>
                    COMEÇAR A AVALIAÇÃO <span>→</span>
                  </button>
                </div>
              )}

              {etapa === 1 && (
                <div className="etapa">
                  <div className="icone-etapa">02</div>
                  <h2>Vamos falar da pizza!</h2>
                  <p className="subtitulo">Avalie cada detalhe. Sua sinceridade nos ajuda a manter a qualidade.</p>

                  {perguntas.map((p, index) => (
                    <div className="pergunta" key={p.id}>
                      <div className="numero">{String(index + 1).padStart(2, "0")}</div>
                      <div className="pergunta-conteudo">
                        <h3>{p.titulo}</h3>
                        <p>{p.subtitulo}</p>
                        <div className="estrelas">
                          {[1, 2, 3, 4, 5].map(n => (
                            <button
                              key={n}
                              type="button"
                              aria-label={`Nota ${n}`}
                              className={n <= (notas[p.id] || 0) ? "selecionada" : ""}
                              onClick={() => setNotas({ ...notas, [p.id]: n })}
                            >★</button>
                          ))}
                        </div>
                        <small className="descricao-nota">
                          {notas[p.id] ? p.opcoes[notas[p.id] - 1] : "Selecione uma nota"}
                        </small>
                      </div>
                    </div>
                  ))}

                  <div className="botoes">
                    <button className="secundario" onClick={() => setEtapa(0)}>VOLTAR</button>
                    <button className="principal" onClick={avancar}>CONTINUAR →</button>
                  </div>
                </div>
              )}

              {etapa === 2 && (
                <div className="etapa">
                  <div className="icone-etapa">03</div>
                  <h2>Conte mais para nós!</h2>
                  <p className="subtitulo">Queremos entender o que podemos fazer para surpreender você.</p>

                  <div className="campo">
                    <label>Você voltaria a comprar na Iaiá?</label>
                    <div className="escolhas">
                      {["Com certeza!", "Talvez", "Não"].map(v => (
                        <button key={v} onClick={() => setVoltaria(v)}
                          className={voltaria === v ? "escolhida" : ""}>{v}</button>
                      ))}
                    </div>
                  </div>

                  <div className="campo">
                    <label>Deixe seu comentário ou sugestão</label>
                    <textarea rows={5} maxLength={1000}
                      value={comentario}
                      onChange={e => setComentario(e.target.value)}
                      placeholder="O que você mais gostou? Tem alguma sugestão? Queremos ouvir você..." />
                    <small className="contador">{comentario.length}/1000</small>
                  </div>

                  <div className="botoes">
                    <button className="secundario" onClick={() => setEtapa(1)}>VOLTAR</button>
                    <button className="principal" onClick={finalizar}>ENVIAR AVALIAÇÃO →</button>
                  </div>
                </div>
              )}
            </div>
            <div className="seguranca">♥ &nbsp; Obrigado por escolher a Iaiá Pizzaria Artesanal</div>
          </>
        ) : (
          <div className="cartao agradecimento">
            <div className="selo">AVALIAÇÃO CONCLUÍDA</div>
            <div className="simbolo">♥</div>
            <h1>Você faz parte<br /><span>da nossa história!</span></h1>
            <p>Obrigado{nome ? `, ${nome}` : ""}, por compartilhar sua experiência com a Iaiá. Sua opinião é muito importante para nós!</p>
            <div className="resumo">
              <span>Pizza avaliada</span>
              <strong>{sabor}</strong>
            </div>
            <p className="mensagem-final">Será um prazer receber você novamente. ❤️</p>
          </div>
        )}
      </section>

      <footer>
        <div className="logo-footer">Iaiá<span>.</span></div>
        <p>PIZZARIA ARTESANAL • FEITO COM CARINHO</p>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; }
        button, input, select, textarea { font: inherit; }

        .pagina {
          min-height: 100vh;
          background: radial-gradient(ellipse at 50% 0%, #76243e 0%, transparent 55%), #350d1c;
          padding: 25px 18px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .topo {
          width: 100%; max-width: 1050px;
          display: flex; justify-content: space-between;
          align-items: center; color: white;
        }
        .logo, .logo-footer {
          font: bold 43px Georgia, serif;
          letter-spacing: -2px;
        }
        .logo span, .logo-footer span { color: #e9bc58; }
        .marca-legenda {
          font-size: 9px; color: #e9c77e;
          letter-spacing: 2px; margin-top: -2px;
        }
        .selo-topo {
          color: #e9c77e; font-size: 9px;
          letter-spacing: 2px;
        }

        .conteudo {
          width: 100%; max-width: 650px;
          margin: 35px auto;
        }
        .cartao {
          background: #fffdf9;
          border-radius: 22px;
          padding: 36px 35px;
          box-shadow: 0 25px 70px #16030c66;
        }
        .cabecalho-cartao { text-align: center; }
        .etiqueta, .selo {
          color: #a77b31; font-size: 10px;
          letter-spacing: 2.5px; font-weight: bold;
        }
        h1 {
          font: 42px/1.12 Georgia, serif;
          color: #501329; margin: 20px 0 12px;
        }
        h1 span { color: #b78b3d; }
        .cabecalho-cartao p, .subtitulo {
          color: #827b75; line-height: 1.65;
          font-size: 14px;
        }
        .progresso-info {
          display: flex; justify-content: space-between;
          margin-top: 32px; color: #9b8d80;
          font-size: 10px; letter-spacing: 1px;
        }
        .barra {
          background: #eee7df; height: 5px;
          border-radius: 10px; margin: 10px 0 30px;
          overflow: hidden;
        }
        .barra div {
          height: 100%; background: #b78b3d;
          border-radius: 10px; transition: width .3s;
        }
        .icone-etapa {
          color: #b78b3d; font: bold 13px Georgia;
          letter-spacing: 2px;
        }
        .etapa h2 {
          color: #501329; font: 29px Georgia,serif;
          margin: 9px 0;
        }
        .campo { margin: 25px 0; }
        .campo label {
          display: block; color: #501329;
          font-size: 13px; font-weight: bold;
          margin-bottom: 10px;
        }
        .campo label small { color: #9c938c; font-weight: normal; }
        .campo input, .campo select, .campo textarea {
          width: 100%; padding: 15px;
          border: 1px solid #e8ded4; border-radius: 10px;
          background: white; color: #501329;
          outline-color: #b78b3d; font-size: 14px;
        }
        .campo textarea { resize: vertical; line-height: 1.5; }
        .pergunta {
          display: flex; gap: 15px;
          border-bottom: 1px solid #eee7df;
          padding: 20px 0;
        }
        .numero {
          color: #b78b3d; font: 18px Georgia;
          padding-top: 2px;
        }
        .pergunta-conteudo { flex: 1; }
        .pergunta h3 {
          color: #501329; font-size: 14px;
          margin: 0 0 5px;
        }
        .pergunta p {
          color: #999088; font-size: 11px;
          margin: 0 0 10px;
        }
        .estrelas { display: flex; gap: 8px; }
        .estrelas button {
          border: 0; background: transparent;
          color: #ded7ce; font-size: 30px;
          padding: 0; cursor: pointer;
          transition: .15s;
        }
        .estrelas button.selecionada { color: #c49a43; }
        .estrelas button:hover { transform: scale(1.15); }
        .descricao-nota {
          display: block; color: #a77b31;
          font-size: 11px; margin-top: 5px;
        }
        .escolhas { display: grid; gap: 9px; }
        .escolhas button {
          padding: 13px; border: 1px solid #e8ded4;
          border-radius: 9px; background: white;
          color: #501329; text-align: left;
          cursor: pointer;
        }
        .escolhas button.escolhida {
          border-color: #b78b3d;
          background: #fff8e9; font-weight: bold;
        }
        .contador {
          display: block; text-align: right;
          color: #999; font-size: 10px; margin-top: 6px;
        }
        .botoes {
          display: flex; gap: 12px; margin-top: 25px;
        }
        .principal, .secundario {
          padding: 16px 18px; border-radius: 9px;
          cursor: pointer; font-size: 11px;
          font-weight: bold; letter-spacing: 1px;
        }
        .principal {
          flex: 1; background: #64182f;
          color: white; border: 0;
        }
        .principal:hover { background: #812b47; }
        .principal span { float: right; }
        .secundario {
          background: transparent; color: #64182f;
          border: 1px solid #d8c8ba;
        }
        .seguranca {
          text-align: center; color: #e9c77e;
          font-size: 11px; margin-top: 20px;
        }
        .agradecimento { text-align: center; padding: 55px 30px; }
        .simbolo { color: #c49a43; font-size: 65px; margin-top: 25px; }
        .agradecimento p {
          color: #81766e; line-height: 1.7;
          font-size: 14px;
        }
        .resumo {
          background: #f6efe7; border-radius: 12px;
          padding: 18px; margin: 25px 0;
          display: grid; gap: 8px;
        }
        .resumo span { color: #91857a; font-size: 11px; }
        .resumo strong { color: #501329; }
        .mensagem-final { color: #a77b31 !important; }
        footer { text-align: center; color: #e9c77e; }
        .logo-footer { font-size: 29px; }
        footer p { font-size: 9px; letter-spacing: 2px; }

        @media(max-width: 480px) {
          .cartao { padding: 28px 19px; }
          h1 { font-size: 34px; }
          .topo { gap: 10px; }
          .selo-topo { font-size: 8px; }
          .pergunta { gap: 9px; }
          .estrelas { gap: 5px; }
          .estrelas button { font-size: 28px; }
          .botoes { gap: 7px; }
          .principal, .secundario { padding: 15px 10px; }
        }
      `}</style>
    </main>
  );
}
