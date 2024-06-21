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
    followers: string[],
    following: string[],
    isMonetized:boolean;
    requestedForMonetization:boolean
    coverPic?:string
}

   
   

    

export default IUser; 

export interface IPost{
    id:string;
    title:string
    content:string;
    image:string;
    userId:string;
    upvotes?:string[];
    comments?:string[];
    createdAt?:string;
    updatedAt?:string;
}

export interface ILanguage{
    id:string;
    name:string;
    basePrice:number;
    rate:number;
    createdAt?:string;
    updatedAt?:string;
}

export interface IComment{
    id:string;
    text:string;
    user:{userName:string, profile:string,id:string};
    postId:string;
    parentId:null|string;
    replys:number;
    createdAt:string;
    updatedAt:string;
}

export interface IChatRoom{
    id:string;
    members:string[];
    otherUserId: string;
    user: { userName: string, profile: string };
    createdAt?:string,
    updatedAt?:string,
    lastMessage:{text:string, createdAt:string, senderId:string},
    unseenMessageCount:number
}

export interface IMessage{
    id:string;
    roomId:string;
    senderId:string;
    text:string;
    seen:boolean;
    createdAt:string;
    updatedAt:string
}

export interface ITag{
    id:string;
    name:string,
    count:number
} 

export interface IWallet {
    id?: string;
    userId: string;
    silverCoins: number;
    goldCoins: number;
    money: number;
    transactions: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ISession{
    id:string;
    sessionCode:string;
    isMonetized:boolean;
    moneyToTheHelper?:number;
    helper:string;
    learner?:string;
    startingTime?:string;
    endingTime?:string;
    rating?:number
    languageId?:string;
    rate:number;
    createdAt?:string;
    updatedAt?:string;
    offers:string[]
}

export interface IReport{
    id:string;
    type:'sessions'|'posts';
    referenceId:string;
    description:string;
    reportedUser:string;
    reporter:string;
    createdAt:string;
    updatedAt:string;
}

export interface IReportWithUsers{
    reports:(IReport&{reporterInfo:{
        id: string;
        userName: string;
        firstName:string;
        lastName:string;
        profile:string;

    }})[],
    reportedUserInfo:{
        id: string;
        userName: string;
        firstName:string;
        lastName:string;
        profile:string
    },
}

export interface IUsersSesssionData{
    helpingSessions:number;
    learningSessions:number;
    rating:number;
    avgHelpingSessionsPerMonth:number;
    avgLearningSessionsPerMonth:number
    isMonetized:boolean
}

export interface IUserDetails extends Omit<IUser,'password'>{
    proficientLanguageInfo:ILanguage[];
    focusLanguageInfo:ILanguage;
    wallet:IWallet;
    session:IUsersSesssionData;
    social:{followers:number;following:number;posts:number;averageLikes:number}
    reports:(IReport&{reporterDetails:{firstName:string,lastName:string,userName:string,profile:string}})[]
}


export interface ICoinPurchasePlan{
    id:string;
    price:number;
    count:number;
    title:string;
    image:string;
    deleted?:boolean;
    createdAt:string,
    updatedAt:string
}
export type IMonetizationRequestStatus='pending'|'accepted'|'rejected';

interface IMonetizationRequest{
    id:string;
    userId:string
    status:IMonetizationRequestStatus;
    description:string;
    createdAt:string;
    updatedAt:string;
}


export interface IMonetizationRequestData extends IMonetizationRequest{
    userData:{
        id:string,
        firstName:string,
        lastName:string,
        userName:string,
        profile:string
    }
}

export interface ISessionDetails extends ISession {
    helperData: {firstName:string;lastName:string;userName:string;profile:string ; id:string};
    learnerData: {firstName:string;lastName:string;userName:string;profile:string ; id:string};
}

export type CurrencyType='gold' | 'silver' | 'money'

export interface ITransaction {
    id:string
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    currencyType: CurrencyType;
    transactionId: string;
    createdAt:string;
    updatedAt:string;
}

export interface INotification{
    id:string;
    userId:string;
    title:string;
    message:string;
    read:boolean;
    type:'POST_LIKE',
    relatedEntity:string,
    actionCreator:string,
    createdAt?:string;
    updatedAt?:string;
}

export interface INotificationDetails extends INotification{
    actionCreatorInfo:{
        id:string,
        firstName:string,
        lastName:string,
        userName:string,
        profile:string
    }
}


export interface IDashboardNumerics{
    totalEarnings:{
        thisMonth:number;
        lastMonth:number
    },
    totalSessions:{
        thisMonth:number;
        lastMonth:number
    },
    totalProfit:{
        thisMonth:number;
        lastMonth:number
    }
}