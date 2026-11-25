
"use client";

import { useState } from "react";

const opcoes = [
  { nota: 1, emoji: "😞", texto: "Péssimo" },
  { nota: 2, emoji: "😕", texto: "Ruim" },
  { nota: 3, emoji: "😐", texto: "Regular" },
  { nota: 4, emoji: "😊", texto: "Muito bom" },
  { nota: 5, emoji: "😍", texto: "Excelente" }
];

export default function Home() {
  const [nota, setNota] = useState(0);

  return (
    <main className="pagina">
      <header className="topo">
        <div className="logo">Iaiá<span>.</span></div>
        <div className="assinatura">EXPERIÊNCIA DO CLIENTE</div>
      </header>

      <section className="painel">
        {!nota ? (
          <>
            <div className="selo">SUA OPINIÃO É IMPORTANTE</div>

            <h1>
              Queremos saber
              <br />
              como foi sua
              <br />
              <span>experiência!</span>
            </h1>

            <p className="descricao">
              Sua avaliação nos ajuda a melhorar
              cada vez mais. Como você avalia
              nosso atendimento?
            </p>

            <div className="opcoes">
              {opcoes.map((item) => (
                <button
                  key={item.nota}
                  className="opcao"
                  onClick={() => setNota(item.nota)}
                >
                  <span className="emoji">{item.emoji}</span>
                  <span className="legenda">{item.texto}</span>
                </button>
              ))}
            </div>

            <div className="rodape-painel">
              <span className="linha"></span>
              LEVA MENOS DE 10 SEGUNDOS
              <span className="linha"></span>
            </div>
          </>
        ) : (
          <div className="agradecimento">
            <div className="coracao">♥</div>
            <h1>Obrigado!</h1>
            <p>
              Sua opinião é muito especial
              para a equipe Iaiá.
            </p>
            <div className="nota-final">
              {opcoes.find(o => o.nota === nota)?.emoji}
              <span>
                {opcoes.find(o => o.nota === nota)?.texto}
              </span>
            </div>
          </div>
        )}
      </section>

      <footer>
        <span>IAIÁ</span>
        <p>Feito com carinho para você ♥</p>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f0eb;
        }

        .pagina {
          min-height: 100vh;
          background:
            radial-gradient(circle at 80% 10%, #812d46 0, transparent 35%),
            linear-gradient(145deg, #350b1b, #68182f 65%, #3b1020);
          padding: 35px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .topo {
          width: 100%;
          max-width: 1000px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 43px;
          font-weight: bold;
          letter-spacing: -2px;
        }

        .logo span { color: #e9bc58; }

        .assinatura {
          font-size: 10px;
          letter-spacing: 3px;
          color: #e9c77e;
        }

        .painel {
          background: #fffdf9;
          border-radius: 22px;
          width: 100%;
          max-width: 650px;
          padding: 48px 35px;
          text-align: center;
          box-shadow: 0 25px 70px #21071366;
          margin: 45px 0;
        }

        .selo {
          color: #a77b31;
          font-size: 10px;
          letter-spacing: 3px;
          font-weight: bold;
        }

        h1 {
          color: #501329;
          font-family: Georgia, serif;
          font-size: clamp(36px, 7vw, 54px);
          line-height: 1.13;
          margin: 25px 0 15px;
        }

        h1 span { color: #b78b3d; }

        .descricao {
          color: #77716d;
          font-size: 16px;
          line-height: 1.7;
          max-width: 390px;
          margin: 0 auto 35px;
        }

        .opcoes {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .opcao {
          border: 1px solid #eee4dc;
          background: white;
          border-radius: 15px;
          padding: 17px 5px;
          cursor: pointer;
          transition: .2s;
          color: #501329;
        }

        .opcao:hover {
          border-color: #b78b3d;
          background: #fff8e9;
          transform: translateY(-5px);
        }

        .emoji {
          display: block;
          font-size: 34px;
          margin-bottom: 10px;
        }

        .legenda {
          display: block;
          font-size: 11px;
          font-weight: bold;
        }

        .rodape-painel {
          margin-top: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #a49a91;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .linha {
          height: 1px;
          background: #e7ded5;
          flex: 1;
        }

        .agradecimento { padding: 35px 0; }

        .coracao {
          color: #b78b3d;
          font-size: 60px;
        }

        .agradecimento p {
          color: #77716d;
          line-height: 1.7;
        }

        .nota-final {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          font-size: 26px;
          color: #501329;
        }

        footer {
          color: #e9c77e;
          text-align: center;
          font-size: 10px;
          letter-spacing: 2px;
        }

        footer span { font-weight: bold; }

        footer p {
          color: #ffffffa0;
          letter-spacing: 1px;
        }

        @media(max-width: 480px) {
          .painel { padding: 38px 17px; }
          .assinatura { font-size: 8px; letter-spacing: 1px; }
          .opcoes { gap: 5px; }
          .opcao { padding: 13px 2px; }
          .emoji { font-size: 27px; }
          .legenda { font-size: 9px; }
        }
      `}</style>
    </main>
  );
}
