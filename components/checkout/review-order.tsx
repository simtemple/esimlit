"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getPaymentMethodById } from "@/lib/payment-actions"

interface ReviewOrderProps {
  formData: {
    customerInfo: {
      firstName: string
      lastName: string
      email: string
      phone: string
    }
    paymentInfo: {
      cardNumber: string
      cardName: string
      expiryDate: string
      cvv: string
      useSavedMethod?: boolean
      savedMethodId?: string
    }
    plan: {
      id: string
      name: string
      data: string
      duration: string
      price: number
      countries: string[]
      flag: string
    }
  }
}

export function ReviewOrder({ formData }: ReviewOrderProps) {
  const { customerInfo, paymentInfo, plan } = formData
  const subtotal = plan.price
  const tax = subtotal * 0.1 // 10% tax for example
  const total = subtotal + tax

  const [isLoadingSavedMethod, setIsLoadingSavedMethod] = useState(false)
  const [savedMethodDetails, setSavedMethodDetails] = useState<any>(null)

  useEffect(() => {
    async function loadSavedMethodDetails() {
      if (paymentInfo.useSavedMethod && paymentInfo.savedMethodId) {
        setIsLoadingSavedMethod(true)
        try {
          const method = await getPaymentMethodById(paymentInfo.savedMethodId)
          setSavedMethodDetails(method)
        } catch (error) {
          console.error("Error loading saved payment method:", error)
        } finally {
          setIsLoadingSavedMethod(false)
        }
      }
    }

    loadSavedMethodDetails()
  }, [paymentInfo.useSavedMethod, paymentInfo.savedMethodId])

  // Get last 4 digits of card number
  const lastFourDigits = paymentInfo.useSavedMethod
    ? savedMethodDetails?.lastFour || "****"
    : paymentInfo.cardNumber.replace(/\s/g, "").slice(-4)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Plan Details</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <span className="text-xl">{plan.flag}</span>
                {plan.name}
              </h4>
              <p className="text-sm text-gray-500">{plan.countries.join(", ")}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold">${plan.price.toFixed(2)}</div>
              <div className="text-sm text-gray-500">
                {plan.data} for {plan.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">
              {customerInfo.firstName} {customerInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{customerInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{customerInfo.phone}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">Payment Information</h3>
        {isLoadingSavedMethod ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-32" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">
                {paymentInfo.useSavedMethod && savedMethodDetails
                  ? `${savedMethodDetails.cardType} ending in ${savedMethodDetails.lastFour}`
                  : `Credit Card ending in ${lastFourDigits}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cardholder Name</p>
              <p className="font-medium">
                {paymentInfo.useSavedMethod && savedMethodDetails
                  ? savedMethodDetails.cardholderName
                  : paymentInfo.cardName}
              </p>
            </div>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">Order Total</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Ready to Complete Your Purchase</h4>
            <p className="text-sm text-green-700">
              By clicking "Complete Purchase", you agree to our Terms of Service and Privacy Policy. Your eSIM will be
              delivered instantly after payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
