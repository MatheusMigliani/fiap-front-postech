import { Post } from '@/types/post.types';
import { Loading } from '@/components/common';
import { PostCard } from '../PostCard';
import * as S from './PostList.styles';

export interface PostListProps {
  posts: Post[];
  loading?: boolean;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const PostList = ({ posts, loading, showActions, onEdit, onDelete }: PostListProps) => {
  if (loading) {
    return <Loading text="Carregando posts..." />;
  }

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return <S.EmptyState>Nenhum post encontrado.</S.EmptyState>;
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
