import '../../StyleSheet/accessDenied.css';

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <h1 className="access-denied-title">403</h1>
      <h2 className="access-denied-subtitle">Access Denied</h2>
      <p className="access-denied-text">You do not have permission to view this page.</p>
      <a href="/" className="access-denied-button">Go Home</a>
    </div>
  );
};

export default AccessDenied;
