import styled, { css, keyframes } from 'styled-components';

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
  $size: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
}

const sizeStyles = {
  small: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  medium: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  `,
  large: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.text.contrast};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.text.contrast};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary.dark};
    }
  `,
  outlined: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 2px solid ${({ theme }) => theme.colors.primary.main};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.text.contrast};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.main};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background.default};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.text.contrast};

    &:hover:not(:disabled) {
      background-color: #d32f2f;
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
