import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema, CreatePostFormData } from '@/utils/validators/post.validator';
import { CreatePostData, Post } from '@/types/post.types';
import { Input, Button } from '@/components/common';
import * as S from './PostForm.styles';

export interface PostFormProps {
  initialData?: Post;
  onSubmit: (data: CreatePostData) => Promise<void>;
  loading?: boolean;
  mode: 'create' | 'edit';
}

export const PostForm = ({ initialData, onSubmit, loading, mode }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          author: initialData.author,
          content: initialData.content,
        }
      : undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        author: initialData.author,
        content: initialData.content,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: CreatePostFormData) => {
    await onSubmit(data);
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        label="Título"
        placeholder="Digite o título do post"
        error={errors.title?.message}
        {...register('title')}
      />

      <Input
        label="Autor"
        placeholder="Nome do autor"
        error={errors.author?.message}
        {...register('author')}
      />

      <Input
        as="textarea"
        label="Conteúdo"
        placeholder="Digite o conteúdo do post..."
        error={errors.content?.message}
        {...register('content')}
      />

      <S.ButtonGroup>
        <Button type="button" variant="outlined" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {mode === 'create' ? 'Criar Post' : 'Salvar Alterações'}
        </Button>
      </S.ButtonGroup>
    </S.FormContainer>
  );
};
