export interface Post {
  author: string;
  content: string;
  description: string;
  publish_date: string;
  slug: string;
  title: string;
  id: number;
}

export interface Comment {
  id: number;
  postId: number;
  user: string;
  date: string;
  content: string;
}
