export interface PersonalDetails {
  name: string
  email: string
  phone: string
  location: string
  portfolio: string
  linkedin: string
  github: string
}

export interface Education {
  id: string
  institution: string
  location: string
  degreeType: string
  fieldOfStudy: string
  score: string
  scoreType: "percentage" | "cgpa"
  year: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string[]
}

export interface Project {
  id: string
  title: string
  technologies: string
  duration: string
  description: string[]
  githubLink: string
  demoLink: string
  hostedLink: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  certificateLink: string
}

export interface Skills {
  technical: string[]
  soft: string[]
}

export interface AdditionalSection {
  languages: string[]
  achievements: string[]
  awards: string[]
  other: string[]
}

export interface ResumeData {
  personalDetails: PersonalDetails
  personalSummary: string
  education: Education[]
  skills: Skills
  experience: Experience[]
  projects: Project[]
  certifications: Certification[]
  additional: AdditionalSection
}

export interface SectionHeadings {
  personalSummary: string
  experience: string
  projects: string
  education: string
  skills: string
  certifications: string
  additional: string
}

export interface ATSAnalysis {
  score: number
  suggestions: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
  tailoredBullets: string[]
}
