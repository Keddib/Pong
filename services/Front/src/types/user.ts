export interface User {
  id: number;
  uid: string;
  login: string;
  displayedName: string;
  avatar: string;
  status: "online" | "offline" | "playing" | "spectating";
  wins: number;
  losses: number;
  xp: number;
  level: number;
  isNew?: boolean;
}
