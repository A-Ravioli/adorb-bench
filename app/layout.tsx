import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "adorb bench",
  description: "Compare AI models by the cuteness of their generated kaomoji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

