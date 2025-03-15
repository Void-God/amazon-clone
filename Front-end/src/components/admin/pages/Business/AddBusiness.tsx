import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../../../StyleSheet/addBuisnes.css';
import { addBusinessValidationSchema } from '../../../common/validation';
import useAddBusinessCustomHook from './useAddBusinessCustomHook';

const AddBusiness = () => {


 const {handleSubmit} = useAddBusinessCustomHook();

  return (
    <div className="add-business-container">
      <div className="form-box">
        <h2>Add Business</h2>
        <Formik
          initialValues={{ name: '', email: '', phoneNumber: '', password: '' }}
          validationSchema={addBusinessValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <label>Business Name</label>
              <Field type="text" name="name" placeholder="Enter business name" />
              <ErrorMessage name="name" component="div" className="error" />

              <label>Email</label>
              <Field type="email" name="email" placeholder="Enter email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Phone Number</label>
              <Field type="text" name="phoneNumber" placeholder="Enter phone number" />
              <ErrorMessage name="phoneNumber" component="div" className="error" />

              <label>Password</label>
              <Field type="password" name="password" placeholder="Enter password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" className="submitButton">
                Add Business
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBusiness;