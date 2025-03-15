
import { AppThunk } from "../../store";
import {  addBusinessApi, businessList, deleteBusinessApi } from "./api";
import { busienss } from "./businessSlice";



export const businessAction = (token: string): AppThunk => (dispatch) =>
  businessList(token).then((reponse) => {
    dispatch(busienss(reponse));
    return true;
  })
    .catch(() => { })
    .finally(() => {
    });
export const addBusinessAction = (token: string, data: any): AppThunk => () =>
  addBusinessApi(token, data).then(() => {
    return true;
  })
    .catch(() => { return false })
    .finally(() => {
    });

export const deleteBusinessAction = (token: string, businessId: string): AppThunk => () =>
  deleteBusinessApi(token, businessId).then(() => {
    return true;
  })
    .catch(() => { return false })
    .finally(() => {
    });



