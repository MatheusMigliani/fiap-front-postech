import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPostById, clearCurrentPost } from '@/store/slices/postsSlice';
import { Loading, ErrorMessage, Button } from '@/components/common';
import { formatDate } from '@/utils/formatters/date.formatter';
import * as S from './PostDetail.styles';

export const PostDetail = () => {
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

  if (loading) return <Loading text="Carregando post..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentPost) return <ErrorMessage message="Post não encontrado" />;

  return (
    <S.Container>
      <S.Article>
        <S.Title>{currentPost.title}</S.Title>
        <S.Meta>
          <S.Author>Por: {currentPost.author}</S.Author>
          <S.Date>{formatDate(currentPost.createdAt)}</S.Date>
        </S.Meta>
        <S.Content>{currentPost.content}</S.Content>
        <S.BackButton>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Voltar para Home
          </Button>
        </S.BackButton>
      </S.Article>
    </S.Container>
  );
};
