"use client"

import type { ResumeData, SectionHeadings, ATSAnalysis } from "../types/resume"
import { Github, Linkedin, Globe, ExternalLink } from "lucide-react"

interface ResumePreviewProps {
  data: ResumeData
  headings: SectionHeadings
  atsAnalysis?: ATSAnalysis | null
}

export default function ResumePreview({ data, headings, atsAnalysis }: ResumePreviewProps) {
  const { personalDetails, personalSummary, education, skills, experience, projects, certifications, additional } = data

  // Check if resume has any content
  const hasContent =
    personalDetails.name ||
    personalSummary.trim() ||
    education.length > 0 ||
    skills.technical.length > 0 ||
    experience.length > 0 ||
    projects.length > 0 ||
    certifications.length > 0 ||
    additional.languages.length > 0 ||
    additional.achievements.length > 0 ||
    additional.awards.length > 0 ||
    additional.other.length > 0

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      {/* ATS Score Badge */}
      {atsAnalysis && (
        <div
          className={`text-white px-4 py-2 text-center ${
            atsAnalysis.score >= 80 ? "bg-green-600" : atsAnalysis.score >= 60 ? "bg-yellow-600" : "bg-red-600"
          }`}
        >
          <span className="text-sm font-medium">
            ATS Score: {atsAnalysis.score}/100
            {atsAnalysis.score >= 80 ? " 🎉" : atsAnalysis.score >= 60 ? " 👍" : " ⚠️"}
          </span>
        </div>
      )}

      <div className="p-8 space-y-5 max-h-[800px] overflow-y-auto text-sm leading-tight" id="resume-content">
        {!hasContent ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">Your Resume Preview</h3>
            <p className="text-sm">Start filling out the form to see your resume come to life!</p>
          </div>
        ) : (
          <>
            {/* Header Section - Premium Style with Clickable Links */}
            {personalDetails.name && (
              <div className="text-center border-b-2 border-gray-800 pb-3 mb-5">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-wide uppercase">
                  {personalDetails.name}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-700">
                  {personalDetails.location && (
                    <>
                      <span>{personalDetails.location}</span>
                      {(personalDetails.phone || personalDetails.email) && <span>|</span>}
                    </>
                  )}
                  {personalDetails.phone && (
                    <>
                      <span>P: {personalDetails.phone}</span>
                      {personalDetails.email && <span>|</span>}
                    </>
                  )}
                  {personalDetails.email && <span>{personalDetails.email}</span>}
                  {(personalDetails.portfolio || personalDetails.linkedin || personalDetails.github) && (
                    <>
                      <span>|</span>
                      <div className="flex items-center gap-2">
                        {personalDetails.linkedin && (
                          <a
                            href={personalDetails.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors flex items-center gap-1"
                          >
                            <Linkedin className="h-3 w-3" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {personalDetails.github && personalDetails.linkedin && <span>|</span>}
                        {personalDetails.github && (
                          <a
                            href={personalDetails.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors flex items-center gap-1"
                          >
                            <Github className="h-3 w-3" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {personalDetails.portfolio && (personalDetails.linkedin || personalDetails.github) && (
                          <span>|</span>
                        )}
                        {personalDetails.portfolio && (
                          <a
                            href={personalDetails.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors flex items-center gap-1"
                          >
                            <Globe className="h-3 w-3" />
                            <span>Portfolio</span>
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Personal Summary */}
            {personalSummary && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.personalSummary}
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">{personalSummary}</p>
              </div>
            )}

            {/* Education Section - HackerRank Style Layout */}
            {education.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.education}
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xs font-bold text-gray-900 uppercase">{edu.institution}</h3>
                          <p className="text-xs text-gray-700 italic">
                            {edu.fieldOfStudy && `${edu.fieldOfStudy} `}
                            {edu.degreeType && `[${edu.degreeType}]`}
                          </p>
                          {edu.score && (
                            <p className="text-xs text-gray-700">
                              {edu.scoreType === "percentage" ? "Percentage" : "CGPA"}: {edu.score}
                              {edu.scoreType === "percentage" ? "%" : ""}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-xs text-gray-700 ml-4">
                          <p className="font-medium">{edu.location}</p>
                          <p className="italic">{edu.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section - Premium Style */}
            {experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.experience}
                </h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-xs font-bold text-gray-900 uppercase">{exp.company}</h3>
                          <p className="text-xs text-gray-700 italic">{exp.title}</p>
                        </div>
                        <div className="text-right text-xs text-gray-700 ml-4">
                          <p className="font-medium">{exp.location}</p>
                          <p className="italic">{exp.duration}</p>
                        </div>
                      </div>
                      {exp.description.length > 0 && (
                        <ul className="text-xs text-gray-700 space-y-0.5 mt-1">
                          {exp.description.map(
                            (desc, index) =>
                              desc.trim() && (
                                <li key={index} className="leading-relaxed">
                                  {desc.startsWith("•") ? desc : `• ${desc}`}
                                </li>
                              ),
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section - Premium Style with Links */}
            {projects.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.projects}
                </h2>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xs font-bold text-gray-900 uppercase">{project.title}</h3>
                            <div className="flex items-center gap-1">
                              {project.githubLink && (
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600 transition-colors"
                                  title="GitHub Repository"
                                >
                                  <Github className="h-3 w-3" />
                                </a>
                              )}
                              {project.demoLink && (
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600 transition-colors"
                                  title="Demo"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                              {project.hostedLink && (
                                <a
                                  href={project.hostedLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600 transition-colors"
                                  title="Live Site"
                                >
                                  <Globe className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                          {project.technologies && (
                            <p className="text-xs text-gray-600 mb-1">
                              <span className="font-medium">Technologies:</span> {project.technologies}
                            </p>
                          )}
                        </div>
                        {project.duration && <p className="text-xs text-gray-700 italic ml-4">{project.duration}</p>}
                      </div>
                      {project.description.length > 0 && (
                        <ul className="text-xs text-gray-700 space-y-0.5">
                          {project.description.map(
                            (desc, index) =>
                              desc.trim() && (
                                <li key={index} className="leading-relaxed">
                                  {desc.startsWith("•") ? desc : `• ${desc}`}
                                </li>
                              ),
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Skills Section - Premium Style with Categories */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.skills}
                </h2>
                <div className="text-xs text-gray-700">
                  {skills.technical.length > 0 && (
                    <div className="mb-1">
                      <span className="font-medium">Technical Skills:</span>
                      <div className="ml-4">
                        {/* Categorize technical skills */}
                        {(() => {
                          const categories = {
                            "Programming Languages": [
                              "JavaScript",
                              "Python",
                              "Java",
                              "C++",
                              "TypeScript",
                              "Go",
                              "Rust",
                              "Swift",
                              "C#",
                              "PHP",
                            ],
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
                            Databases: [
                              "MySQL",
                              "PostgreSQL",
                              "MongoDB",
                              "Redis",
                              "SQLite",
                              "Firebase",
                              "Oracle",
                              "SQL Server",
                            ],
                            "Cloud & DevOps": [
                              "AWS",
                              "Docker",
                              "Kubernetes",
                              "Azure",
                              "GCP",
                              "Jenkins",
                              "Git",
                              "CI/CD",
                              "Terraform",
                            ],
                            "Tools & Frameworks": [
                              "Git",
                              "Linux",
                              "Figma",
                              "Photoshop",
                              "Jira",
                              "Slack",
                              "VS Code",
                              "IntelliJ",
                              "Postman",
                            ],
                            "Data Science & AI": [
                              "Machine Learning",
                              "TensorFlow",
                              "PyTorch",
                              "Pandas",
                              "NumPy",
                              "Scikit-learn",
                              "Jupyter",
                            ],
                          }

                          const categorizedSkills = {}
                          const uncategorizedSkills = []

                          skills.technical.forEach((skill) => {
                            let categorized = false
                            for (const [category, categorySkills] of Object.entries(categories)) {
                              if (
                                categorySkills.some(
                                  (catSkill) =>
                                    catSkill.toLowerCase().includes(skill.toLowerCase()) ||
                                    skill.toLowerCase().includes(catSkill.toLowerCase()),
                                )
                              ) {
                                if (!categorizedSkills[category]) categorizedSkills[category] = []
                                categorizedSkills[category].push(skill)
                                categorized = true
                                break
                              }
                            }
                            if (!categorized) {
                              uncategorizedSkills.push(skill)
                            }
                          })

                          return (
                            <>
                              {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
                                <p key={category} className="mb-0.5">
                                  <span className="font-medium">{category}:</span> {categorySkills.join(", ")}
                                </p>
                              ))}
                              {uncategorizedSkills.length > 0 && (
                                <p className="mb-0.5">
                                  <span className="font-medium">Other:</span> {uncategorizedSkills.join(", ")}
                                </p>
                              )}
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  )}
                  {skills.soft.length > 0 && (
                    <p>
                      <span className="font-medium">Soft Skills:</span> {skills.soft.join("; ")}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Certifications Section - Premium Style with Links */}
            {certifications.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.certifications}
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div>
                          <h3 className="text-xs font-bold text-gray-900">{cert.name}</h3>
                          <p className="text-xs text-gray-700 italic">{cert.issuer}</p>
                        </div>
                        {cert.certificateLink && (
                          <a
                            href={cert.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors"
                            title="View Certificate"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 italic">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Section - Premium Style */}
            {(additional.languages.length > 0 ||
              additional.achievements.length > 0 ||
              additional.awards.length > 0 ||
              additional.other.length > 0) && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 uppercase tracking-wide">
                  {headings.additional}
                </h2>
                <div className="text-xs text-gray-700 space-y-1">
                  {additional.languages.length > 0 && (
                    <p>
                      <span className="font-medium">Languages:</span> {additional.languages.join("; ")}
                    </p>
                  )}
                  {additional.achievements.length > 0 && (
                    <p>
                      <span className="font-medium">Achievements:</span> {additional.achievements.join("; ")}
                    </p>
                  )}
                  {additional.awards.length > 0 && (
                    <p>
                      <span className="font-medium">Awards:</span> {additional.awards.join("; ")}
                    </p>
                  )}
                  {additional.other.length > 0 && (
                    <p>
                      <span className="font-medium">Other:</span> {additional.other.join("; ")}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
