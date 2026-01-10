import { API_ENDPOINTS } from '@/api/endpoints';
import { Post, CreatePostData, UpdatePostData } from '@/types/post.types';
import { getStoredToken } from '@/utils/storage';
import { API_BASE_URL } from '@/utils/constants';

const handleResponse = async (response: Response) => {
  const responseData = await response.json();
  if (!response.ok) {
    const errorMessage = responseData.message || responseData.error || `Erro HTTP: ${response.status}`;
    throw new Error(errorMessage);
  }
  return responseData.data;
};

const getAuthHeaders = () => {
  const token = getStoredToken();
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

class PostsService {
  async getAll(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_ALL}`);
    return handleResponse(response);
  }

  async getById(id: string): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_BY_ID(id)}`);
    return handleResponse(response);
  }

  async search(query: string): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS.SEARCH}?q=${query}`);
    return handleResponse(response);
  }

  async create(data: CreatePostData): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS.CREATE}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  async update(id: string, data: UpdatePostData): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS.UPDATE(id)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTS.DELETE(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    // For delete, we might not get a body, just check for ok status
    if (!response.ok) {
      const responseData = await response.json().catch(() => ({})); // Catch if no JSON body
      const errorMessage = responseData.message || responseData.error || `Erro HTTP: ${response.status}`;
      throw new Error(errorMessage);
    }
  }
}

export const postsService = new PostsService();
