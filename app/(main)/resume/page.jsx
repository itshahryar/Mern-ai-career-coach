import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
// --------------------------------------------------------------------------------
// 📌 It is the main form where users create their entire resume.
// 📝 resume-builder.jsx → The main resume form where users enter all details.
// (contact info, summary, skills, experience, education, projects).
// It also has a preview mode.

// resume-builder.jsx = Full Resume Page 📄
// --------------------------------------------------------------------------------

// 📌 It is a small reusable form used inside resume-builder.jsx to manage lists of
// experience, education, and projects.

// 1. Instead of writing a separate form for each section, this component repeats itself to add multiple entries.
// 2. Allows users to add, edit, and remove experiences, education, or projects dynamically.
// 3. Receives data from 📝 resume-builder.jsx and updates it when users enter new values.

// ** Small form for adding multiple entries dynamically
// ** just collects input data
// ** Only handles experience, education, and projects

// 🔄 entry-form.jsx → A small reusable form used inside resume-builder.jsx to
// add multiple work experiences, education, and projects dynamically.
// ^^^Add (+) entry buttons, Delete entry button, Display Lists

// entry-form.jsx = Small Reusable Form for adding experience, education, and projects ✍️
// --------------------------------------------------------------------------------

// 📌 resume-builder.jsx (Main Resume Form & Preview Component)

// **Purpose**: This file contains the complete resume form, allowing users to enter details like contact info,
// summary, skills, experience, education, and projects.

// **Functionality**:
// Uses Tabs to switch between "Form" (editing mode) and "Preview" (Markdown preview).
// Uses React Hook Form (register, control, handleSubmit) for managing form state.
// Includes input fields for:
// 📧 Contact Info (Email, Mobile, LinkedIn, Twitter)
// 📝 Summary (Professional summary)
// 🔧 Skills (List of skills)
// 💼 Experience (Uses EntryForm component)
// 🎓 Education (Uses EntryForm component)
// 🚀 Projects (Uses EntryForm component)

// EntryForm component is used to handle multiple experiences, education, and projects dynamically.
// Markdown Preview (MDEditor): Shows the resume in Markdown format for better readability.
// Resume Editing & Preview Toggle: Allows users to switch between editing and previewing their resume.

// --------------------------------------------------------------------------------
// 📌 entry-form.jsx (Reusable Form Component for Experience, Education, Projects)

// **Purpose**: This file is a reusable form component used inside resume-builder.jsx to handle multiple
// work experiences, education entries, and projects.

// **Functionality**:
// Takes a type prop (Experience, Education, or Project).
// Uses entries (array) to store multiple inputs for that section.
// Renders a list of dynamically added items with:
// 📝 Title (e.g., Job Title, Degree, Project Name)
// 🏢 Company/School/Organization
// 📅 Date (Start & End)
// 📄 Description

// Has "Add New Entry" and "Remove Entry" buttons to allow users to dynamically add/remove items.
// Uses onChange to update the form state in resume-builder.jsx