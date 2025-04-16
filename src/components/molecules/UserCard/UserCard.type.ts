export interface UserCardProps {
    initials: string;
    name: string;
    email: string;
    status: "active" | "locked";
    dob: string;
    className?: string; 
  
  }
  