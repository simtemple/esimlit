"use client"

import { User, UserPlus, Globe } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { NavMenu } from "@/components/nav-menu"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005EB8] text-white font-bold shadow-sm">
              e+
            </div>
            <span className="text-xl font-bold text-[#005EB8]">Mobile eSIM</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center">
          <NavMenu />
        </nav>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Globe className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
              <DropdownMenuItem>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
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
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/login" className="w-full cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  <span>Sign in with email</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Continue with Facebook
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/forgot-password" className="cursor-pointer">
                  Forgot password?
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
