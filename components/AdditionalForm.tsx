"use client"

import { useState } from "react"
import type { AdditionalSection } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Edit3, Star, Globe, Trophy, Award, Sparkles, PlusCircle } from "lucide-react"

interface AdditionalFormProps {
  data: AdditionalSection
  heading: string
  onDataChange: (data: AdditionalSection) => void
  onHeadingChange: (heading: string) => void
}

export default function AdditionalForm({ data, heading, onDataChange, onHeadingChange }: AdditionalFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)
  const [editingOtherHeading, setEditingOtherHeading] = useState(false)
  const [otherHeading, setOtherHeading] = useState("Other")
  const [newLanguage, setNewLanguage] = useState("")
  const [newAchievement, setNewAchievement] = useState("")
  const [newAward, setNewAward] = useState("")
  const [newOther, setNewOther] = useState("")

  const addLanguage = () => {
    if (newLanguage.trim()) {
      onDataChange({
        ...data,
        languages: [...data.languages, newLanguage.trim()],
      })
      setNewLanguage("")
    }
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      onDataChange({
        ...data,
        achievements: [...data.achievements, newAchievement.trim()],
      })
      setNewAchievement("")
    }
  }

  const addAward = () => {
    if (newAward.trim()) {
      onDataChange({
        ...data,
        awards: [...data.awards, newAward.trim()],
      })
      setNewAward("")
    }
  }

  const addOther = () => {
    if (newOther.trim()) {
      onDataChange({
        ...data,
        other: [...data.other, newOther.trim()],
      })
      setNewOther("")
    }
  }

  const removeLanguage = (index: number) => {
    onDataChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    })
  }

  const removeAchievement = (index: number) => {
    onDataChange({
      ...data,
      achievements: data.achievements.filter((_, i) => i !== index),
    })
  }

  const removeAward = (index: number) => {
    onDataChange({
      ...data,
      awards: data.awards.filter((_, i) => i !== index),
    })
  }

  const removeOther = (index: number) => {
    onDataChange({
      ...data,
      other: data.other.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      {/* Editable Main Heading */}
      <div className="text-center">
        {editingHeading ? (
          <div className="space-y-2">
            <Input
              value={heading}
              onChange={(e) => onHeadingChange(e.target.value)}
              onBlur={() => setEditingHeading(false)}
              onKeyPress={(e) => e.key === "Enter" && setEditingHeading(false)}
              className="text-xl font-semibold text-center border-2 border-teal-300 focus:border-teal-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-full">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-teal-100"
              >
                <Edit3 className="h-4 w-4 text-teal-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Add languages, achievements, awards, and other information</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages */}
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-500 p-2 rounded-full">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-medium text-gray-900">Languages</h3>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., English (Fluent), Spanish (Conversational)"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={addLanguage}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border-2 border-dashed border-blue-200 rounded-lg">
              {data.languages.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Add languages you speak...</p>
              ) : (
                data.languages.map((language, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    {language}
                    <button onClick={() => removeLanguage(index)} className="ml-2 hover:text-red-600 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-500 p-2 rounded-full">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-medium text-gray-900">Achievements</h3>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Published research paper, Led team of 10"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAchievement()}
                className="focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={addAchievement}
                size="sm"
                className="bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border-2 border-dashed border-green-200 rounded-lg">
              {data.achievements.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Add your achievements...</p>
              ) : (
                data.achievements.map((achievement, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                  >
                    {achievement}
                    <button
                      onClick={() => removeAchievement(index)}
                      className="ml-2 hover:text-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Awards */}
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Award className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-medium text-gray-900">Awards</h3>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Dean's List, Employee of the Month"
                value={newAward}
                onChange={(e) => setNewAward(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAward()}
                className="focus:ring-2 focus:ring-yellow-500"
              />
              <Button
                onClick={addAward}
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border-2 border-dashed border-yellow-200 rounded-lg">
              {data.awards.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Add your awards...</p>
              ) : (
                data.awards.map((award, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
                  >
                    {award}
                    <button onClick={() => removeAward(index)} className="ml-2 hover:text-red-600 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Other Information with Editable Heading */}
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-500 p-2 rounded-full">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              {editingOtherHeading ? (
                <Input
                  value={otherHeading}
                  onChange={(e) => setOtherHeading(e.target.value)}
                  onBlur={() => setEditingOtherHeading(false)}
                  onKeyPress={(e) => e.key === "Enter" && setEditingOtherHeading(false)}
                  className="font-medium text-gray-900 w-32 h-8 text-sm"
                  autoFocus
                />
              ) : (
                <h3 className="font-medium text-gray-900">{otherHeading}</h3>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingOtherHeading(true)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Volunteer work, Hobbies, Publications"
                value={newOther}
                onChange={(e) => setNewOther(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addOther()}
                className="focus:ring-2 focus:ring-purple-500"
              />
              <Button
                onClick={addOther}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border-2 border-dashed border-purple-200 rounded-lg">
              {data.other.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Add other relevant information...</p>
              ) : (
                data.other.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                  >
                    {item}
                    <button onClick={() => removeOther(index)} className="ml-2 hover:text-red-600 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Add Sections Button */}
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
        <Button
          variant="outline"
          className="w-full border-dashed border-2 border-teal-300 text-teal-600 hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 transform hover:scale-105"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Sections
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Add custom sections like Publications, Volunteer Work, etc.
        </p>
      </Card>

      {/* Tips Card */}
      <Card className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <h4 className="font-medium text-teal-800 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />💡 Additional Section Tips
        </h4>
        <ul className="text-sm text-teal-700 space-y-1">
          <li>
            • <strong>Languages:</strong> Include proficiency level (Fluent, Conversational, Basic)
          </li>
          <li>
            • <strong>Achievements:</strong> Quantify when possible (increased sales by 20%)
          </li>
          <li>
            • <strong>Awards:</strong> Include year and organization if relevant
          </li>
          <li>
            • <strong>{otherHeading}:</strong> Volunteer work, publications, relevant hobbies
          </li>
        </ul>
      </Card>
    </div>
  )
}
