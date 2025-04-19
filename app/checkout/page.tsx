"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, CreditCard, Globe, Info, Lock, Shield, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { CustomerInfoForm } from "@/components/checkout/customer-info-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { ReviewOrder } from "@/components/checkout/review-order"
import { processOrder } from "@/lib/checkout-actions"

const CHECKOUT_STEPS = ["information", "payment", "review"]

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId")
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    paymentInfo: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
    plan: getPlanDetails(planId),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  function getPlanDetails(planId: string | null) {
    // In a real app, this would fetch plan details from an API
    // For now, we'll use mock data based on the planId
    const plans = {
      "japan-3gb": {
        id: "japan-3gb",
        name: "Japan Travel",
        data: "3GB",
        duration: "15 days",
        price: 19.99,
        countries: ["Japan"],
        flag: "🇯🇵",
      },
      "global-10gb": {
        id: "global-10gb",
        name: "Global Plus",
        data: "10GB",
        duration: "30 days",
        price: 59.99,
        countries: ["Global (170+ countries)"],
        flag: "🌎",
      },
      "us-5gb": {
        id: "us-5gb",
        name: "US Travel",
        data: "5GB",
        duration: "15 days",
        price: 24.99,
        countries: ["United States"],
        flag: "🇺🇸",
      },
    }

    return (
      plans[planId as keyof typeof plans] || {
        id: "default",
        name: "eSIM Data Plan",
        data: "3GB",
        duration: "15 days",
        price: 19.99,
        countries: ["Global"],
        flag: "🌎",
      }
    )
  }

  const handleNext = () => {
    if (currentStep < CHECKOUT_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (section: string, data: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        ...data,
      },
    })
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    try {
      // In a real app, this would send the order to a server
      const result = await processOrder(formData)

      // Redirect to success page with order ID
      router.push(`/checkout/success?orderId=${result.orderId}`)
    } catch (error) {
      console.error("Error processing order:", error)
      setIsSubmitting(false)
      // Handle error (would show error message in real app)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-[#005EB8]">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/plans" className="text-sm text-gray-500 hover:text-[#005EB8]">
                    Plans
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-700">Checkout</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Checkout Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your purchase to get connected</p>
        </div>

        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex justify-between">
            {["Customer Information", "Payment Details", "Review & Confirm"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    index < currentStep
                      ? "bg-[#005EB8] border-[#005EB8] text-white"
                      : index === currentStep
                        ? "border-[#005EB8] text-[#005EB8]"
                        : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span
                  className={`mt-2 text-xs sm:text-sm ${
                    index <= currentStep ? "text-[#005EB8] font-medium" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
                {index < 2 && (
                  <div className="hidden sm:block absolute left-0 w-full" style={{ top: "2.5rem" }}>
                    <div
                      className={`h-0.5 ${
                        index < currentStep ? "bg-[#005EB8]" : "bg-gray-300"
                      } w-full max-w-[calc(33.333%-2rem)] mx-auto`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Steps */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 0
                    ? "Customer Information"
                    : currentStep === 1
                      ? "Payment Details"
                      : "Review Your Order"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 0
                    ? "Please provide your contact details"
                    : currentStep === 1
                      ? "Enter your payment information securely"
                      : "Please review your order details before confirming"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={CHECKOUT_STEPS[currentStep]} className="w-full">
                  <TabsContent value="information" className="mt-0 space-y-4">
                    <CustomerInfoForm
                      initialData={formData.customerInfo}
                      onUpdate={(data) => updateFormData("customerInfo", data)}
                    />
                  </TabsContent>
                  <TabsContent value="payment" className="mt-0 space-y-4">
                    <PaymentForm
                      initialData={formData.paymentInfo}
                      onUpdate={(data) => updateFormData("paymentInfo", data)}
                    />
                  </TabsContent>
                  <TabsContent value="review" className="mt-0 space-y-4">
                    <ReviewOrder formData={formData} />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link href="/plans">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Plans
                    </Link>
                  </Button>
                )}
                {currentStep < CHECKOUT_STEPS.length - 1 ? (
                  <Button onClick={handleNext} className="bg-[#005EB8] hover:bg-[#004a93]">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitOrder}
                    className="bg-[#005EB8] hover:bg-[#004a93]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Complete Purchase"}
                    {!isSubmitting && <Lock className="ml-2 h-4 w-4" />}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary plan={formData.plan} />

            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Secure Checkout</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#005EB8] shrink-0 mt-0.5" />
                  <p className="text-gray-600">
                    Your payment information is encrypted and securely processed. We do not store your full card
                    details.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-[#005EB8] shrink-0 mt-0.5" />
                  <p className="text-gray-600">
                    After purchase, you'll receive a QR code to activate your eSIM instantly on your device.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-[#005EB8] shrink-0 mt-0.5" />
                  <p className="text-gray-600">
                    Your eSIM will work immediately in all supported countries with no additional setup required.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Info className="h-4 w-4" />
                  <span>Need help? Contact our 24/7 support</span>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" fill="#FFB600" rx="4" />
                  <path d="M12 18.5A6.5 6.5 0 1 0 12 5.5a6.5 6.5 0 0 0 0 13z" fill="#EB001B" />
                  <path d="M12 18.5A6.5 6.5 0 0 0 18.5 12H5.5a6.5 6.5 0 0 0 6.5 6.5z" fill="#F79E1B" />
                </svg>
              </div>
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" fill="#1434CB" rx="4" />
                  <path
                    d="M9.5 15.5h-2L9 9h2l-1.5 6.5zm7.5-6.5l-1.5 4-1-4H12L9.5 15.5h2l.5-1.5h3l.5 1.5h2L17 9z"
                    fill="#FFFFFF"
                  />
                  <path d="M13 12l.5-1.5h1L15 12h-2z" fill="#FFFFFF" />
                </svg>
              </div>
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" fill="#FFFFFF" rx="4" />
                  <path
                    d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5-2.9-6.5-6.5-6.5z"
                    fill="#0079BE"
                  />
                  <path d="M9 12c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
