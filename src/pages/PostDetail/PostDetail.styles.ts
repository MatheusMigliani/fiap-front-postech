import styled from 'styled-components';
import { media } from '@/styles/breakpoints';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  ${media.md} {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`;

export const Article = styled.article`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};

  ${media.md} {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  ${media.sm} {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 2px solid ${({ theme }) => theme.colors.divider};
`;

export const Author = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const Date = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.hint};
`;

export const Content = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const BackButton = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;
