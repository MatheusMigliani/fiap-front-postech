import * as S from './Loading.styles';

export interface LoadingProps {
  text?: string;
}

export const Loading = ({ text = 'Carregando...' }: LoadingProps) => {
  return (
    <S.LoadingContainer>
      <S.Spinner />
      <S.LoadingText>{text}</S.LoadingText>
    </S.LoadingContainer>
  );
};
