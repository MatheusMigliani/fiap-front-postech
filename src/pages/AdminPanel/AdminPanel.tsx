import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts, deletePost } from '@/store/slices/postsSlice';
import { PostList } from '@/components/features/posts';
import { Button, ErrorMessage } from '@/components/common';
import { toast } from 'react-toastify';
import * as S from './AdminPanel.styles';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) {
      return;
    }

    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success('Post excluído com sucesso!');
    } catch {
      toast.error('Erro ao excluir post');
    }
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Painel Administrativo</S.Title>
        <Button onClick={() => navigate('/posts/create')}>Criar Novo Post</Button>
      </S.Header>

      <PostList
        posts={posts}
        loading={loading}
        showActions
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </S.Container>
  );
};
