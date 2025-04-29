export interface UserCardProps {
  id: string;
  initials: string;
  name: string;
  email: string;
  status: "active" | "locked";
  dob: string;
  className?: string;
  onDelete: () => void;  
}