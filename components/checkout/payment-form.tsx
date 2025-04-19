"use client"

import type React from "react"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddPaymentMethod } from "@/components/payment/add-payment-method"
import { type SavedPaymentMethod, SavedPaymentMethods } from "@/components/payment/saved-payment-methods"
import { getUserPaymentMethods } from "@/lib/payment-actions"

interface PaymentFormProps {
  initialData: {
    cardNumber: string
    cardName: string
    expiryDate: string
    cvv: string
  }
  onUpdate: (data: any) => void
}

export function PaymentForm({ initialData, onUpdate }: PaymentFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentTab, setPaymentTab] = useState("new-card")
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<SavedPaymentMethod[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SavedPaymentMethod | null>(null)
  const [isLoadingSaved, setIsLoadingSaved] = useState(true)

  useEffect(() => {
    async function loadSavedPaymentMethods() {
      try {
        const methods = await getUserPaymentMethods()
        setSavedPaymentMethods(methods)

        // If we have saved methods, default to using them
        if (methods.length > 0) {
          setPaymentTab("saved-card")
          // Select the default payment method if available
          const defaultMethod = methods.find((m) => m.isDefault) || methods[0]
          setSelectedPaymentMethod(defaultMethod)
          onUpdate({
            useSavedMethod: true,
            savedMethodId: defaultMethod.id,
          })
        }
      } catch (error) {
        console.error("Error loading payment methods:", error)
      } finally {
        setIsLoadingSaved(false)
      }
    }

    loadSavedPaymentMethods()
  }, [onUpdate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)
    }

    // Format expiry date as MM/YY
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5)
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Update parent component
    onUpdate({ [name]: formattedValue, useSavedMethod: false })
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "cardNumber":
        return value.replace(/\s/g, "").length >= 16 ? "" : "Please enter a valid card number"
      case "cardName":
        return value.trim() ? "" : "Please enter the name on your card"
      case "expiryDate":
        const [month, year] = value.split("/")
        const currentYear = new Date().getFullYear() % 100
        const currentMonth = new Date().getMonth() + 1

        if (!month || !year || month.length !== 2 || year.length !== 2) {
          return "Please enter a valid expiry date (MM/YY)"
        }

        const numMonth = Number.parseInt(month, 10)
        const numYear = Number.parseInt(year, 10)

        if (numMonth < 1 || numMonth > 12) {
          return "Month must be between 01-12"
        }

        if (numYear < currentYear || (numYear === currentYear && numMonth < currentMonth)) {
          return "Card has expired"
        }

        return ""
      case "cvv":
        return value.length >= 3 ? "" : "Please enter a valid CVV"
      default:
        return ""
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleTabChange = (value: string) => {
    setPaymentTab(value)

    // Update parent component with the payment method type
    if (value === "saved-card" && selectedPaymentMethod) {
      onUpdate({
        useSavedMethod: true,
        savedMethodId: selectedPaymentMethod.id,
      })
    } else {
      onUpdate({
        useSavedMethod: false,
      })
    }
  }

  const handleSelectPaymentMethod = (method: SavedPaymentMethod) => {
    setSelectedPaymentMethod(method)
    onUpdate({
      useSavedMethod: true,
      savedMethodId: method.id,
    })
  }

  const handleNewPaymentMethodSuccess = (newMethod: SavedPaymentMethod) => {
    setSavedPaymentMethods((prev) => [newMethod, ...prev])
    setPaymentTab("saved-card")
    setSelectedPaymentMethod(newMethod)
    onUpdate({
      useSavedMethod: true,
      savedMethodId: newMethod.id,
    })
  }

  return (
    <div className="space-y-4">
      <Tabs value={paymentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved-card" disabled={savedPaymentMethods.length === 0}>
            Saved Cards
          </TabsTrigger>
          <TabsTrigger value="new-card">New Card</TabsTrigger>
        </TabsList>
        <TabsContent value="saved-card" className="pt-4">
          <SavedPaymentMethods
            paymentMethods={savedPaymentMethods}
            selectable={true}
            selectedId={selectedPaymentMethod?.id}
            onSelect={handleSelectPaymentMethod}
            isLoading={isLoadingSaved}
          />
          <div className="mt-4">
            <Button variant="outline" onClick={() => setPaymentTab("new-card")} className="w-full">
              Use a different card
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="new-card" className="pt-4">
          <AddPaymentMethod defaultValues={formData} onSuccess={handleNewPaymentMethodSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
