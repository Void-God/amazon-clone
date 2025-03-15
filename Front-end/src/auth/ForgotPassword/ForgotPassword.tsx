import { FaEnvelope } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../StyleSheet/login.css";
import useForgotPasswordCustomHook from "./useForgotPasswordCustomHook";
import { forgotPasswordValidationSchema } from "../../components/common/validation";

const ForgotPassword = () => {
  const { handleSendOTP, navigate,loading } = useForgotPasswordCustomHook();

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Forgot Password? 🔑</h2>
        <p className="login-subtitle">Enter your email to receive an OTP</p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={(values) => {
            handleSendOTP(values.email);
          }}
        >
          {({  errors, touched }) => (
            <Form>
              <div className="input-container">
                <FaEnvelope className="input-icon" />
                <Field type="email" name="email" className="input-field" placeholder="Enter your email" />
              </div>
              <div className={`error-text ${errors.email && touched.email ? "visible" : ""}`}>
                <ErrorMessage name="email" />
              </div>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </Form>
          )}
        </Formik>


        <p className="signup-text">
          Remembered your password? {" "}
          <a onClick={() => navigate("/login")} className="forgot-password-text">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
