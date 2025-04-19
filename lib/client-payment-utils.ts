"use client"

// This file contains client-side utilities for payment methods
// It doesn't use any server-only APIs

// Mock data for client-side rendering before server data is available
export const getInitialPaymentMethods = () => {
  return []
}

// Helper to determine card type from card number
export const getCardTypeFromNumber = (cardNumber: string): string => {
  const firstDigit = cardNumber.charAt(0)
  if (firstDigit === "4") return "Visa"
  if (firstDigit === "5") return "Mastercard"
  if (firstDigit === "3") return "Amex"
  if (firstDigit === "6") return "Discover"
  return "Credit Card"
}

// Format card number with spaces
export const formatCardNumber = (value: string): string => {
  return value
    .replace(/\s/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim()
    .slice(0, 19)
}

// Format expiry date as MM/YY
export const formatExpiryDate = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{0,2})/, "$1/$2")
    .slice(0, 5)
}

// Validate card number
export const validateCardNumber = (value: string): string => {
  return value.replace(/\s/g, "").length >= 16 ? "" : "Please enter a valid card number"
}

// Validate expiry date
export const validateExpiryDate = (value: string): string => {
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
}

// Validate CVV
export const validateCVV = (value: string): string => {
  return value.length >= 3 ? "" : "Please enter a valid CVV"
}

// Validate cardholder name
export const validateCardholderName = (value: string): string => {
  return value.trim() ? "" : "Please enter the name on your card"
}
