
import { IUser } from "../../../types/database";
export interface IInitialUserState{
    userData:IUser | null,
    isAuth:boolean,
} 

export const userInitialState: IInitialUserState = {
    isAuth: localStorage.getItem('userData')?true:false,
    userData: localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData') || '' ):null,
};

