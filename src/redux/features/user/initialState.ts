
import { IUser, IWallet } from "../../../types/database";
export interface IInitialUserState{
    userData:IUser |null,
    wallet:IWallet|null,
    isAuth:boolean,
} 

export const userInitialState: IInitialUserState = {
    isAuth: localStorage.getItem('userData')?true:false,
    wallet:null,
    userData: localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData') || '' ):null,

};

