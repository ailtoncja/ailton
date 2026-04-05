import "./globals.css";

export const metadata = {
  title: "Ailton",
  description: "Ailton",
  icons: {
    icon: "/title.png",
    apple: "/title.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="inter_c15e96cb-module__0bjUvq__variable jetbrains_mono_e18b556e-module__CzZ1vG__variable">{children}</body>
    </html>
  );
}
