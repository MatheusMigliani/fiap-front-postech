import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import * as S from './Input.styles';

interface BaseInputProps {
  label?: string;
  error?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
  as?: 'input';
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  as: 'textarea';
}

export type CombinedInputProps = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedInputProps>(
  ({ label, error, as = 'input', ...rest }, ref) => {
    const hasError = !!error;

    return (
      <S.InputWrapper>
        {label && <S.Label>{label}</S.Label>}
        {as === 'textarea' ? (
          <S.StyledTextarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            $hasError={hasError}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <S.StyledInput
            ref={ref as React.Ref<HTMLInputElement>}
            $hasError={hasError}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputWrapper>
    );
  }
);

Input.displayName = 'Input';
