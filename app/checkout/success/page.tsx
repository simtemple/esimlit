"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Check, Download, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getOrderDetails } from "@/lib/checkout-actions"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrderDetails() {
      if (orderId) {
        try {
          const orderDetails = await getOrderDetails(orderId)
          setOrder(orderDetails)
        } catch (error) {
          console.error("Error loading order details:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadOrderDetails()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005EB8] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Order Not Found</CardTitle>
            <CardDescription>We couldn't find the order details you're looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Please check your email for order confirmation or contact our support team for assistance.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-[#005EB8] hover:bg-[#004a93]">
              <Link href="/plans">Browse Plans</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thank You for Your Purchase!</h1>
          <p className="text-gray-600 mt-2">Your eSIM has been successfully purchased and is ready for activation.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Order #{order.orderId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <span className="text-xl">{order.plan.flag}</span>
                    {order.plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">{order.plan.countries.join(", ")}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${order.plan.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">
                    {order.plan.data} for {order.plan.duration}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${(order.plan.price * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(order.plan.price * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p>
                      {order.customerInfo.firstName} {order.customerInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p>{order.customerInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p>{order.customerInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Method</p>
                    <p>Credit Card ending in {order.paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Activate Your eSIM</CardTitle>
            <CardDescription>Follow these steps to get connected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="border border-gray-200 rounded-lg p-4 flex justify-center items-center">
                  <img
                    src="/qr-code-esim.png"
                    alt="eSIM QR Code"
                    className="max-w-full h-auto"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download QR Code
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-[#005EB8]" />
                  Activation Instructions
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3DFFA] text-[#005EB8] font-medium text-xs">
                      1
                    </div>
                    <span>Go to Settings on your device</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3DFFA] text-[#005EB8] font-medium text-xs">
                      2
                    </div>
                    <span>Select Cellular or Mobile Data</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3DFFA] text-[#005EB8] font-medium text-xs">
                      3
                    </div>
                    <span>Tap "Add Cellular Plan" or "Add eSIM"</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3DFFA] text-[#005EB8] font-medium text-xs">
                      4
                    </div>
                    <span>Scan the QR code shown here</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A3DFFA] text-[#005EB8] font-medium text-xs">
                      5
                    </div>
                    <span>Follow the on-screen instructions to complete setup</span>
                  </li>
                </ol>
                <div className="mt-4">
                  <Button asChild className="w-full bg-[#005EB8] hover:bg-[#004a93]">
                    <Link href="/support/activation-guides">
                      View Detailed Instructions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <h3 className="font-medium">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Manage Your eSIM</h4>
                <p className="text-sm text-gray-600 mb-4">
                  View your data usage, manage settings, and more in your dashboard.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is available 24/7 to assist with any questions.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/support">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Explore More Plans</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Browse our selection of eSIM plans for your next destination.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/plans">View Plans</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
