import "./globals.css";

export const metadata = {
  title: "AI Biosensing Platform",
  description: "Advanced dashboards, ML tools, virus analysis, and documentation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
