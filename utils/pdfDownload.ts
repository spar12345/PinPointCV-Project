export const downloadResumeAsPDF = async () => {
  const resumeElement = document.getElementById("resume-content")
  if (!resumeElement) {
    alert("Resume content not found. Please make sure you have filled out some information.")
    return
  }

  try {
    // Load html2pdf library if not already loaded
    if (!(window as any).html2pdf) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js")
    }

    // Create a clean version of the resume content
    const clonedElement = resumeElement.cloneNode(true) as HTMLElement

    // Remove all unwanted elements
    const unwantedElements = clonedElement.querySelectorAll("svg, .lucide, img, button, [role='button']")
    unwantedElements.forEach((el) => el.remove())

    // Force all text to be black
    const allTextElements = clonedElement.querySelectorAll("*")
    allTextElements.forEach((el: any) => {
      el.style.color = "#000000"
      el.style.opacity = "1"
    })

    // PDF generation options
    const options = {
      margin: [0.4, 0.4, 0.4, 0.4],
      filename: `Resume_${new Date().toISOString().split("T")[0]}.pdf`,
      image: {
        type: "jpeg",
        quality: 1.0,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    }

    // Generate and download PDF
    await (window as any).html2pdf().set(options).from(clonedElement).save()

    console.log("PDF downloaded successfully!")
  } catch (error) {
    console.error("PDF generation failed:", error)

    // Fallback: Create a simple HTML file download
    fallbackDownload()
  }
}

// Fallback download method
const fallbackDownload = () => {
  const resumeElement = document.getElementById("resume-content")
  if (!resumeElement) return

  const clonedElement = resumeElement.cloneNode(true) as HTMLElement

  // Remove unwanted elements
  const unwantedElements = clonedElement.querySelectorAll("svg, .lucide, img, button")
  unwantedElements.forEach((el) => el.remove())

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; color: #000 !important; }
    body { 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      line-height: 1.4; 
      padding: 20px; 
      background: white;
    }
    h1 { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 10px; text-transform: uppercase; }
    h2 { font-size: 14px; font-weight: bold; border-bottom: 1px solid #000; margin: 15px 0 8px 0; padding-bottom: 3px; text-transform: uppercase; }
    h3 { font-size: 12px; font-weight: bold; margin: 8px 0 4px 0; }
    .flex { display: flex; justify-content: space-between; align-items: flex-start; margin: 5px 0; }
    .flex-1 { flex: 1; padding-right: 10px; }
    .text-right { text-align: right; flex-shrink: 0; }
    .text-center { text-align: center; }
    .font-bold { font-weight: bold; }
    ul { list-style: none; padding: 0; }
    li { margin: 2px 0; }
    .mb-1 { margin-bottom: 4px; }
    .mb-2 { margin-bottom: 8px; }
    .mb-3 { margin-bottom: 12px; }
    .space-y-2 > * + * { margin-top: 8px; }
    .space-y-3 > * + * { margin-top: 12px; }
  </style>
</head>
<body>
  ${clonedElement.innerHTML}
</body>
</html>`

  // Create and download HTML file
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `Resume_${new Date().toISOString().split("T")[0]}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Function to load external scripts
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}
