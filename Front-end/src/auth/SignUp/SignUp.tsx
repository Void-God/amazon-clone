
import { FaUser, FaLock } from "react-icons/fa";
import "../../StyleSheet/signup.css";
import { validationSchema } from "../../components/common/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useSignUpCustomHook from "./useSignUpCustomHook";


const Signup = () => {
  const { handleSignup, navigate, } = useSignUpCustomHook();
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create an Account 🚀</h2>
        <p className="signup-subtitle">Sign up to get started</p>


        <Formik
          initialValues={{ email: "", password: "", name: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={(value) => handleSignup(value.email, value.password, value.name, value.phone)}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Name Input */}
              <div className="input-container">
                <FaUser className="input-icon" />
                <Field type="text" name="name" className="input-field" placeholder="Enter your name" />
              </div>
              <div className={`error-text ${errors.name && touched.name ? "visible" : ""}`}>
                <ErrorMessage name="name" />
              </div>

              {/* Email Input */}
              <div className="input-container">
                <FaUser className="input-icon" />
                <Field type="email" name="email" className="input-field" placeholder="Enter your email" />
              </div>
              <div className={`error-text ${errors.email && touched.email ? "visible" : ""}`}>
                <ErrorMessage name="email" />
              </div>

              {/* Phone Input */}
              <div className="input-container">
                <FaLock className="input-icon" />
                <Field type="text" name="phone" className="input-field" placeholder="Enter your phone number"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                  }}
                />
              </div>
              <div className={`error-text ${errors.phone && touched.phone ? "visible" : ""}`}>
                <ErrorMessage name="phone" />
              </div>

              {/* Password Input */}
              <div className="input-container">
                <FaLock className="input-icon" />
                <Field type="password" name="password" className="input-field" placeholder="Enter your password" />
              </div>
              <div className={`error-text ${errors.password && touched.password ? "visible" : ""}`}>
                <ErrorMessage name="password" />
              </div>

              {/* Signup Button */}
              <button type="submit" className="signup-button" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

            </Form>
          )}
        </Formik>
        {/* Login Redirect */}
        <p className="login-text">
          Already have an account?{" "}
          <a onClick={() => navigate("/")}>Login</a>
        </p>
      </div>

    </div>
  );
};

export default Signup;
