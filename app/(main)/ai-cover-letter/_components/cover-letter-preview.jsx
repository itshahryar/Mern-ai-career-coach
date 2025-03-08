"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4">
      <MDEditor value={content} preview="preview" height={700} />
    </div>
  );
};

export default CoverLetterPreview;

// The preview prop can have different values:
// "edit" → Shows only the editor.
// "preview" → Shows only the rendered Markdown (read-only mode).
// "live" → Shows both editor and preview side by side.

// The preview="preview" prop makes the Markdown editor read-only,
// showing only the formatted output without editing options.