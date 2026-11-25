import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Iaiá Pizzaria | Avaliações",
  description: "Avalie sua experiência na Iaiá Pizzaria Artesanal."
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}