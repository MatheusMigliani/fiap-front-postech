export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  deleted?: boolean;
  description?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  author?: string;
}

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  filteredPosts: Post[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}
