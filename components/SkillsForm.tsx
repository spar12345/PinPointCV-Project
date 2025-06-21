"use client"

import { useState } from "react"
import type { Skills } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Edit3, Code, Heart, Sparkles, Zap, PlusCircle } from "lucide-react"

interface SkillsFormProps {
  data: Skills
  heading: string
  onChange: (data: Skills) => void
  onHeadingChange: (heading: string) => void
}

export default function SkillsForm({ data, heading, onChange, onHeadingChange }: SkillsFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)
  const [newTechSkill, setNewTechSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")
  const [customTechSkill, setCustomTechSkill] = useState("")
  const [customSoftSkill, setCustomSoftSkill] = useState("")

  const addTechnicalSkill = () => {
    if (newTechSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechSkill.trim()],
      })
      setNewTechSkill("")
    }
  }

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()],
      })
      setNewSoftSkill("")
    }
  }

  const addCustomTechnicalSkill = () => {
    if (customTechSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, customTechSkill.trim()],
      })
      setCustomTechSkill("")
    }
  }

  const addCustomSoftSkill = () => {
    if (customSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, customSoftSkill.trim()],
      })
      setCustomSoftSkill("")
    }
  }

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index),
    })
  }

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index),
    })
  }

  // Categorized technical skills like HackerRank
  const technicalSkillCategories = {
    "Programming Languages": ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Rust", "Swift", "C#", "PHP"],
    "Web Technologies": [
      "React",
      "Node.js",
      "HTML/CSS",
      "Vue.js",
      "Angular",
      "Express.js",
      "Next.js",
      "Django",
      "Flask",
    ],
    Databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Firebase", "Oracle", "SQL Server"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Azure", "GCP", "Jenkins", "Git", "CI/CD", "Terraform"],
    "Tools & Frameworks": ["Git", "Linux", "Figma", "Photoshop", "Jira", "Slack", "VS Code", "IntelliJ", "Postman"],
    "Data Science & AI": ["Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
  }

  const softSkillOptions = [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "Critical Thinking",
    "Adaptability",
    "Time Management",
    "Creativity",
    "Analytical Skills",
  ]

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
              className="text-xl font-semibold text-center border-2 border-yellow-300 focus:border-yellow-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-full">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-yellow-100"
              >
                <Edit3 className="h-4 w-4 text-yellow-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Add your technical and soft skills</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Technical Skills */}
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-500 p-2 rounded-full">
              <Code className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-medium text-gray-900">Technical Skills</h3>
            <Zap className="h-4 w-4 text-yellow-500" />
          </div>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., React, Python, AWS, Machine Learning"
                value={newTechSkill}
                onChange={(e) => setNewTechSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTechnicalSkill()}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={addTechnicalSkill}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Technical Skills */}
            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border-2 border-dashed border-blue-200 rounded-lg bg-white">
              {data.technical.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Add your technical skills...</p>
              ) : (
                data.technical.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors animate-fadeIn"
                  >
                    {skill}
                    <button
                      onClick={() => removeTechnicalSkill(index)}
                      className="ml-2 hover:text-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>

            {/* Quick Add Technical Skills - Right below technical skills */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                Quick Add Technical Skills
              </h4>
              <div className="space-y-3">
                {Object.entries(technicalSkillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <h5 className="text-xs font-medium text-gray-600 mb-2">{category}</h5>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            if (!data.technical.includes(skill)) {
                              onChange({
                                ...data,
                                technical: [...data.technical, skill],
                              })
                            }
                          }}
                          disabled={data.technical.includes(skill)}
                          className={`text-xs px-2 py-1 rounded border transition-colors ${
                            data.technical.includes(skill)
                              ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                          }`}
                        >
                          {data.technical.includes(skill) ? "✓ " : "+ "}
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add Custom Technical Skill */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <h5 className="text-xs font-medium text-gray-600 mb-2 flex items-center">
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Add Custom Skill
                  </h5>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter custom technical skill..."
                      value={customTechSkill}
                      onChange={(e) => setCustomTechSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addCustomTechnicalSkill()}
                      className="text-xs h-8 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      onClick={addCustomTechnicalSkill}
                      size="sm"
                      className="h-8 px-3 bg-blue-500 hover:bg-blue-600 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Soft Skills */}
        <Card className="p-4 bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-500 p-2 rounded-full">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-medium text-gray-900">Soft Skills</h3>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Leadership, Communication, Problem Solving"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSoftSkill()}
                className="focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={addSoftSkill}
                size="sm"
                className="bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Soft Skills */}
            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border-2 border-dashed border-green-200 rounded-lg bg-white">
              {data.soft.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Add your soft skills...</p>
              ) : (
                data.soft.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors animate-fadeIn"
                  >
                    {skill}
                    <button
                      onClick={() => removeSoftSkill(index)}
                      className="ml-2 hover:text-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>

            {/* Quick Add Soft Skills - Right below soft skills */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-green-500" />
                Quick Add Soft Skills
              </h4>
              <div className="flex flex-wrap gap-1 mb-4">
                {softSkillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      if (!data.soft.includes(skill)) {
                        onChange({
                          ...data,
                          soft: [...data.soft, skill],
                        })
                      }
                    }}
                    disabled={data.soft.includes(skill)}
                    className={`text-xs px-2 py-1 rounded border transition-colors ${
                      data.soft.includes(skill)
                        ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-300"
                    }`}
                  >
                    {data.soft.includes(skill) ? "✓ " : "+ "}
                    {skill}
                  </button>
                ))}
              </div>

              {/* Add Custom Soft Skill */}
              <div className="pt-3 border-t border-gray-200">
                <h5 className="text-xs font-medium text-gray-600 mb-2 flex items-center">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Add Custom Skill
                </h5>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter custom soft skill..."
                    value={customSoftSkill}
                    onChange={(e) => setCustomSoftSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomSoftSkill()}
                    className="text-xs h-8 focus:ring-2 focus:ring-green-500"
                  />
                  <Button
                    onClick={addCustomSoftSkill}
                    size="sm"
                    className="h-8 px-3 bg-green-500 hover:bg-green-600 text-xs"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
