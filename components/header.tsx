"use client"

import { User, UserPlus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { NavMenu } from "@/components/nav-menu"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  // Function to check if a link is active
  const isActive = (path: string) => {
    // Exact match for home page
    if (path === "/" && pathname === "/") return true

    // For other pages, check if pathname starts with the path (for nested routes)
    if (path !== "/" && pathname.startsWith(path)) return true

    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005EB8] text-white font-bold shadow-sm">
              e+
            </div>
            <span className="text-xl font-bold text-[#005EB8]">eSIM Plus</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center">
          <NavMenu />
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={`hidden md:inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
              isActive("/login") ? "text-[#005EB8] font-semibold bg-blue-50" : "text-gray-700 hover:text-[#005EB8]"
            }`}
            onMouseEnter={() => setHoveredLink("login")}
            onMouseLeave={() => setHoveredLink(null)}
            aria-label="Log in to your account"
          >
            <User
              className={`h-4 w-4 mr-2 transition-transform ${
                hoveredLink === "login" || isActive("/login") ? "scale-110" : ""
              }`}
            />
            Log in
          </Link>
          <Link
            href="/signup"
            className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005EB8] ${
              isActive("/signup")
                ? "bg-[#004a93] text-white font-semibold ring-2 ring-[#005EB8]/20"
                : "bg-[#005EB8] text-white hover:bg-[#004a93] hover:shadow-md"
            }`}
            onMouseEnter={() => setHoveredLink("signup")}
            onMouseLeave={() => setHoveredLink(null)}
            aria-label="Create a new account"
          >
            <UserPlus
              className={`h-4 w-4 mr-2 transition-transform ${
                hoveredLink === "signup" || isActive("/signup") ? "scale-110" : ""
              }`}
            />
            Sign up
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
