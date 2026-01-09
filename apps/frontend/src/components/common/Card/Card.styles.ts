import styled from 'styled-components';
import { media } from '@/styles/breakpoints';

export const CardContainer = styled.article`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }

  ${media.md} {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;
