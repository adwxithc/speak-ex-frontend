class PeerService{

    public peer: RTCPeerConnection;
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
        if(!this.peer) return
        const offer = await this.peer.createOffer()
        await this.peer.setLocalDescription( new RTCSessionDescription(offer))
        return offer;
    }

    async getAnswer(offer:RTCSessionDescriptionInit){
        if(!this.peer) return 
        await this.peer.setRemoteDescription(offer)
        const ans = await this.peer.createAnswer()
        await this.peer.setLocalDescription( new RTCSessionDescription(ans))
        return ans

    }

    async setRemoteDescription(ans:RTCSessionDescriptionInit){
        if(!this.peer) return 
        try {
            
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        } catch (error) {
            console.error('Error setting local description:', error);
        }
    }

    async addTrack(track:MediaStreamTrack){
        try {
            this.peer.addTrack(track)
        } catch (error) {
            console.log('error in add tracks', error);
            
        }
        
    }
}

const peerService = new PeerService();
export default peerService;