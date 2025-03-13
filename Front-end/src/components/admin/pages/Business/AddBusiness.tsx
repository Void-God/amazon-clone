import '../../../../StyleSheet/addBuisnes.css'
import useAddBusinessCustomHook from "./useAddBusinessCustomHook";

const AddBusiness = () => {
  const { handleChange, handleSubmit, formData } = useAddBusinessCustomHook();
  return (
    <div className="add-business-container">
      <div className="form-box">
        <h2>Add Business</h2>
        <form onSubmit={handleSubmit}>
          <label>Business Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter business name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />

          <button type="submit" className="submitButton">Add Business</button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
