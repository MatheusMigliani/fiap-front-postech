import api from '../axios.config';
import { Post, CreatePostData, UpdatePostData } from '@/types/post.types';

class PostsService {
  async getAll(): Promise<Post[]> {
    const response = await api.get('/posts');
    return response.data.data;
  }

  async getById(id: string): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data.data;
  }

  async search(query: string): Promise<Post[]> {
    const response = await api.get('/posts/search', {
      params: { q: query },
    });
    return response.data.data;
  }

  async create(data: CreatePostData): Promise<Post> {
    const response = await api.post('/posts', data);
    return response.data.data;
  }

  async update(id: string, data: UpdatePostData): Promise<Post> {
    const response = await api.put(`/posts/${id}`, data);
    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  }
}

export const postsService = new PostsService();
