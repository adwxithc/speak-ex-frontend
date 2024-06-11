export interface IInitialSessionState {
    audioDevice:string;
    videoDevice:string;
    video:boolean;
    audio:boolean;
 
 }
 
 export const sessionInitialState: IInitialSessionState = {
   
     audioDevice: 'default', //enumerate devices, chosen audio input device (we dont care about the output device)
     videoDevice: 'default',
     video:true,
     audio:true
 
 };
 