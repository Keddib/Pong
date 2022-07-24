export interface User {
  id: number;
  Username: string;
  Nickname: string;
  Avatar: string;
  Status: "online" | "offline" | "playing" | "spectating";
  Wins: number;
  Losses: number;
  XP: number;
  Level: number;
  isNew?: boolean;
}
