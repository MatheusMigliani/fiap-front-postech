/**
 * Post interface - Shared between frontend and backend
 */
export interface Post {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Create Post DTO
 */
export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
}

/**
 * Update Post DTO
 */
export interface UpdatePostDto {
  title?: string;
  content?: string;
  author?: string;
}

/**
 * Post response from API
 */
export interface PostResponse {
  success: boolean;
  data: Post;
  message?: string;
}

/**
 * Posts list response
 */
export interface PostsResponse {
  success: boolean;
  data: Post[];
  total?: number;
  page?: number;
  limit?: number;
}
