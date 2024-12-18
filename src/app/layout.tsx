import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Name Picker",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="touch-manipulation">{children}</body>
    </html>
  );
}
