// what to wrap or not in specific child and childern are the pages 

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "CareerLift AI",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
    >

    <html lang="en" suppressHydrationWarning>
         <body className={`${inter.className}`}>
                  <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header/>

            {/* main component we have created to hold main thing i.e the childern */}
            <main className="min-h-screen">
             {children} {/* Wrap the children with ThemeProvider */}
            </main>
            <Toaster richColors />

            {/* Footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with Shahryar</p>
              </div>
            </footer>
                
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}

