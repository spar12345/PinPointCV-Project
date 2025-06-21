"use client"

import { Progress } from "@/components/ui/progress"
import { Trophy, Star } from "lucide-react"

interface ProgressBarProps {
  progress: number
  completedSections: number
  totalSections: number
}

export default function ProgressBar({ progress, completedSections, totalSections }: ProgressBarProps) {
  const getProgressMessage = () => {
    if (progress === 100) return "🎉 Resume Complete! Ready to download"
    if (progress >= 75) return "🚀 Almost there! Just a few more sections"
    if (progress >= 50) return "💪 Great progress! Keep going"
    if (progress >= 25) return "📝 Good start! Continue building"
    return "🌟 Let's build your amazing resume!"
  }

  const getProgressColor = () => {
    if (progress >= 75) return "from-green-500 to-emerald-500"
    if (progress >= 50) return "from-blue-500 to-purple-500"
    if (progress >= 25) return "from-yellow-500 to-orange-500"
    return "from-gray-400 to-gray-500"
  }

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Resume Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {completedSections}/{totalSections} sections
            </span>
            <div className="flex space-x-1">
              {Array.from({ length: totalSections }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-3 w-3 ${index < completedSections ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Progress value={progress} className="h-3" />
              <div
                className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-700 min-w-[3rem]">{Math.round(progress)}%</span>
        </div>

        <p className="text-xs text-gray-600 mt-1 text-center">{getProgressMessage()}</p>
      </div>
    </div>
  )
}
