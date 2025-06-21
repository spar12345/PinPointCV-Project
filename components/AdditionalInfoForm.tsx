"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Edit3, FileText, Sparkles, Info } from "lucide-react"

interface AdditionalInfoFormProps {
  data: string
  heading: string
  onChange: (data: string) => void
  onHeadingChange: (heading: string) => void
}

export default function AdditionalInfoForm({ data, heading, onChange, onHeadingChange }: AdditionalInfoFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)

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
                <FileText className="h-5 w-5 text-white" />
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
            <p className="text-sm text-gray-600">Add any additional information about yourself</p>
          </div>
        )}
      </div>

      {/* Additional Info Textarea */}
      <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="additional-info" className="flex items-center text-gray-700">
              <Info className="h-4 w-4 mr-2 text-indigo-500" />
              Additional Information
            </Label>
            <Textarea
              id="additional-info"
              placeholder="Add any additional information such as languages, hobbies, volunteer work, awards, or other relevant details..."
              value={data}
              onChange={(e) => onChange(e.target.value)}
              className="min-h-[120px] resize-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          {/* Character count */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{data.length} characters</span>
            <span>Keep it concise and relevant</span>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <h4 className="font-medium text-indigo-800 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />💡 What to include:
        </h4>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• Languages spoken (with proficiency level)</li>
          <li>• Volunteer work or community involvement</li>
          <li>• Awards and recognitions</li>
          <li>• Professional memberships</li>
          <li>• Relevant hobbies or interests</li>
          <li>• Publications or research work</li>
        </ul>
      </Card>
    </div>
  )
}
