
import DataTable from "../../../common/DataTable";
import useBusinessListCustomHook from "./useBusinessListCustomHook";


const BusinessList = () => {
  const { loading, data, addBusiness, deleteBusiness } = useBusinessListCustomHook();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
  ];

  return (
    <div className="business-list-container">
      <h2 className="heading">Business List</h2>
      <div className="addContainer">
        <button className="add-business-btn" onClick={addBusiness}>Add Business</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} onDelete={deleteBusiness} />
      )}
    </div>
  );
};

export default BusinessList;
