"use client"

import { useState } from "react"
import type { Experience } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit3, Briefcase, PlusCircle, Sparkles, Trophy, MapPin } from "lucide-react"

interface ExperienceFormProps {
  data: Experience[]
  heading: string
  onDataChange: (data: Experience[]) => void
  onHeadingChange: (heading: string) => void
}

export default function ExperienceForm({ data, heading, onDataChange, onHeadingChange }: ExperienceFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      duration: "",
      description: [""],
    }
    onDataChange([...data, newExperience])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    onDataChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    onDataChange(data.filter((exp) => exp.id !== id))
  }

  const addDescriptionPoint = (id: string) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) {
      updateExperience(id, "description", [...experience.description, ""])
    }
  }

  const updateDescriptionPoint = (id: string, index: number, value: string) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) {
      const newDescription = [...experience.description]
      newDescription[index] = value
      updateExperience(id, "description", newDescription)
    }
  }

  const removeDescriptionPoint = (id: string, index: number) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience && experience.description.length > 1) {
      const newDescription = experience.description.filter((_, i) => i !== index)
      updateExperience(id, "description", newDescription)
    }
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
              className="text-xl font-semibold text-center border-2 border-purple-300 focus:border-purple-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save (e.g., "Internships", "Work Experience")</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-purple-100"
              >
                <Edit3 className="h-4 w-4 text-purple-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Add your work experience and internships</p>
          </div>
        )}
      </div>

      {/* Experience Entries */}
      <div className="space-y-4">
        {data.map((experience, index) => (
          <Card
            key={experience.id}
            className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-purple-50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-medium text-gray-900">Experience #{index + 1}</h3>
                {experience.title && experience.company && <Trophy className="h-4 w-4 text-yellow-500" />}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Job Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Sparkles className="h-3 w-3 mr-1 text-purple-500" />
                    Job Title *
                  </Label>
                  <Input
                    placeholder="Software Engineer"
                    value={experience.title}
                    onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    placeholder="Tech Company Inc."
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Location and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-purple-500" />
                    Location *
                  </Label>
                  <Input
                    placeholder="San Francisco, CA"
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration *</Label>
                  <Input
                    placeholder="Jan 2023 - Present"
                    value={experience.duration}
                    onChange={(e) => updateExperience(experience.id, "duration", e.target.value)}
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <div className="space-y-2">
                  {experience.description.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex space-x-2">
                      <Textarea
                        placeholder="• Describe your responsibilities and achievements with quantifiable results..."
                        value={point}
                        onChange={(e) => updateDescriptionPoint(experience.id, pointIndex, e.target.value)}
                        className="min-h-[60px] focus:ring-2 focus:ring-purple-500"
                      />
                      {experience.description.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDescriptionPoint(experience.id, pointIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addDescriptionPoint(experience.id)}
                    className="w-full border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Description Point
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Experience Button */}
      <Button
        onClick={addExperience}
        variant="outline"
        className="w-full border-dashed border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  )
}
