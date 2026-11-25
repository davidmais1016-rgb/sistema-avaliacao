import Link from "next/link";
export default function Home() {
  return <main className="shell"><header className="brand"><span>IAIÁ</span><small>PIZZARIA ARTESANAL</small></header>
    <section className="hero"><p className="eyebrow">SUA OPINIÃO FAZ A DIFERENÇA</p><h1>Como foi sua experiência?</h1>
      <p>Ajude a Iaiá Pizzaria a servir você cada vez melhor. Leva menos de um minuto.</p>
      <Link className="primary" href="/avaliar">Avaliar minha experiência</Link>
    </section>
    <footer><Link href="/admin">Acesso administrativo</Link></footer>
  </main>;
}