"use client"

import { useState } from "react"
import type { Education } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit3, GraduationCap, Sparkles, Trophy, MapPin } from "lucide-react"

interface EducationFormProps {
  data: Education[]
  heading: string
  onDataChange: (data: Education[]) => void
  onHeadingChange: (heading: string) => void
}

export default function EducationForm({ data, heading, onDataChange, onHeadingChange }: EducationFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)

  const degreeTypes = [
    "10th Grade",
    "12th Grade",
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
    "Certificate",
    "Diploma",
    "Other",
  ]

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      location: "",
      degreeType: "",
      fieldOfStudy: "",
      score: "",
      scoreType: "percentage",
      year: "",
    }
    onDataChange([...data, newEducation])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onDataChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onDataChange(data.filter((edu) => edu.id !== id))
  }

  const getScoreType = (degreeType: string): "percentage" | "cgpa" => {
    return ["10th Grade", "12th Grade"].includes(degreeType) ? "percentage" : "cgpa"
  }

  const handleDegreeTypeChange = (id: string, degreeType: string) => {
    const scoreType = getScoreType(degreeType)
    onDataChange(
      data.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              degreeType: degreeType,
              scoreType: scoreType,
              score: "", // Clear score when changing degree type
            }
          : edu,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Editable Heading with Fun Animation */}
      <div className="text-center">
        {editingHeading ? (
          <div className="space-y-2">
            <Input
              value={heading}
              onChange={(e) => onHeadingChange(e.target.value)}
              onBlur={() => setEditingHeading(false)}
              onKeyPress={(e) => e.key === "Enter" && setEditingHeading(false)}
              className="text-xl font-semibold text-center border-2 border-blue-300 focus:border-blue-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-100"
              >
                <Edit3 className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Add your educational qualifications</p>
          </div>
        )}
      </div>

      {/* Education Entries with Enhanced Cards */}
      <div className="space-y-4">
        {data.map((education, index) => (
          <Card
            key={education.id}
            className="p-4 border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-green-50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-medium text-gray-900">Education #{index + 1}</h3>
                {education.institution && education.degreeType && <Trophy className="h-4 w-4 text-yellow-500" />}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                  Degree Type *
                </Label>
                <Select
                  value={education.degreeType}
                  onValueChange={(value) => handleDegreeTypeChange(education.id, value)}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-green-500">
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Institution/School *</Label>
                <Input
                  placeholder="Institution name"
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-green-500" />
                  Location *
                </Label>
                <Input
                  placeholder="Boston, MA"
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Field of Study *</Label>
                <Input
                  placeholder="Computer Science"
                  value={education.fieldOfStudy}
                  onChange={(e) => updateEducation(education.id, "fieldOfStudy", e.target.value)}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Graduation Year *</Label>
                <Input
                  placeholder="May 2024"
                  value={education.year}
                  onChange={(e) => updateEducation(education.id, "year", e.target.value)}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  {education.scoreType === "percentage" ? "Percentage" : "CGPA"} *
                  <span className="ml-1 text-xs text-gray-500">
                    ({education.scoreType === "percentage" ? "e.g., 85%" : "e.g., 8.5/10"})
                  </span>
                </Label>
                <Input
                  placeholder={education.scoreType === "percentage" ? "85" : "8.5"}
                  value={education.score}
                  onChange={(e) => updateEducation(education.id, "score", e.target.value)}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Education Button with Animation */}
      <Button
        onClick={addEducation}
        variant="outline"
        className="w-full border-dashed border-2 border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>

      {/* Tips Card */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />💡 Education Tips
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• List education in reverse chronological order (most recent first)</li>
          <li>• Use percentage for 10th/12th grades, CGPA for higher education</li>
          <li>• Include GPA/percentage if 3.5+ or 75%+</li>
          <li>• Use full institution names (not abbreviations)</li>
          <li>• Mention honors or academic achievements</li>
        </ul>
      </Card>
    </div>
  )
}
