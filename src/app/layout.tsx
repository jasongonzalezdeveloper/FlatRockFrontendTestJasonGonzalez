import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "@/components/hooks/CartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test Flat Rock Frontend"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Header />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: '',
              success: {
                className: 'bg-green-100 border-l-4 border-green-500 text-green-700',
                iconTheme: {
                  primary: '#10B981',
                  secondary: 'white',
                },
              },
              error: {
                className: 'bg-red-100 border-l-4 border-red-500 text-red-700',
              },
            }}
          />
          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
