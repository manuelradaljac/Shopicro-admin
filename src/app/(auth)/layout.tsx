import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
            </ThemeProvider>
          </body>
        </html>
    </>
  );
}
