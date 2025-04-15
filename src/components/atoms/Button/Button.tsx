import React from "react";
import type { ButtonProps } from "./Button.type";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "", 
}) => {
  let style = "px-4 py-2 rounded text-white text-sm font-medium ";

  if (variant === "primary") {
    style += "bg-primary hover:bg-blue-700";
  } else if (variant === "danger") {
    style += "bg-red-500 hover:bg-red-600";
  } else if (variant === "secondary") {
    style += "bg-gray-500 hover:bg-gray-600";
  }

  const combinedStyle = `${style} ${className}`;

  return (
    <button onClick={onClick} className={combinedStyle}>
      {children}
    </button>
  );
};
