export interface Ierror{
    status:number,
    data:{
        errors:{field?:string,message:string}[]
    }
}