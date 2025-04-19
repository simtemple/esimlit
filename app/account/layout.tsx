import type React from "react"
import Link from "next/link"
import { CreditCard, Home, Settings, User } from "lucide-react"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-6xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <aside className="space-y-4">
          <div className="font-medium text-lg mb-4">Account</div>
          <nav className="flex flex-col space-y-1">
            <Link
              href="/account"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-[#005EB8] hover:bg-[#A3DFFA]/10"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/account/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-[#005EB8] hover:bg-[#A3DFFA]/10"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/account/payment-methods"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-[#005EB8] hover:bg-[#A3DFFA]/10"
            >
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </Link>
            <Link
              href="/account/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-[#005EB8] hover:bg-[#A3DFFA]/10"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
