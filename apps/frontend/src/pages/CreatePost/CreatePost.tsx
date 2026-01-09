import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createPost } from '@/store/slices/postsSlice';
import { CreatePostData } from '@/types/post.types';
import { PostForm } from '@/components/features/posts';
import { toast } from 'react-toastify';
import * as S from './CreatePost.styles';

export const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);

  const handleSubmit = async (data: CreatePostData) => {
    try {
      await dispatch(createPost(data)).unwrap();
      toast.success('Post criado com sucesso!');
      navigate('/');
    } catch {
      toast.error('Erro ao criar post');
    }
  };

  return (
    <S.Container>
      <S.Title>Criar Novo Post</S.Title>
      <PostForm mode="create" onSubmit={handleSubmit} loading={loading} />
    </S.Container>
  );
};
