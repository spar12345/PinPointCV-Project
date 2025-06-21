export const downloadResumeAsPDF = () => {
  const resumeElement = document.getElementById("resume-content")
  if (!resumeElement) {
    alert("Resume content not found. Please make sure you have filled out some information.")
    return
  }

  // Create a clean HTML version for PDF conversion
  const createCleanHTML = () => {
    // Clone the resume element
    const clonedElement = resumeElement.cloneNode(true) as HTMLElement

    // Remove all SVG icons and unwanted elements
    const iconsAndSvgs = clonedElement.querySelectorAll("svg, .lucide, img")
    iconsAndSvgs.forEach((element) => element.remove())

    // Get the clean HTML content
    const cleanHTML = clonedElement.innerHTML

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.3;
              color: #374151;
              background: white;
              padding: 0.4in;
              font-size: 10pt;
              max-width: 7.5in;
              margin: 0 auto;
            }
            
            /* Page setup */
            @page {
              size: letter;
              margin: 0.4in;
            }
            
            /* Spacing utilities - Reduced for better fit */
            .space-y-5 > * + * { margin-top: 1rem; }
            .space-y-4 > * + * { margin-top: 0.8rem; }
            .space-y-3 > * + * { margin-top: 0.6rem; }
            .space-y-2 > * + * { margin-top: 0.4rem; }
            .space-y-1 > * + * { margin-top: 0.2rem; }
            .mb-5 { margin-bottom: 1rem; }
            .mb-4 { margin-bottom: 0.8rem; }
            .mb-3 { margin-bottom: 0.6rem; }
            .mb-2 { margin-bottom: 0.4rem; }
            .mb-1 { margin-bottom: 0.2rem; }
            .pb-3 { padding-bottom: 0.6rem; }
            .pb-1 { padding-bottom: 0.2rem; }
            .mt-1 { margin-top: 0.2rem; }
            .ml-4 { margin-left: 0.8rem; }
            
            /* Typography - Optimized sizes */
            h1 {
              font-size: 16pt;
              font-weight: bold;
              text-align: center;
              margin-bottom: 0.4rem;
              color: #111827;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            
            h2 {
              font-size: 10pt;
              font-weight: bold;
              border-bottom: 1px solid #9ca3af;
              padding-bottom: 0.2rem;
              margin-bottom: 0.5rem;
              color: #111827;
              text-transform: uppercase;
              letter-spacing: 0.025em;
            }
            
            h3 {
              font-size: 8.5pt;
              font-weight: bold;
              color: #111827;
              text-transform: uppercase;
            }
            
            /* Layout utilities - Fixed for PDF */
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-xs { font-size: 8pt; }
            .text-sm { font-size: 9pt; }
            
            .flex { 
              display: flex; 
              width: 100%;
            }
            .flex-wrap { flex-wrap: wrap; }
            .justify-center { justify-content: center; }
            .justify-between { 
              justify-content: space-between; 
              align-items: flex-start;
            }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .flex-1 { 
              flex: 1; 
              min-width: 0; /* Prevent overflow */
              padding-right: 0.5rem;
            }
            
            .gap-1 { gap: 0.2rem; }
            .gap-2 { gap: 0.4rem; }
            
            /* Border utilities */
            .border-b-2 { border-bottom: 2px solid #1f2937; }
            .border-b { border-bottom: 1px solid #9ca3af; }
            
            /* Color utilities */
            .text-gray-900 { color: #111827; }
            .text-gray-700 { color: #374151; }
            .text-gray-600 { color: #4b5563; }
            
            /* Font utilities */
            .font-bold { font-weight: bold; }
            .font-medium { font-weight: 500; }
            .italic { font-style: italic; }
            .uppercase { text-transform: uppercase; }
            .tracking-wide { letter-spacing: 0.025em; }
            
            /* List styling */
            ul { list-style: none; padding-left: 0; }
            li { margin-bottom: 0.1rem; line-height: 1.2; }
            
            /* Link styling */
            a { color: #2563eb; text-decoration: none; }
            
            /* Hide all icons */
            svg, .lucide, img { display: none !important; }
            
            /* Spacing utilities */
            .space-y-0\.5 > * + * { margin-top: 0.1rem; }
            .leading-relaxed { line-height: 1.2; }
            .leading-tight { line-height: 1.15; }
            
            /* Right-aligned content - Fixed for PDF */
            .text-right {
              text-align: right;
              flex-shrink: 0;
              min-width: fit-content;
              max-width: 2.5in;
              word-wrap: break-word;
            }
            
            /* Ensure proper spacing for flex items */
            .flex > div:last-child {
              margin-left: 0.5rem;
              text-align: right;
              flex-shrink: 0;
            }
            
            /* Header contact info - Better wrapping */
            .flex-wrap {
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
            }
            
            .flex-wrap > * {
              margin: 0 0.2rem;
            }
            
            /* Prevent text overflow */
            * {
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            
            /* Specific fixes for education and experience sections */
            .education-item, .experience-item, .project-item {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 0.5rem;
              width: 100%;
            }
            
            .education-item .left-content,
            .experience-item .left-content,
            .project-item .left-content {
              flex: 1;
              padding-right: 0.5rem;
              min-width: 0;
            }
            
            .education-item .right-content,
            .experience-item .right-content,
            .project-item .right-content {
              flex-shrink: 0;
              text-align: right;
              max-width: 2in;
              font-size: 8pt;
            }
            
            /* Ensure content doesn't exceed page width */
            .container {
              max-width: 100%;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <div class="container">${cleanHTML}</div>
        </body>
      </html>
    `
  }

  // Method 1: Try using html2pdf if available
  if (typeof window !== "undefined" && (window as any).html2pdf) {
    const element = document.createElement("div")
    element.innerHTML = createCleanHTML()

    const opt = {
      margin: [0.4, 0.4, 0.4, 0.4],
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        width: 612, // Letter size width in pixels at 72 DPI
        windowWidth: 612,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
        compress: true,
      },
    }
    ;(window as any).html2pdf().set(opt).from(element).save()
    return
  }

  // Method 2: Use browser's built-in PDF generation with better control
  const printWindow = window.open("", "_blank", "width=800,height=600")
  if (!printWindow) {
    alert("Please allow popups to download your resume as PDF.")
    return
  }

  printWindow.document.write(createCleanHTML())
  printWindow.document.close()

  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      // Set up print event listeners
      printWindow.onbeforeprint = () => {
        // Hide any remaining unwanted elements
        const unwantedElements = printWindow.document.querySelectorAll('svg, .lucide, img, [class*="watermark"]')
        unwantedElements.forEach((el) => {
          if (el.parentNode) {
            el.parentNode.removeChild(el)
          }
        })
      }

      printWindow.onafterprint = () => {
        setTimeout(() => {
          printWindow.close()
        }, 100)
      }

      // Trigger print
      printWindow.print()
    }, 500)
  }
}
