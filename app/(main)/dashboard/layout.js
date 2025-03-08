import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>

      {/* // Using React's Suspense component to handle loading state. If the child components are still loading, 
      // a gray-colored BarLoader will be displayed across the full width with a top margin of 4 units. */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
         {/* Displays the actual content when it's ready. */}
        {children}
      </Suspense>
    </div>
  );
}
