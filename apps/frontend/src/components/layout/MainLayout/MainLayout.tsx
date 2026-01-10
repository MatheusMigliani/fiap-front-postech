import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { checkAuthStatus } from '@/store/slices/authSlice';
import { Button } from '@/components/common';
import * as S from './MainLayout.styles';

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, status, token } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Validate authentication on mount
  useEffect(() => {
    const validateAuth = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
      } catch {
        // Silent fail - token inválido ou ausente
      }
    };

    if (token && status === 'idle') {
      validateAuth();
    }
  }, [dispatch, status, token]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <S.LayoutWrapper>
      <S.Header>
        <S.HeaderContainer>
          <S.Logo to="/">
            <S.LogoText>
              FIAP <span>Blog</span>
            </S.LogoText>
          </S.Logo>

          <S.Nav>
            <S.NavLink to="/">Home</S.NavLink>
            {isAuthenticated && <S.NavLink to="/admin">Admin</S.NavLink>}
            {isAuthenticated ? (
              <S.UserInfo>
                <S.UserName>{user?.name}</S.UserName>
                <Button size="small" variant="outlined" onClick={logout}>
                  Sair
                </Button>
              </S.UserInfo>
            ) : (
              <S.NavLink to="/login">Login</S.NavLink>
            )}
          </S.Nav>

          <S.MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </S.MobileMenuButton>
        </S.HeaderContainer>

        <S.MobileMenu $isOpen={mobileMenuOpen}>
          <S.NavLink to="/" onClick={closeMobileMenu}>
            Home
          </S.NavLink>
          {isAuthenticated && (
            <S.NavLink to="/admin" onClick={closeMobileMenu}>
              Admin
            </S.NavLink>
          )}
          {isAuthenticated ? (
            <>
              <S.UserName>{user?.name}</S.UserName>
              <Button size="small" variant="outlined" onClick={logout} fullWidth>
                Sair
              </Button>
            </>
          ) : (
            <S.NavLink to="/login" onClick={closeMobileMenu}>
              Login
            </S.NavLink>
          )}
        </S.MobileMenu>
      </S.Header>

      <S.Main>
        <Outlet />
      </S.Main>

      <S.Footer>
        <S.FooterText>&copy; 2024 FIAP Blog - Tech Challenge Fase 03</S.FooterText>
      </S.Footer>
    </S.LayoutWrapper>
  );
};
