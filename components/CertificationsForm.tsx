"use client"

import { useState } from "react"
import type { Certification } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Edit3, Award, Sparkles, Trophy, ExternalLink } from "lucide-react"

interface CertificationsFormProps {
  data: Certification[]
  heading: string
  onDataChange: (data: Certification[]) => void
  onHeadingChange: (heading: string) => void
}

export default function CertificationsForm({ data, heading, onDataChange, onHeadingChange }: CertificationsFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      year: "",
      certificateLink: "",
    }
    onDataChange([...data, newCertification])
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onDataChange(data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const removeCertification = (id: string) => {
    onDataChange(data.filter((cert) => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Editable Heading */}
      <div className="text-center">
        {editingHeading ? (
          <div className="space-y-2">
            <Input
              value={heading}
              onChange={(e) => onHeadingChange(e.target.value)}
              onBlur={() => setEditingHeading(false)}
              onKeyPress={(e) => e.key === "Enter" && setEditingHeading(false)}
              className="text-xl font-semibold text-center border-2 border-orange-300 focus:border-orange-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-orange-100"
              >
                <Edit3 className="h-4 w-4 text-orange-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Add your certifications and achievements</p>
          </div>
        )}
      </div>

      {/* Certification Entries */}
      <div className="space-y-4">
        {data.map((certification, index) => (
          <Card
            key={certification.id}
            className="p-4 border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-orange-50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-medium text-gray-900">Certification #{index + 1}</h3>
                {certification.name && certification.issuer && <Trophy className="h-4 w-4 text-yellow-500" />}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(certification.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-orange-500" />
                  Certification Name *
                </Label>
                <Input
                  placeholder="AWS Certified Developer"
                  value={certification.name}
                  onChange={(e) => updateCertification(certification.id, "name", e.target.value)}
                  className="focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Issuing Organization *</Label>
                <Input
                  placeholder="Amazon Web Services"
                  value={certification.issuer}
                  onChange={(e) => updateCertification(certification.id, "issuer", e.target.value)}
                  className="focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Year Obtained *</Label>
                <Input
                  placeholder="2024"
                  value={certification.year}
                  onChange={(e) => updateCertification(certification.id, "year", e.target.value)}
                  className="focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-1 text-blue-600" />
                  Certificate Link (Optional)
                </Label>
                <Input
                  placeholder="https://certificate-url.com"
                  value={certification.certificateLink}
                  onChange={(e) => updateCertification(certification.id, "certificateLink", e.target.value)}
                  className="focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Certification Button */}
      <Button
        onClick={addCertification}
        variant="outline"
        className="w-full border-dashed border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  )
}
