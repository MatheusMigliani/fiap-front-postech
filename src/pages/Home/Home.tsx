import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts, searchPosts } from '@/store/slices/postsSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { PostList, SearchBar } from '@/components/features/posts';
import { ErrorMessage } from '@/components/common';
import * as S from './Home.styles';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, filteredPosts, loading, error, searchQuery } = useAppSelector(
    (state) => state.posts
  );
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearchQuery, 500);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(searchPosts(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  const displayPosts = debouncedSearch ? filteredPosts : posts;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <S.Container>
      <S.Title>Blog FIAP</S.Title>
      <S.Subtitle>Conteúdos educacionais para professores e alunos</S.Subtitle>

      <SearchBar value={localSearchQuery} onChange={setLocalSearchQuery} />

      <PostList posts={displayPosts} loading={loading} />
    </S.Container>
  );
};
