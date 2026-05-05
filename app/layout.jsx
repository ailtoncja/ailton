import "./globals.css";

export const metadata = {
  title: "Ailton",
  description: "Ailton",
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
