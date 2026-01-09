import { Post } from '@/types/post.types';
import { Button } from '@/components/common';
import { truncate } from '@/utils/formatters/text.formatter';
import { formatDate } from '@/utils/formatters/date.formatter';
import * as S from './PostCard.styles';

export interface PostCardProps {
  post: Post;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const PostCard = ({ post, showActions = false, onEdit, onDelete }: PostCardProps) => {
  const description = post.description || truncate(post.content, 150);

  const cardContent = (
    <>
      <S.Title>{post.title}</S.Title>
      <S.Meta>
        <S.Author>Por: {post.author}</S.Author>
        <S.Date>{formatDate(post.createdAt)}</S.Date>
      </S.Meta>
      <S.Description>{description}</S.Description>
    </>
  );

  return (
    <S.CardWrapper>
      {!showActions ? (
        <S.StyledLink to={`/posts/${post.id}`}>{cardContent}</S.StyledLink>
      ) : (
        <>
          {cardContent}
          <S.Actions>
            <Button size="small" variant="outlined" onClick={() => onEdit?.(post.id)}>
              Editar
            </Button>
            <Button size="small" variant="danger" onClick={() => onDelete?.(post.id)}>
              Excluir
            </Button>
          </S.Actions>
        </>
      )}
    </S.CardWrapper>
  );
};
