"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SavedPaymentMethod } from "@/components/payment/saved-payment-methods"
import {
  formatCardNumber,
  formatExpiryDate,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateCardholderName,
} from "@/lib/client-payment-utils"
import { updatePaymentMethod } from "@/lib/payment-actions"

interface EditPaymentMethodProps {
  paymentMethod: SavedPaymentMethod
  onSuccess?: (paymentMethod: SavedPaymentMethod) => void
  onCancel?: () => void
}

export function EditPaymentMethod({ paymentMethod, onSuccess, onCancel }: EditPaymentMethodProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: paymentMethod.cardholderName,
    expiryDate: paymentMethod.expiryDate,
    cvv: "",
    makeDefault: paymentMethod.isDefault,
    updateCardNumber: false,
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

    // Only validate if the field is required or has a value
    if (
      (name === "cardNumber" && formData.updateCardNumber) ||
      (name !== "cardNumber" && name !== "cvv") ||
      (name === "cvv" && formData.updateCardNumber)
    ) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const newErrors: Record<string, string> = {}
    let hasErrors = false

    // Always validate name and expiry date
    const expiryDateError = validateField("expiryDate", formData.expiryDate)
    if (expiryDateError) {
      newErrors.expiryDate = expiryDateError
      hasErrors = true
    }

    const cardNameError = validateField("cardName", formData.cardName)
    if (cardNameError) {
      newErrors.cardName = cardNameError
      hasErrors = true
    }

    // Only validate card number and CVV if updating card number
    if (formData.updateCardNumber) {
      const cardNumberError = validateField("cardNumber", formData.cardNumber)
      if (cardNumberError) {
        newErrors.cardNumber = cardNumberError
        hasErrors = true
      }

      const cvvError = validateField("cvv", formData.cvv)
      if (cvvError) {
        newErrors.cvv = cvvError
        hasErrors = true
      }
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const result = await updatePaymentMethod({
        id: paymentMethod.id,
        cardNumber: formData.updateCardNumber ? formData.cardNumber : undefined,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        cvv: formData.updateCardNumber ? formData.cvv : undefined,
        makeDefault: formData.makeDefault,
      })

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (error) {
      console.error("Error updating payment method:", error)
      setErrors((prev) => ({ ...prev, submit: "Failed to update payment method. Please try again." }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="updateCardNumber"
            checked={formData.updateCardNumber}
            onCheckedChange={(checked) => handleCheckboxChange("updateCardNumber", checked === true)}
          />
          <Label htmlFor="updateCardNumber" className="text-sm font-normal">
            Update card number
          </Label>
        </div>
      </div>

      {formData.updateCardNumber && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">New Card Number</Label>
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
        </>
      )}

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="makeDefault"
            checked={formData.makeDefault}
            onCheckedChange={(checked) => handleCheckboxChange("makeDefault", checked === true)}
          />
          <Label htmlFor="makeDefault" className="text-sm font-normal">
            Make this my default payment method
          </Label>
        </div>
      </div>

      <div className="flex items-center text-xs text-gray-500 mt-2">
        <Lock className="h-3 w-3 mr-1" />
        Your card information is encrypted and securely stored
      </div>

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-[#005EB8] hover:bg-[#004a93]" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
