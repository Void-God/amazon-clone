import useBusinessListCustomHook from "./useBusinessListCustomHook";
import "../../../../StyleSheet/businessListing.css";

const BusinessList = () => {
  const { loading, data, addBusiness } = useBusinessListCustomHook();

  return (
    <div className="business-list-container">
      <h2 className="heading">Business List</h2>
      <div className="addContainer" >
        <button className="add-business-btn" onClick={addBusiness}>Add Business</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : data?.length ? (
        <table className="business-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((business: any, index: any) => (
              <tr key={index}>
                <td>{business.name}</td>
                <td>{business.email}</td>
                <td>{business.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No businesses found</p>
      )}
    </div>
  );
};

export default BusinessList;
