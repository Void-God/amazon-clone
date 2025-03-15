import { FaUser, FaLock } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../StyleSheet/login.css";
import useAuthCustomHook from "./useAuthCustomHook";
import { loginValidationSchema } from "../../components/common/validation";

const Login = () => {
  const { handleLogin, navigate } = useAuthCustomHook();

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to your account</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(value) => handleLogin(value.email, value.password)}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="input-container">
                <FaUser className="input-icon" />
                <Field type="email" name="email" className="input-field" placeholder="Enter your email" />
              </div>
              <div className={`error-text ${errors.email && touched.email ? "visible" : ""}`}>
                <ErrorMessage name="email" />
              </div>
              <div className="input-container">
                <FaLock className="input-icon" />
                <Field type="password" name="password" className="input-field" placeholder="Enter your password" />
              </div>
              <div className={`error-text ${errors.password && touched.password ? "visible" : ""}`}>
                <ErrorMessage name="password" />
              </div>


              <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <div className="forgot-password-container">
                <a onClick={() => navigate("/forgot-password")} className="forgot-password-text">Forgot Password?</a>
              </div>
            </Form>
          )}
        </Formik>

        <p className="signup-text">
          Don't have an account? {" "}
          <a onClick={() => navigate("/signup")}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;