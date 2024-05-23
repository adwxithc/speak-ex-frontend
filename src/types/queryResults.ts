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

export interface rtkQueryResponse<T>{
    data?: T; // Success case: data is an IWallet object (defined in your types/database.ts)
    error?: unknown; // Error case: error contains details about the error
    isLoading: boolean; // Flag indicating if the query is still loading
    isSuccess: boolean; // Flag indicating if the query was successful
     fulfilledTimeStamp?: number; // Timestamp of successful query fulfillment (optional)
    isError?: boolean; 
}
