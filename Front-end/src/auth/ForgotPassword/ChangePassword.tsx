import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../StyleSheet/change-password.css";
import useForgotPasswordCustomHook from "./useForgotPasswordCustomHook";
import { changePasswordValidationSchema } from "../../components/common/validation";

const ChangePassword = () => {
  const { handleChangePassword } = useForgotPasswordCustomHook();

  return (
    <div className="password-container">
      <div className="password-box">
        <h2 className="password-title">Change Password 🔒</h2>
        <p className="password-subtitle">Enter your new password</p>

        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={changePasswordValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleChangePassword(values.newPassword,values.confirmPassword);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="password-input-container">
                <Field
                  type="password"
                  name="newPassword"
                  className="password-input-field"
                  placeholder="Enter new password"
                />
              </div>
              <div className={`password-error-text ${errors.newPassword && touched.newPassword ? "visible" : " "}`}>
                <ErrorMessage name="newPassword" />
              </div>

              <div className="password-input-container">
                <Field
                  type="password"
                  name="confirmPassword"
                  className="password-input-field"
                  placeholder="Confirm new password"
                />
              </div>
              <div className={`password-error-text ${errors.confirmPassword && touched.confirmPassword ? "visible" : ""}`}>
                <ErrorMessage name="confirmPassword" />
              </div>

              <button type="submit" className="password-button" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Change Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
