export interface PostComment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdDate: string;
  username?: string;
  secretUser: boolean;
}
