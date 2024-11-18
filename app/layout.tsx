import type { Metadata } from "next";
import "./globals.css";

import {Poppins} from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable:'--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "ChatBot",
  description: "Chat with pdf - PlanetAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        className={`antialiased bg-white md:overflow-y-hidden overflow-x-hidden `}
      >
        {children}
      </body>
    </html>
  );
}
