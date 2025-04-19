import Link from "next/link"
import { CreditCard, Package, Receipt, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccountPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#005EB8]" />
              Profile
            </CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Update your profile details, email, and contact preferences.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/account/profile">View Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#005EB8]" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Add, edit, or remove credit cards and other payment methods.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/account/payment-methods">Manage Payment Methods</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#005EB8]" />
              eSIM Plans
            </CardTitle>
            <CardDescription>View your active and past eSIM plans</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Check data usage, expiry dates, and manage your eSIM plans.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-[#005EB8]" />
              Order History
            </CardTitle>
            <CardDescription>View your past orders and purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Access receipts, invoices, and details of your previous orders.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/account/orders">View Orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
