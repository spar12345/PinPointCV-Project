"use client"

import { useState, useEffect } from "react"
import type { ResumeData, SectionHeadings, ATSAnalysis } from "../types/resume"
import PersonalDetailsForm from "../components/PersonalDetailsForm"
import PersonalSummaryForm from "../components/PersonalSummaryForm"
import EducationForm from "../components/EducationForm"
import SkillsForm from "../components/SkillsForm"
import ExperienceForm from "../components/ExperienceForm"
import ProjectsForm from "../components/ProjectsForm"
import CertificationsForm from "../components/CertificationsForm"
import AdditionalForm from "../components/AdditionalForm"
import JobAnalyzer from "../components/JobAnalyzer"
import ResumePreview from "../components/ResumePreview"
import ProgressBar from "../components/ProgressBar"
import { downloadResumeAsPDF } from "../utils/pdfDownload"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Sparkles, Trophy, Target, Zap } from "lucide-react"

const initialResumeData: ResumeData = {
  personalDetails: {
    name: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
  },
  personalSummary: "",
  education: [],
  skills: {
    technical: [],
    soft: [],
  },
  experience: [],
  projects: [],
  certifications: [],
  additional: {
    languages: [],
    achievements: [],
    awards: [],
    other: [],
  },
}

const initialHeadings: SectionHeadings = {
  personalSummary: "Professional Summary",
  experience: "Work Experience",
  projects: "Projects",
  education: "Education",
  skills: "Technical Skills",
  certifications: "Certifications",
  additional: "Additional",
}

export default function PinPointCV() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [sectionHeadings, setSectionHeadings] = useState<SectionHeadings>(initialHeadings)
  const [activeSection, setActiveSection] = useState("personal")
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysis | null>(null)
  const [progress, setProgress] = useState(0)
  const [completedSections, setCompletedSections] = useState<string[]>([])

  // Calculate completion progress
  useEffect(() => {
    const calculateProgress = () => {
      let completed = 0
      const total = 8
      const newCompletedSections: string[] = []

      if (resumeData.personalDetails.name && resumeData.personalDetails.email && resumeData.personalDetails.phone) {
        completed++
        newCompletedSections.push("personal")
      }
      if (resumeData.personalSummary.trim()) {
        completed++
        newCompletedSections.push("summary")
      }
      if (resumeData.education.length > 0) {
        completed++
        newCompletedSections.push("education")
      }
      if (resumeData.skills.technical.length > 0) {
        completed++
        newCompletedSections.push("skills")
      }
      if (resumeData.experience.length > 0) {
        completed++
        newCompletedSections.push("experience")
      }
      if (resumeData.projects.length > 0) {
        completed++
        newCompletedSections.push("projects")
      }
      if (resumeData.certifications.length > 0) {
        completed++
        newCompletedSections.push("certifications")
      }
      if (
        resumeData.additional.languages.length > 0 ||
        resumeData.additional.achievements.length > 0 ||
        resumeData.additional.awards.length > 0 ||
        resumeData.additional.other.length > 0
      ) {
        completed++
        newCompletedSections.push("additional")
      }

      setProgress((completed / total) * 100)
      setCompletedSections(newCompletedSections)
    }

    calculateProgress()
  }, [resumeData])

  useEffect(() => {
    // Load html2pdf library for better PDF generation
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const sections = [
    {
      id: "personal",
      label: "Personal Details",
      icon: "👤",
      color: "bg-blue-500",
      description: "Basic information",
    },
    {
      id: "summary",
      label: "Personal Summary",
      icon: "📋",
      color: "bg-indigo-500",
      description: "Professional overview",
    },
    {
      id: "education",
      label: "Education",
      icon: "🎓",
      color: "bg-green-500",
      description: "Academic background",
    },
    {
      id: "skills",
      label: "Skills",
      icon: "💡",
      color: "bg-yellow-500",
      description: "Technical & soft skills",
    },
    {
      id: "experience",
      label: "Experience",
      icon: "💼",
      color: "bg-purple-500",
      description: "Work history",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "🚀",
      color: "bg-pink-500",
      description: "Portfolio projects",
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: "🏆",
      color: "bg-orange-500",
      description: "Awards & certificates",
    },
    {
      id: "additional",
      label: "Additional",
      icon: "⭐",
      color: "bg-teal-500",
      description: "Languages, awards, etc.",
    },
    {
      id: "analyzer",
      label: "ATS Analyzer",
      icon: "🎯",
      color: "bg-red-500",
      description: "Job matching tool",
    },
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalDetailsForm
            data={resumeData.personalDetails}
            onChange={(data) => setResumeData((prev) => ({ ...prev, personalDetails: data }))}
          />
        )
      case "summary":
        return (
          <PersonalSummaryForm
            data={resumeData.personalSummary}
            heading={sectionHeadings.personalSummary}
            onChange={(data) => setResumeData((prev) => ({ ...prev, personalSummary: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, personalSummary: heading }))}
          />
        )
      case "education":
        return (
          <EducationForm
            data={resumeData.education}
            heading={sectionHeadings.education}
            onDataChange={(data) => setResumeData((prev) => ({ ...prev, education: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, education: heading }))}
          />
        )
      case "skills":
        return (
          <SkillsForm
            data={resumeData.skills}
            heading={sectionHeadings.skills}
            onChange={(data) => setResumeData((prev) => ({ ...prev, skills: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, skills: heading }))}
          />
        )
      case "experience":
        return (
          <ExperienceForm
            data={resumeData.experience}
            heading={sectionHeadings.experience}
            onDataChange={(data) => setResumeData((prev) => ({ ...prev, experience: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, experience: heading }))}
          />
        )
      case "projects":
        return (
          <ProjectsForm
            data={resumeData.projects}
            heading={sectionHeadings.projects}
            onDataChange={(data) => setResumeData((prev) => ({ ...prev, projects: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, projects: heading }))}
          />
        )
      case "certifications":
        return (
          <CertificationsForm
            data={resumeData.certifications}
            heading={sectionHeadings.certifications}
            onDataChange={(data) => setResumeData((prev) => ({ ...prev, certifications: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, certifications: heading }))}
          />
        )
      case "additional":
        return (
          <AdditionalForm
            data={resumeData.additional}
            heading={sectionHeadings.additional}
            onDataChange={(data) => setResumeData((prev) => ({ ...prev, additional: data }))}
            onHeadingChange={(heading) => setSectionHeadings((prev) => ({ ...prev, additional: heading }))}
          />
        )
      case "analyzer":
        return <JobAnalyzer resumeData={resumeData} onAnalysisComplete={setAtsAnalysis} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-200">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <Sparkles className="h-3 w-3 text-yellow-800" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PinPointCV
                </h1>
                <p className="text-sm text-gray-600 font-medium">Smart ATS-Compliant Resume Builder</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* ATS Score Display */}
              {atsAnalysis && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    ATS Score: <span className="text-green-600">{atsAnalysis.score}/100</span>
                  </span>
                </div>
              )}

              {/* Progress Badge */}
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
                <Trophy className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-700">{Math.round(progress)}% Complete</span>
              </div>

              {/* Download Button */}
              <Button
                onClick={downloadResumeAsPDF}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Progress Bar */}
      <ProgressBar progress={progress} completedSections={completedSections.length} totalSections={8} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Gamified Form Sections */}
          <div className="lg:col-span-5">
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              {/* Fun Section Navigation */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Build Your Resume
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {sections.map((section) => {
                    const isCompleted = completedSections.includes(section.id)
                    const isActive = activeSection === section.id

                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`relative p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                            : isCompleted
                              ? "bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 border-2 border-green-300"
                              : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-2 border-gray-200"
                        }`}
                      >
                        {/* Completion Badge */}
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                            <Trophy className="h-3 w-3 text-white" />
                          </div>
                        )}

                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{section.icon}</span>
                          <div>
                            <div className="font-semibold text-sm">{section.label}</div>
                            <div className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>
                              {section.description}
                            </div>
                          </div>
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-pulse" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Active Section Form with Animation */}
              <div className="space-y-6 animate-fadeIn">{renderActiveSection()}</div>
            </Card>
          </div>

          {/* Right Side - Resume Preview */}
          <div className="lg:col-span-7">
            <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Updates in real-time</span>
                </div>
              </div>
              <ResumePreview data={resumeData} headings={sectionHeadings} atsAnalysis={atsAnalysis} />
            </Card>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
