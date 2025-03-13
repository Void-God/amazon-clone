import { useSelector } from "react-redux"
import AccessDenied from "./AccessDenied";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileAction } from "../../app/service/auth/action";
const AuthGuard = ({ children, role }: any) => {
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useSelector(((state: any) => state.auth))

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("user");
    dispatch<any>(profileAction(token as string)).then(()=>setLoading(false))

  }, [])
  if (loading) return(<>Loadingg......</>)
    return (
      <>
        {
          !isAuthenticated ?
            <Navigate to='/login' /> :
            role === user.role ?
              children :
              <AccessDenied />
        }
      </>
    )

  return isAuthenticated ? children : <AccessDenied />

}


export default AuthGuard;