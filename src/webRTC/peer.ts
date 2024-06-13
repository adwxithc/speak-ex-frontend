export interface IPeerService {
  getOffer(): Promise<RTCSessionDescriptionInit | undefined>;
  getAnswer(
      offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit | undefined>;
  setRemoteDescription(ans: RTCSessionDescriptionInit): Promise<void>;
  addTrack(track: MediaStreamTrack, stream: MediaStream): Promise<void>;
  getPeerConnection(): RTCPeerConnection | null;
  destroyPeerConnection(): void;
  getLocalStream(): MediaStream | null;
}

class PeerService implements IPeerService {
  private peer: RTCPeerConnection | null;
  constructor() {
      this.peer = new RTCPeerConnection({
          iceServers: [
              {
                  urls: [
                      'stun:stun.l.google.com:19302',
                      'stun:global.stun.twilio.com:3478',
                  ],
              },
          ],
      });

  }

  async getOffer() {
      if (!this.peer) return;
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
  }

  getLocalStream() {
      if (!this.peer) return null;

      const localTracks = this.peer
          .getSenders()
          .map((sender) => sender.track);

      // Filter out null tracks and tracks of kind 'audio' or 'video'
      const filteredTracks = localTracks.filter(
          (track) =>
              track && (track.kind === 'video' || track.kind === 'audio')
      );

      if (filteredTracks.length > 0) {
          // Create a new MediaStream with the filtered tracks
          const stream = new MediaStream(
              filteredTracks.filter(
                  (track) => track 
              ) as MediaStreamTrack[]
          );
          return stream;
      } else {
          return null;
      }
  }

  async getAnswer(offer: RTCSessionDescriptionInit) {
      if (!this.peer) return;
      await this.peer.setRemoteDescription(offer);

      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
  }

  async setRemoteDescription(ans: RTCSessionDescriptionInit) {
      if (!this.peer) return;
      try {
          await this.peer.setRemoteDescription(
              new RTCSessionDescription(ans)
          );
      } catch (error) {
          console.error('Error setting remote description:', error);
      }
  }

  async addTrack(track: MediaStreamTrack, stream: MediaStream) {
      try {
          this.peer?.addTrack(track, stream);
      } catch (error) {
          console.log('error in add tracks', error);
      }
  }
  getPeerConnection() {
      return this.peer;
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

// const peerService = new PeerService();

// export default PeerService;

let peer:IPeerService|null= null

const getPeerConnection = ()=>{
  console.log('gotted peer',peer);
  
  if(peer!==null)return peer
  peer = new PeerService()
  return peer
}
export const resetPeerConnection = ()=>{
  peer =null
}

export default getPeerConnection


