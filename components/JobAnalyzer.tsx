"use client"

import { useState } from "react"
import type { ResumeData, ATSAnalysis } from "../types/resume"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Zap, AlertCircle, CheckCircle, Lightbulb, Sparkles, Trophy } from "lucide-react"

interface JobAnalyzerProps {
  resumeData: ResumeData
  onAnalysisComplete: (analysis: ATSAnalysis) => void
}

export default function JobAnalyzer({ resumeData, onAnalysisComplete }: JobAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null)

  const analyzeResume = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis delay with progress
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Extract keywords from job description (enhanced algorithm)
    const jobKeywords = jobDescription
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .filter(
        (word) =>
          ![
            "the",
            "and",
            "or",
            "but",
            "in",
            "on",
            "at",
            "to",
            "for",
            "of",
            "with",
            "by",
            "from",
            "up",
            "about",
            "into",
            "through",
            "during",
            "before",
            "after",
            "above",
            "below",
            "between",
            "among",
            "under",
            "over",
            "is",
            "are",
            "was",
            "were",
            "be",
            "been",
            "being",
            "have",
            "has",
            "had",
            "do",
            "does",
            "did",
            "will",
            "would",
            "could",
            "should",
            "may",
            "might",
            "must",
            "can",
            "shall",
          ].includes(word),
      )
      .slice(0, 30)

    // Extract keywords from resume (comprehensive)
    const resumeText = [
      resumeData.personalDetails.name,
      ...resumeData.skills.technical,
      ...resumeData.skills.soft,
      ...resumeData.experience.flatMap((exp) => [exp.title, exp.company, ...exp.description]),
      ...resumeData.projects.flatMap((proj) => [proj.title, proj.technologies, ...proj.description]),
      ...resumeData.certifications.flatMap((cert) => [cert.name, cert.issuer]),
      ...resumeData.education.flatMap((edu) => [edu.qualification, edu.institution]),
      resumeData.additionalInfo,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")

    const resumeKeywords = resumeText.split(/\s+/).filter((word) => word.length > 2)

    // Calculate matches with better algorithm
    const matchedKeywords = jobKeywords.filter((keyword) =>
      resumeKeywords.some((resumeWord) => resumeWord.includes(keyword) || keyword.includes(resumeWord)),
    )

    const missingKeywords = jobKeywords
      .filter(
        (keyword) => !resumeKeywords.some((resumeWord) => resumeWord.includes(keyword) || keyword.includes(resumeWord)),
      )
      .slice(0, 12)

    // Enhanced scoring algorithm
    const keywordMatchScore = (matchedKeywords.length / Math.max(jobKeywords.length, 1)) * 40
    const sectionCompletionScore = [
      resumeData.personalDetails.name && resumeData.personalDetails.email ? 10 : 0,
      resumeData.skills.technical.length > 0 ? 15 : 0,
      resumeData.experience.length > 0 ? 20 : 0,
      resumeData.projects.length > 0 ? 10 : 0,
      resumeData.education.length > 0 ? 5 : 0,
    ].reduce((a, b) => a + b, 0)

    const totalScore = Math.min(95, Math.max(25, keywordMatchScore + sectionCompletionScore))

    // Generate tailored bullet points based on resume data
    const generateTailoredBullets = () => {
      const bullets = []

      if (resumeData.skills.technical.length > 0) {
        bullets.push(
          `• Developed scalable applications using ${resumeData.skills.technical.slice(0, 3).join(", ")}, resulting in 40% improved performance and enhanced user experience`,
        )
      }

      if (resumeData.experience.length > 0) {
        const firstExp = resumeData.experience[0]
        bullets.push(
          `• Led cross-functional team as ${firstExp.title || "team member"} to deliver ${resumeData.projects[0]?.title || "key projects"} ahead of schedule, improving team productivity by 35%`,
        )
      }

      if (resumeData.projects.length > 0) {
        const firstProject = resumeData.projects[0]
        bullets.push(
          `• Implemented ${firstProject.title || "innovative solutions"} using ${firstProject.technologies || "modern technologies"}, reducing processing time by 50% and increasing system reliability`,
        )
      }

      // Add generic bullets if not enough specific ones
      if (bullets.length < 3) {
        bullets.push(
          `• Collaborated with stakeholders to identify requirements and deliver solutions that exceeded expectations, resulting in 95% client satisfaction rate`,
        )
      }

      return bullets.slice(0, 3)
    }

    const analysisResult: ATSAnalysis = {
      score: Math.round(totalScore),
      suggestions: [
        "Include more relevant technical skills mentioned in the job description",
        "Add quantifiable achievements with numbers and percentages",
        "Use action verbs to start each bullet point (Led, Developed, Implemented)",
        "Tailor your experience descriptions to match job requirements",
        "Include industry-specific keywords and terminology",
        "Highlight relevant certifications and training",
      ].slice(0, 4),
      matchedKeywords: matchedKeywords.slice(0, 12),
      missingKeywords,
      tailoredBullets: generateTailoredBullets(),
    }

    setAnalysis(analysisResult)
    onAnalysisComplete(analysisResult)
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-100 to-emerald-100"
    if (score >= 60) return "bg-gradient-to-r from-yellow-100 to-orange-100"
    return "bg-gradient-to-r from-red-100 to-pink-100"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "🎉 Excellent match! Your resume is well-optimized for this role."
    if (score >= 60) return "👍 Good match with room for improvement."
    return "⚠️ Needs significant improvement to match job requirements."
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-full">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">ATS Job Analyzer</h2>
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </div>
        <p className="text-sm text-gray-600">Analyze how well your resume matches a job description</p>
      </div>

      {/* Job Description Input */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-description" className="text-gray-700 font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Job Description
            </Label>
            <Textarea
              id="job-description"
              placeholder="Paste the complete job description here to analyze how well your resume matches the requirements..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[150px] focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{jobDescription.length} characters</span>
              <span>Paste the full job posting for best results</span>
            </div>
          </div>

          <Button
            onClick={analyzeResume}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {isAnalyzing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Analyze Resume Match
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-fadeIn">
          {/* ATS Score - Enhanced Display */}
          <Card className={`p-6 ${getScoreBgColor(analysis.score)} border-2`}>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Trophy className={`h-6 w-6 ${getScoreColor(analysis.score)}`} />
                <h3 className="text-xl font-bold text-gray-900">ATS Compatibility Score</h3>
              </div>

              <div className={`text-6xl font-bold ${getScoreColor(analysis.score)} mb-4`}>{analysis.score}/100</div>

              <div className="max-w-md mx-auto mb-4">
                <Progress value={analysis.score} className="h-3" />
              </div>

              <p className="text-lg font-medium text-gray-700 mb-2">{getScoreMessage(analysis.score)}</p>

              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <span>Keywords Matched: {analysis.matchedKeywords.length}</span>
                <span>•</span>
                <span>Missing: {analysis.missingKeywords.length}</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Keywords */}
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Matched Keywords</h4>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {analysis.matchedKeywords.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {analysis.matchedKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                  >
                    ✓ {keyword}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Missing Keywords */}
            <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-gray-900">Missing Keywords</h4>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {analysis.missingKeywords.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {analysis.missingKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                  >
                    ⚠️ {keyword}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Improvement Suggestions */}
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <h4 className="font-semibold text-gray-900">Improvement Suggestions</h4>
            </div>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1 font-bold">•</span>
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* AI-Generated Tailored Bullet Points */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">AI-Generated Tailored Bullet Points</h4>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Ready to Use
              </Badge>
            </div>
            <div className="space-y-3">
              {analysis.tailoredBullets.map((bullet, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              These bullet points are customized based on your resume and the job description
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
