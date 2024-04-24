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

export interface IPost{
    id:string;
    title:string
    content:string;
    image:string;
    userId:string;
    likes?:string[];
    comments?:string[];
    createdAt?:string;
    updatedAt?:string;
}

export interface ILanguage{
    id:string;
    name:string;
    basePrice:number;
}

