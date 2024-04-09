
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
    usersList:({firstName:string,lastName:string,email:string,blocked:boolean,userName:string}|null)[];
    limit?:number;
    key:string
}

export const usersListInitialState:IInitialUsersListState = {
    usersList:[],
    key:'',
    page:1,

}

