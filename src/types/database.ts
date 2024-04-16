export interface IUser{
    id:string;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    profile?:string;
    blocked?:boolean;
    createdAt:string;
    focusLanguage?:string;
    proficientLanguage?:string[]
    status?: 'active' | 'freeze';
}

