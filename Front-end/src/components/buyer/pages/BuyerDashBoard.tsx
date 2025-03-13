import { useNavigate } from "react-router-dom";

const BuyerDashBoard=()=>{
  const navigate = useNavigate();

 return(
        <>

        <div>
          <p>
            Hello this buyer DashBoard
            <button onClick={()=>navigate('/user/details')}> Moce to details</button>
          </p>
        </div>
        </>

 ) 
}

export default BuyerDashBoard;
