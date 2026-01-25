import React from "react";

export default function ToastMsg({ type = "success", message }) {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} mt-3`} role="alert">
      {message}
    </div>
  );
}
