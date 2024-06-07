import {  INotificationDetails } from "../../../../types/database";

export interface IInitialNotificationState{
    notifications:INotificationDetails[]|null
    page:number
    nextPage:number
    hasMore:boolean
    unreadedNotifications:number
   
   } 
   
   export const notificationInitialState: IInitialNotificationState = {
    notifications:null,
    page:0,
    nextPage:1,
    hasMore:false,
    unreadedNotifications:0
   };
   
   