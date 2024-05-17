import { IPeerService } from './peer'
import stopStreamedMedia from "./stopStreamedMedia";

const endPeerConnectionHandler = ({
    peerService,
    localStream,
    remoteStream
  }:{
    peerService:IPeerService,
    localStream:MediaStream | null,
    remoteStream:MediaStream |null
  }) => {
    peerService.destroyPeerConnection();
    stopStreamedMedia(remoteStream);
    stopStreamedMedia(localStream);
};

export default endPeerConnectionHandler;