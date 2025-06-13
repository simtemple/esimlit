import type React from "react"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lit Mobile eSIM - Global Connectivity Without Physical SIM Cards",
  description:
    "Experience seamless global connectivity with eSIM Plus. Activate eSIMs instantly for 200+ countries with no physical SIM cards needed.",
    generator: 'v0.dev',
url: "https://litmobile.net",
siteName: "Litmobile",
	
      
img: [
			{
				src: "/og.png"
			},
		],
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
