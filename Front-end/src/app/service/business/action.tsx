
import { AppThunk } from "../../store";
import { businessList } from "./api";
import { busienss } from "./businessSlice";



export const businessAction = (token: string): AppThunk => (dispatch) =>
   businessList(token).then((reponse) => {
     dispatch(busienss(reponse));
    return true;
  })
    .catch(() => { })
    .finally(() => {
    });


