import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPostById, updatePost, clearCurrentPost } from '@/store/slices/postsSlice';
import { UpdatePostData } from '@/types/post.types';
import { PostForm } from '@/components/features/posts';
import { Loading, ErrorMessage } from '@/components/common';
import { toast } from 'react-toastify';
import * as S from './EditPost.styles';

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [id, dispatch]);

  const handleSubmit = async (data: UpdatePostData) => {
    if (!id) return;

    try {
      await dispatch(updatePost({ id, data })).unwrap();
      toast.success('Post atualizado com sucesso!');
      navigate(`/posts/${id}`);
    } catch {
      toast.error('Erro ao atualizar post');
    }
  };

  if (loading) return <Loading text="Carregando post..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentPost) return <ErrorMessage message="Post não encontrado" />;

  return (
    <S.Container>
      <S.Title>Editar Post</S.Title>
      <PostForm mode="edit" initialData={currentPost} onSubmit={handleSubmit} loading={loading} />
    </S.Container>
  );
};
