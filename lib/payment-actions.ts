"use server"

import { cookies } from "next/headers"
import type { SavedPaymentMethod } from "@/components/payment/saved-payment-methods"

// This is a mock implementation for demonstration purposes
// In a real application, this would connect to a payment processor and database

// Helper to get stored payment methods from cookies (for demo purposes)
function getStoredPaymentMethods(): SavedPaymentMethod[] {
  const cookieStore = cookies()
  const paymentMethodsCookie = cookieStore.get("payment_methods")

  if (!paymentMethodsCookie?.value) {
    return []
  }

  try {
    return JSON.parse(paymentMethodsCookie.value)
  } catch (error) {
    console.error("Error parsing payment methods cookie:", error)
    return []
  }
}

// Helper to store payment methods in cookies (for demo purposes)
function storePaymentMethods(methods: SavedPaymentMethod[]) {
  cookies().set("payment_methods", JSON.stringify(methods), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
}

export async function getUserPaymentMethods(): Promise<SavedPaymentMethod[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, you would fetch from your database
  // For demo purposes, we'll use cookies to persist data
  const storedMethods = getStoredPaymentMethods()

  // If no stored methods, create some demo data
  if (storedMethods.length === 0) {
    const demoMethods: SavedPaymentMethod[] = [
      {
        id: "pm_" + Math.random().toString(36).substring(2, 15),
        cardType: "Visa",
        lastFour: "4242",
        expiryDate: "12/25",
        cardholderName: "John Doe",
        isDefault: true,
      },
      {
        id: "pm_" + Math.random().toString(36).substring(2, 15),
        cardType: "Mastercard",
        lastFour: "5555",
        expiryDate: "10/24",
        cardholderName: "John Doe",
        isDefault: false,
      },
    ]

    storePaymentMethods(demoMethods)
    return demoMethods
  }

  return storedMethods
}

export async function savePaymentMethod(data: {
  cardNumber: string
  cardName: string
  expiryDate: string
  makeDefault: boolean
}): Promise<SavedPaymentMethod> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // In a real app, you would send this to your payment processor
  // and store a token in your database

  // Extract card type and last four digits
  const cardNumber = data.cardNumber.replace(/\s/g, "")
  const lastFour = cardNumber.slice(-4)

  // Determine card type based on first digit
  let cardType = "Credit Card"
  const firstDigit = cardNumber.charAt(0)
  if (firstDigit === "4") {
    cardType = "Visa"
  } else if (firstDigit === "5") {
    cardType = "Mastercard"
  } else if (firstDigit === "3") {
    cardType = "Amex"
  } else if (firstDigit === "6") {
    cardType = "Discover"
  }

  // Create new payment method
  const newMethod: SavedPaymentMethod = {
    id: "pm_" + Math.random().toString(36).substring(2, 15),
    cardType,
    lastFour,
    expiryDate: data.expiryDate,
    cardholderName: data.cardName,
    isDefault: data.makeDefault,
  }

  // Get existing methods
  const existingMethods = getStoredPaymentMethods()

  // If this is the default, update all others
  let updatedMethods = existingMethods
  if (data.makeDefault) {
    updatedMethods = existingMethods.map((method) => ({
      ...method,
      isDefault: false,
    }))
  }

  // Add the new method
  const newMethods = [newMethod, ...updatedMethods]

  // Store updated methods
  storePaymentMethods(newMethods)

  return newMethod
}

export async function deleteSavedPaymentMethod(id: string): Promise<{ success: boolean }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Get existing methods
  const existingMethods = getStoredPaymentMethods()

  // Filter out the deleted method
  const updatedMethods = existingMethods.filter((method) => method.id !== id)

  // If we deleted the default method, make the first remaining one default
  if (existingMethods.find((m) => m.id === id)?.isDefault && updatedMethods.length > 0) {
    updatedMethods[0].isDefault = true
  }

  // Store updated methods
  storePaymentMethods(updatedMethods)

  return { success: true }
}

export async function getPaymentMethodById(id: string): Promise<SavedPaymentMethod | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Get existing methods
  const existingMethods = getStoredPaymentMethods()

  // Find the method by ID
  const method = existingMethods.find((m) => m.id === id)

  return method || null
}

export async function updatePaymentMethod(data: {
  id: string
  cardNumber?: string
  cardName: string
  expiryDate: string
  cvv?: string
  makeDefault: boolean
}): Promise<SavedPaymentMethod> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // In a real app, you would send this to your payment processor
  // and update the token in your database

  // Get existing methods
  const existingMethods = getStoredPaymentMethods()

  // Find the method to update
  const methodIndex = existingMethods.findIndex((m) => m.id === data.id)

  if (methodIndex === -1) {
    throw new Error("Payment method not found")
  }

  // Create updated method
  const updatedMethod: SavedPaymentMethod = {
    ...existingMethods[methodIndex],
    cardholderName: data.cardName,
    expiryDate: data.expiryDate,
    isDefault: data.makeDefault,
  }

  // If updating card number, update card type and last four
  if (data.cardNumber) {
    const cardNumber = data.cardNumber.replace(/\s/g, "")
    const lastFour = cardNumber.slice(-4)

    // Determine card type based on first digit
    let cardType = "Credit Card"
    const firstDigit = cardNumber.charAt(0)
    if (firstDigit === "4") {
      cardType = "Visa"
    } else if (firstDigit === "5") {
      cardType = "Mastercard"
    } else if (firstDigit === "3") {
      cardType = "Amex"
    } else if (firstDigit === "6") {
      cardType = "Discover"
    }

    updatedMethod.cardType = cardType
    updatedMethod.lastFour = lastFour
  }

  // Create new array with updated method
  const updatedMethods = [...existingMethods]
  updatedMethods[methodIndex] = updatedMethod

  // If this is the default, update all others
  if (data.makeDefault) {
    for (let i = 0; i < updatedMethods.length; i++) {
      if (i !== methodIndex) {
        updatedMethods[i] = {
          ...updatedMethods[i],
          isDefault: false,
        }
      }
    }
  }

  // Store updated methods
  storePaymentMethods(updatedMethods)

  return updatedMethod
}
