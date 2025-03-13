import { Outlet } from "react-router-dom"
import BuyerSidebar from "./BuyerSidebar"
import BuyerHeader from "./BuyerHeader"


const BuyerLayout = () => {

  return (
    <>
      <BuyerSidebar />
      <BuyerHeader />
      <Outlet />
    </>
  )
}


export default BuyerLayout