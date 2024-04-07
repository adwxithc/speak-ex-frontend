
import { IUser } from "../../../types/database";
export interface IInitialUserState{
    userData:IUser | null,
    isAuth:boolean,
} 

export const userInitialState: IInitialUserState = {
    isAuth: false,
    userData: null,
};

