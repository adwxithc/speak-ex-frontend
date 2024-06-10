export interface IPeerService{
    getOffer(): Promise<RTCSessionDescriptionInit | undefined>
    getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | undefined>
    setRemoteDescription(ans: RTCSessionDescriptionInit): Promise<void>
    addTrack(track: MediaStreamTrack, stream: MediaStream): Promise<void>
    getPeerConnection(): RTCPeerConnection | null
    destroyPeerConnection(): void
}

class PeerService implements IPeerService{

    private peer: RTCPeerConnection|null;
    constructor(){
        
        this.peer = new RTCPeerConnection({
            iceServers: [
              {
                urls: [
                  "stun:stun.l.google.com:19302",
                  "stun:global.stun.twilio.com:3478",
                ],
              },
            ],
          });
    }

    async getOffer(){
       try {
        if(!this.peer) return
        const offer = await this.peer.createOffer()
        await this.peer.setLocalDescription( new RTCSessionDescription(offer))
        return offer;
       } catch (error) {
        console.log('error generation offer');
        
       }
    }

    async getAnswer(offer:RTCSessionDescriptionInit){
      try {
        if(!this.peer) return 
        await this.peer.setRemoteDescription(offer)
        const ans = await this.peer.createAnswer()
        await this.peer.setLocalDescription( new RTCSessionDescription(ans))
        return ans
      } catch (error) {
        console.log('error creating answer');
        
      }
        

    }

    async setRemoteDescription(ans:RTCSessionDescriptionInit){
        if(!this.peer || !ans) return 
        try {
            
            
            
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        } catch (error) {
            console.error('Error setting remote description:', error);
        }
    }

    async addTrack(track:MediaStreamTrack,stream:MediaStream){
        try {
            this.peer?.addTrack(track,stream)
        } catch (error) {
            console.log('error in add tracks', error);
            
        }
        
    }
    getPeerConnection() {
        return this.peer ;
      }

    destroyPeerConnection() {
        if (this.peer) {
          this.peer.ontrack = null;
       
          this.peer.onicecandidate = null;
          this.peer.oniceconnectionstatechange = null;
          this.peer.onsignalingstatechange = null;
          this.peer.onicegatheringstatechange = null;
          this.peer.onnegotiationneeded = null;
          this.peer.getSenders().forEach((sender) => sender.track?.stop());
          // this.peer.close();
        }
     
      }
}

const peerService = new PeerService();

export default peerService;