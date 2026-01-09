import { ReactNode } from 'react';
import * as S from './Card.styles';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <S.CardContainer className={className}>{children}</S.CardContainer>;
};
