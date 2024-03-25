import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <main className="section page-center">
      <section className="error-page">
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to="/" className="error-btn">
          back home
        </Link>
      </section>
    </main>
  );
};

export default ErrorPage;
