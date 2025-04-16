export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "danger" | "secondary";
    className?: string; 
  }
  