
export interface IInitialAdminState{
    adminData:{email:string} | null,
    isAuth:boolean,  
} 



export const adminInitialState: IInitialAdminState = {
    isAuth: localStorage.getItem('adminData')?true:false,
    adminData: localStorage.getItem('adminData')?JSON.parse(localStorage.getItem('adminData') || '' ):null,
   
};


export interface IInitialUsersListState{
    page:number;
    usersList:({firstName:string,lastName:string,email:string,blocked:boolean,userName:string,id:string})[];
    limit?:number;
    key:string
    totalUsers:number
}

export const usersListInitialState:IInitialUsersListState = {
    usersList:[],
    key:'',
    page:1,
    totalUsers:0

}

export interface IInitialLanguageListState{
    page:number;
    languageList:({name:string;basePrice:number})[];
    limit?:number;
    key:string
    
}

export const languageListInitialState:IInitialLanguageListState = {
    languageList:[],
    key:'',
    page:1,

}

