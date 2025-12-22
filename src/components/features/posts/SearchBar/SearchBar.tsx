import * as S from './SearchBar.styles';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Buscar posts por palavra-chave...',
}: SearchBarProps) => {
  return (
    <S.SearchContainer>
      <S.SearchInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </S.SearchContainer>
  );
};
