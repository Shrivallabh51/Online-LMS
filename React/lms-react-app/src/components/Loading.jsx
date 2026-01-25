import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="text-center py-4">
      <div className="spinner-border" role="status" />
      <p className="mt-2">{text}</p>
    </div>
  );
}
