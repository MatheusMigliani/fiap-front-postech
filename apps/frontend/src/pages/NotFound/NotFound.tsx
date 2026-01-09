import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
};
