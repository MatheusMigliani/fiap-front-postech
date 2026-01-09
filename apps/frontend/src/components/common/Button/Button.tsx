import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <S.StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <S.Spinner />
      ) : (
        <>
          {startIcon && <S.IconWrapper>{startIcon}</S.IconWrapper>}
          {children}
          {endIcon && <S.IconWrapper>{endIcon}</S.IconWrapper>}
        </>
      )}
    </S.StyledButton>
  );
};
