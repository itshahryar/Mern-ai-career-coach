// Helper function to convert an array of entries into a markdown-formatted string
// The entriesToMarkdown function converts an array of entries (like work experience, education, or projects) into a properly formatted Markdown string.
export function entriesToMarkdown(entries, type) {
    // If entries is empty or undefined, return an empty string
    if (!entries?.length) return "";
  
    // Generate the markdown string starting with the section title (e.g., "## Experience", "## Education")
    return (
      `## ${type}\n\n` + // Markdown heading for the section
  
      // Map through each entry in the array to format it as markdown
      entries
        .map((entry) => {
          // Determine the date range, showing "Present" if it's a current position
          const dateRange = entry.current
            ? `${entry.startDate} - Present`
            : `${entry.startDate} - ${entry.endDate}`;
  
          // Format each entry as a markdown section with a subheading and description
          return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
        })
        .join("\n\n") // Join all formatted entries with two line breaks for markdown spacing
    );
  }

//   The function takes entries (an array of objects) and type (a string like "Experience", "Education", or "Projects").
//   If entries is empty, it returns an empty string.
//   It starts by adding a section heading (## type) in markdown format.

//   It maps through each entry to create:
//   A subheading (### title @ organization).
//   A date range (startDate - endDate or startDate - Present if the entry is marked as current).
//   The description of the entry.

//   Finally, it joins all formatted entries into a single markdown string with proper spacing.
//--------------------------------------------------------------
// 1. Adds a section title (e.g., ## Experience or ## Education).
// 2. Formats each entry with:
// Title & Organization (e.g., ### Software Engineer @ Google).
// Date Range (Jan 2020 - Present or Jan 2020 - Dec 2023).
// Description of the entry.
// 3. Joins everything into a clean Markdown format for easy display or export.

//--------------------------------------------------------------
// Example: Output
// ## Experience

// ### Software Engineer @ Google
// Jan 2020 - Present

// Worked on AI-based search algorithms.

// ### Intern @ Microsoft
// Jun 2019 - Aug 2019

// Developed a new feature for Teams app.