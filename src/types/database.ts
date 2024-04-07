export interface IUser{
    id?:string;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    profile?:string;
    blocked?:boolean;
    focusLanguage?:string;
    proficientLanguage?:string[]
    status?: 'active' | 'freeze';
}

