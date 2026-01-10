import api from '@/api/axios.config';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Post, CreatePostData, UpdatePostData } from '@/types/post.types';
import { ApiResponse } from '@/types/auth.types';

class PostsService {
  /**
   * Busca todos os posts
   * @returns Lista de posts
   */
  async getAll(): Promise<Post[]> {
    try {
      const response = await api.get<ApiResponse<Post[]>>(
        API_ENDPOINTS.POSTS.GET_ALL
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao buscar posts';
      throw new Error(errorMessage);
    }
  }

  /**
   * Busca um post por ID
   * @param id - ID do post
   * @returns Dados do post
   */
  async getById(id: string): Promise<Post> {
    try {
      const response = await api.get<ApiResponse<Post>>(
        API_ENDPOINTS.POSTS.GET_BY_ID(id)
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao buscar post';
      throw new Error(errorMessage);
    }
  }

  /**
   * Busca posts por termo de pesquisa
   * @param query - Termo de pesquisa
   * @returns Lista de posts encontrados
   */
  async search(query: string): Promise<Post[]> {
    try {
      const response = await api.get<ApiResponse<Post[]>>(
        API_ENDPOINTS.POSTS.SEARCH,
        {
          params: { q: query },
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao buscar posts';
      throw new Error(errorMessage);
    }
  }

  /**
   * Cria um novo post
   * @param data - Dados do novo post
   * @returns Post criado
   */
  async create(data: CreatePostData): Promise<Post> {
    try {
      const response = await api.post<ApiResponse<Post>>(
        API_ENDPOINTS.POSTS.CREATE,
        data
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao criar post';
      throw new Error(errorMessage);
    }
  }

  /**
   * Atualiza um post existente
   * @param id - ID do post
   * @param data - Dados atualizados
   * @returns Post atualizado
   */
  async update(id: string, data: UpdatePostData): Promise<Post> {
    try {
      const response = await api.put<ApiResponse<Post>>(
        API_ENDPOINTS.POSTS.UPDATE(id),
        data
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao atualizar post';
      throw new Error(errorMessage);
    }
  }

  /**
   * Deleta um post
   * @param id - ID do post
   */
  async delete(id: string): Promise<void> {
    try {
      await api.delete<ApiResponse<void>>(API_ENDPOINTS.POSTS.DELETE(id));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao deletar post';
      throw new Error(errorMessage);
    }
  }
}

export const postsService = new PostsService();
