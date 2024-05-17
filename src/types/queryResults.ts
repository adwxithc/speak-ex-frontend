export interface ILnaguageMonthelySessions{
    month:string;
    year:string;
    sessionsCount:number;
}

export interface IBackendResponse<T>{
    success:boolean,
    data:T,
    message?:string
}