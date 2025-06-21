"use client"

import { useState } from "react"
import type { Project } from "../types/resume"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit3, Rocket, PlusCircle, Sparkles, Trophy, Github, ExternalLink, Globe } from "lucide-react"

interface ProjectsFormProps {
  data: Project[]
  heading: string
  onDataChange: (data: Project[]) => void
  onHeadingChange: (heading: string) => void
}

export default function ProjectsForm({ data, heading, onDataChange, onHeadingChange }: ProjectsFormProps) {
  const [editingHeading, setEditingHeading] = useState(false)

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      technologies: "",
      duration: "",
      description: [""],
      githubLink: "",
      demoLink: "",
      hostedLink: "",
    }
    onDataChange([...data, newProject])
  }

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onDataChange(data.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  const removeProject = (id: string) => {
    onDataChange(data.filter((proj) => proj.id !== id))
  }

  const addDescriptionPoint = (id: string) => {
    const project = data.find((proj) => proj.id === id)
    if (project) {
      updateProject(id, "description", [...project.description, ""])
    }
  }

  const updateDescriptionPoint = (id: string, index: number, value: string) => {
    const project = data.find((proj) => proj.id === id)
    if (project) {
      const newDescription = [...project.description]
      newDescription[index] = value
      updateProject(id, "description", newDescription)
    }
  }

  const removeDescriptionPoint = (id: string, index: number) => {
    const project = data.find((proj) => proj.id === id)
    if (project && project.description.length > 1) {
      const newDescription = project.description.filter((_, i) => i !== index)
      updateProject(id, "description", newDescription)
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
              className="text-xl font-semibold text-center border-2 border-pink-300 focus:border-pink-500"
              autoFocus
            />
            <p className="text-xs text-gray-500">Press Enter to save</p>
          </div>
        ) : (
          <div className="group">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{heading}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHeading(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-pink-100"
              >
                <Edit3 className="h-4 w-4 text-pink-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Showcase your projects and achievements</p>
          </div>
        )}
      </div>

      {/* Project Entries */}
      <div className="space-y-4">
        {data.map((project, index) => (
          <Card
            key={project.id}
            className="p-6 border-l-4 border-l-pink-500 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-pink-50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-medium text-gray-900">Project #{index + 1}</h3>
                {project.title && project.technologies && <Trophy className="h-4 w-4 text-yellow-500" />}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-pink-500" />
                  Project Title *
                </Label>
                <Input
                  placeholder="E-commerce Website"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, "title", e.target.value)}
                  className="focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Technologies Used *</Label>
                  <Input
                    placeholder="React, Node.js, MongoDB"
                    value={project.technologies}
                    onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                    className="focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    placeholder="3 months"
                    value={project.duration}
                    onChange={(e) => updateProject(project.id, "duration", e.target.value)}
                    className="focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Project Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Github className="h-3 w-3 mr-1 text-gray-700" />
                    GitHub Repository
                  </Label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={project.githubLink}
                    onChange={(e) => updateProject(project.id, "githubLink", e.target.value)}
                    className="focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1 text-blue-600" />
                    Demo Link
                  </Label>
                  <Input
                    placeholder="https://demo.example.com"
                    value={project.demoLink}
                    onChange={(e) => updateProject(project.id, "demoLink", e.target.value)}
                    className="focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Globe className="h-3 w-3 mr-1 text-green-600" />
                    Live/Hosted Link
                  </Label>
                  <Input
                    placeholder="https://project.example.com"
                    value={project.hostedLink}
                    onChange={(e) => updateProject(project.id, "hostedLink", e.target.value)}
                    className="focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Description</Label>
                <div className="space-y-2">
                  {project.description.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex space-x-2">
                      <Textarea
                        placeholder="• Describe what you built and achieved..."
                        value={point}
                        onChange={(e) => updateDescriptionPoint(project.id, pointIndex, e.target.value)}
                        className="min-h-[60px] focus:ring-2 focus:ring-pink-500"
                      />
                      {project.description.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDescriptionPoint(project.id, pointIndex)}
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
                    onClick={() => addDescriptionPoint(project.id)}
                    className="w-full border-dashed border-pink-300 text-pink-600 hover:bg-pink-50"
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

      {/* Add Project Button */}
      <Button
        onClick={addProject}
        variant="outline"
        className="w-full border-dashed border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  )
}
