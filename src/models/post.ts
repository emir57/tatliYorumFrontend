import { User } from "./user";

export interface Post {
  id: number;
  content: string;
  categoryId: number;
  userId: number;
  isAnimation: boolean;
  backgroundColor: string;
  textColor: string;
  secretUser: boolean;
  likes: number;
  commentCount?: number;
  createdDate: string;
  user?: User;
}
