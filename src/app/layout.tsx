import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css"
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark
        }}
      >
        <html lang="en" suppressHydrationWarning={true}>
          <head />
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ModalProvider />
              <ToasterProvider/>
            </ThemeProvider>
            <Analytics />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
