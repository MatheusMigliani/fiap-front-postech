import { useNavigate } from 'react-router-dom';
import { Post } from '@/types/post.types';
import { Loading } from '@/components/common';
import { PostCard } from '../PostCard';
import { useAppSelector } from '@/store/hooks';
import * as S from './PostList.styles';

export interface PostListProps {
  posts: Post[];
  loading?: boolean;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const PostList = ({ posts, loading, showActions, onEdit, onDelete }: PostListProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading text="Carregando posts..." />;
  }

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <S.EmptyStateContainer>
        <S.EmptyStateIcon>📝</S.EmptyStateIcon>
        <S.EmptyStateTitle>Nenhum post encontrado</S.EmptyStateTitle>
        <S.EmptyStateText>
          Ainda não há conteúdos publicados. {isAuthenticated && 'Que tal criar o primeiro post?'}
        </S.EmptyStateText>
        {isAuthenticated && (
          <S.CreateButton onClick={() => navigate('/posts/create')}>
            Criar Primeiro Post
          </S.CreateButton>
        )}
      </S.EmptyStateContainer>
    );
  }

  return (
    <S.Grid>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          showActions={showActions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </S.Grid>
  );
};
