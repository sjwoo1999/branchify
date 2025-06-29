import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Branchify - 네온 기반 목표 관리 플랫폼",
  description: "목표를 네온처럼 빛나고 분기하며, 몰입과 성장의 에너지를 한눈에 체험하도록 설계된 차세대 목표 관리 플랫폼",
  keywords: ["목표관리", "생산성", "네온", "분기", "성장"],
  authors: [{ name: "Branchify Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-deep-navy text-glass-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
