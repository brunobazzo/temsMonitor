import "./globals.css";
import { Header } from "../components/header";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "monitoramento TEMS",
  description: "monitoramento automações do TEMS",
  openGraph: {
    title: "monitoramento TEMS",
    description: "monitoramento automações do TEMS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>

        <link rel="icon" href="/cor.ico" type="image/x-icon" />

      </Head>
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
