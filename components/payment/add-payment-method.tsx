"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  formatCardNumber,
  formatExpiryDate,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateCardholderName,
} from "@/lib/client-payment-utils"
import { savePaymentMethod } from "@/lib/payment-actions"

interface AddPaymentMethodProps {
  onSuccess?: (paymentMethod: any) => void
  onCancel?: () => void
  defaultValues?: {
    cardNumber?: string
    cardName?: string
    expiryDate?: string
    cvv?: string
  }
}

export function AddPaymentMethod({ onSuccess, onCancel, defaultValues = {} }: AddPaymentMethodProps) {
  const [formData, setFormData] = useState({
    cardNumber: defaultValues.cardNumber || "",
    cardName: defaultValues.cardName || "",
    expiryDate: defaultValues.expiryDate || "",
    cvv: defaultValues.cvv || "",
    saveCard: true,
    makeDefault: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value)
    }

    // Format expiry date as MM/YY
    if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value)
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
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "cardNumber":
        return validateCardNumber(value)
      case "cardName":
        return validateCardholderName(value)
      case "expiryDate":
        return validateExpiryDate(value)
      case "cvv":
        return validateCVV(value)
      default:
        return ""
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    let hasErrors = false

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "cardNumber" || key === "cardName" || key === "expiryDate" || key === "cvv") {
        const error = validateField(key, value as string)
        if (error) {
          newErrors[key] = error
          hasErrors = true
        }
      }
    })

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // If we're not saving the card, just call onSuccess
    if (!formData.saveCard) {
      if (onSuccess) {
        onSuccess({
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        })
      }
      return
    }

    // Otherwise, save the card
    setIsSubmitting(true)
    try {
      const result = await savePaymentMethod({
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        makeDefault: formData.makeDefault,
      })

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (error) {
      console.error("Error saving payment method:", error)
      setErrors((prev) => ({ ...prev, submit: "Failed to save payment method. Please try again." }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Payment Information</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Lock className="h-3 w-3 mr-1" />
          Secure Payment
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1234 5678 9012 3456"
            className={`pl-10 ${errors.cardNumber ? "border-red-500" : ""}`}
            maxLength={19}
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="John Doe"
          className={errors.cardName ? "border-red-500" : ""}
        />
        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="MM/YY"
            className={errors.expiryDate ? "border-red-500" : ""}
          />
          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="123"
            className={errors.cvv ? "border-red-500" : ""}
            maxLength={4}
          />
          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveCard"
            checked={formData.saveCard}
            onCheckedChange={(checked) => handleCheckboxChange("saveCard", checked === true)}
          />
          <Label htmlFor="saveCard" className="text-sm font-normal">
            Save card for future purchases
          </Label>
        </div>

        {formData.saveCard && (
          <div className="flex items-center space-x-2 ml-6">
            <Checkbox
              id="makeDefault"
              checked={formData.makeDefault}
              onCheckedChange={(checked) => handleCheckboxChange("makeDefault", checked === true)}
            />
            <Label htmlFor="makeDefault" className="text-sm font-normal">
              Make this my default payment method
            </Label>
          </div>
        )}
      </div>

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-[#005EB8] hover:bg-[#004a93]" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Payment Method"}
        </Button>
      </div>
    </form>
  )
}
