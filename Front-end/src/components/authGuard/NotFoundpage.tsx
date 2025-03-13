import '../../StyleSheet/accessDenied.css';
export const NotFound = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <h2 className="error-subtitle">Page Not Found</h2>
      <p className="error-text">The page you are looking for does not exist.</p>
      <a href="/" className="error-button">Go Home</a>
    </div>
  );
};