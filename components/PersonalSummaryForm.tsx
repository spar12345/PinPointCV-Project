"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Edit3, FileText, Sparkles, User, Lightbulb } from "lucide-react"

interface PersonalSummaryFormProps {
  data: string
  heading: string
  onChange: (data: string) => void
  onHeadingChange: (heading: string) => void
}

export default function PersonalSummaryForm({ data, heading, onChange, onHeadingChange }: PersonalSummaryFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)

  const wordCount = data
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const charCount = data.length

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
              className="text-xl font-semibold text-center border-2 border-indigo-300 focus:border-indigo-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-indigo-100"
              >
                <Edit3 className="h-4 w-4 text-indigo-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Write a compelling professional summary</p>
          </div>
        )}
      </div>

      {/* Personal Summary Textarea */}
      <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personal-summary" className="flex items-center text-gray-700">
              <FileText className="h-4 w-4 mr-2 text-indigo-500" />
              Professional Summary
            </Label>
            <Textarea
              id="personal-summary"
              placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives. Keep it concise and impactful (2-3 sentences)..."
              value={data}
              onChange={(e) => onChange(e.target.value)}
              className="min-h-[120px] resize-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          {/* Character and word count */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>
              {wordCount} words • {charCount} characters
            </span>
            <span className={wordCount > 50 ? "text-red-500" : "text-green-600"}>
              {wordCount <= 50 ? "Good length" : "Consider shortening"}
            </span>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
          <Lightbulb className="h-4 w-4 mr-2" />💡 Summary Writing Tips:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start with your professional title or area of expertise</li>
          <li>• Highlight 2-3 key skills or achievements</li>
          <li>• Mention years of experience if relevant</li>
          <li>• Keep it to 2-3 sentences (30-50 words)</li>
          <li>• Use action words and quantify achievements when possible</li>
          <li>• Tailor it to match the job you're applying for</li>
        </ul>
      </Card>

      {/* Example */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <h4 className="font-medium text-green-800 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />✨ Example:
        </h4>
        <p className="text-sm text-green-700 italic">
          "Results-driven Software Engineer with 3+ years of experience developing scalable web applications. Proficient
          in React, Node.js, and cloud technologies with a track record of improving system performance by 40%. Seeking
          to leverage technical expertise and problem-solving skills in a senior development role."
        </p>
      </Card>
    </div>
  )
}
