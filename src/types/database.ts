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
    upvotes?:string[];
    comments?:string[];
    createdAt?:string;
    updatedAt?:string;
}

export interface ILanguage{
    id:string;
    name:string;
    basePrice:number;
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
