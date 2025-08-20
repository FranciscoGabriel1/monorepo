import React from "react";

export default function SectionTitle({ children, right }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
      {right ? <div className="ml-4">{right}</div> : null}
    </div>
  );
}
