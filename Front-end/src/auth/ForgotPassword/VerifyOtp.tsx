import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../StyleSheet/verifyOTP.css";
import useForgotPasswordCustomHook from "./useForgotPasswordCustomHook";
import { verifyOTPValidationSchema } from "../../components/common/validation";


const VerifyOTP = () => {
  const { handleVerifyOTP, handleResendOTP } = useForgotPasswordCustomHook();

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2 className="otp-title">Verify OTP ✅</h2>
        <p className="otp-subtitle">Enter the OTP sent to your email</p>
        
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={verifyOTPValidationSchema} 
          onSubmit={(values, { setSubmitting }) => {
            handleVerifyOTP(values.otp);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="otp-input-container">
                <Field type="text" name="otp" className="otp-input-field" placeholder="Enter OTP" />
              </div>
              <div className={`otp-error-text ${errors.otp && touched.otp ? "visible" : ""}`}>
                <ErrorMessage name="otp" />
              </div>
              <button type="submit" className="otp-button" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
              <p className="otp-resend-text">
                Didn't receive OTP? <a onClick={() => handleResendOTP()}>Resend OTP</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOTP;
