import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
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
  title: "Play List Converter App",
  description: "Transfer your favorite playlists with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="google-site-verification" content="DMYGcMUYOeaqGlC-Oc2xXjJEMUbezZgiITewW8CCYsA" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
