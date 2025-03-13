import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"


const Layout = () => {


  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <div style={{ flex: 1, overflow: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>

    </>
  )
}


export default Layout