import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import "@/css/main.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "차량 운행 기록",
  description: "차계부",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
