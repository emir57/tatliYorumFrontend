export interface Post {
  id: number;
  content: string;
  categoryId: number;
  userId: number;
  isAnimation: boolean;
  backgroundColor: string;
  textColor: string;
  secretUser: boolean;
  like: number;
}
