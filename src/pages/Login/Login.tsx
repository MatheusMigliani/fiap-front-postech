import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input, Button } from '@/components/common';
import * as S from './Login.styles';

export const Login = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <S.Container>
      <S.LoginCard>
        <S.Title>Login</S.Title>
        <S.Subtitle>Área restrita para professores</S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="seu.email@fiap.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            Entrar
          </Button>
        </S.Form>

        <S.CredentialsInfo>
          <S.InfoTitle>Credenciais de Teste:</S.InfoTitle>
          <S.InfoText>Email: professor@fiap.com.br</S.InfoText>
          <S.InfoText>Senha: fiap2024</S.InfoText>
        </S.CredentialsInfo>
      </S.LoginCard>
    </S.Container>
  );
};
