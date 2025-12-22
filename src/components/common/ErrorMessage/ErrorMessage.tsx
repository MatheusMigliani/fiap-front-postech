import * as S from './ErrorMessage.styles';

export interface ErrorMessageProps {
  message?: string;
  title?: string;
}

export const ErrorMessage = ({
  title = 'Erro',
  message = 'Ocorreu um erro ao carregar os dados.',
}: ErrorMessageProps) => {
  return (
    <S.ErrorContainer>
      <S.ErrorIcon>⚠️</S.ErrorIcon>
      <S.ErrorTitle>{title}</S.ErrorTitle>
      <S.ErrorText>{message}</S.ErrorText>
    </S.ErrorContainer>
  );
};
