"use client"

import type { PersonalDetails } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin, Sparkles, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface PersonalDetailsFormProps {
  data: PersonalDetails
  onChange: (data: PersonalDetails) => void
}

export default function PersonalDetailsForm({ data, onChange }: PersonalDetailsFormProps) {
  const [completedFields, setCompletedFields] = useState<string[]>([])

  useEffect(() => {
    const completed = Object.entries(data)
      .filter(([key, value]) => value.trim() !== "")
      .map(([key]) => key)
    setCompletedFields(completed)
  }, [data])

  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    {
      key: "name" as keyof PersonalDetails,
      label: "Full Name",
      icon: User,
      placeholder: "John Doe",
      required: true,
      color: "text-blue-500",
    },
    {
      key: "email" as keyof PersonalDetails,
      label: "Email Address",
      icon: Mail,
      placeholder: "john.doe@email.com",
      required: true,
      color: "text-green-500",
    },
    {
      key: "phone" as keyof PersonalDetails,
      label: "Phone Number",
      icon: Phone,
      placeholder: "+1 (555) 123-4567",
      required: true,
      color: "text-purple-500",
    },
    {
      key: "location" as keyof PersonalDetails,
      label: "Location",
      icon: MapPin,
      placeholder: "New York, NY",
      required: true,
      color: "text-red-500",
    },
    {
      key: "portfolio" as keyof PersonalDetails,
      label: "Portfolio Website",
      icon: Globe,
      placeholder: "https://johndoe.dev",
      color: "text-orange-500",
    },
    {
      key: "linkedin" as keyof PersonalDetails,
      label: "LinkedIn Profile",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/johndoe",
      color: "text-blue-600",
    },
    {
      key: "github" as keyof PersonalDetails,
      label: "GitHub Profile",
      icon: Github,
      placeholder: "https://github.com/johndoe",
      color: "text-gray-700",
    },
  ]

  const requiredFieldsCompleted = data.name && data.email && data.phone && data.location
  const completionPercentage = (completedFields.length / fields.length) * 100

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
            <User className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Personal Details</h2>
        </div>
        <p className="text-sm text-gray-600">Let's start with your basic information</p>

        {/* Fun Progress Indicator */}
        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{Math.round(completionPercentage)}% Complete</p>
      </div>

      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon
          const isCompleted = completedFields.includes(field.key)

          return (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-sm font-medium text-gray-700 flex items-center">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                {isCompleted && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
              </Label>
              <div className="relative group">
                <Icon
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${field.color} transition-all duration-200 group-focus-within:scale-110`}
                />
                <Input
                  id={field.key}
                  type={field.key === "email" ? "email" : "text"}
                  placeholder={field.placeholder}
                  value={data[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                    isCompleted ? "border-green-300 bg-green-50" : ""
                  }`}
                  required={field.required}
                />
                {isCompleted && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Completion Status Card */}
      <Card
        className={`p-4 transition-all duration-300 ${
          requiredFieldsCompleted
            ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
            : "bg-yellow-50 border-yellow-200"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              requiredFieldsCompleted ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {requiredFieldsCompleted ? (
              <CheckCircle className="h-5 w-5 text-white" />
            ) : (
              <Sparkles className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {requiredFieldsCompleted ? "🎉 Great! Required fields completed!" : "📝 Fill required fields to continue"}
            </p>
            <p className="text-sm text-gray-600">
              {completedFields.length} of {fields.length} fields completed
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
