import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import {
  Home,
  Login,
  NotFound,
  PostDetail,
  CreatePost,
  EditPost,
  AdminPanel,
} from '@/pages';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Rotas Públicas */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="posts/:id" element={<PostDetail />} />

          {/* Rotas Protegidas (Professores) */}
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
