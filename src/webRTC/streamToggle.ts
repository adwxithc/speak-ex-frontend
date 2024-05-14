const toogleVideoTrack = (stream:MediaStream) => {

    const mutedStatus = stream.getVideoTracks()[0].enabled;
    stream.getVideoTracks()[0].enabled = !mutedStatus;
  };
  
  const toogleAudioTrack = (stream:MediaStream) => {
  
    const mutedStatus = stream.getAudioTracks()[0].enabled;
    stream.getAudioTracks()[0].enabled = !mutedStatus;
  };
  
  export { toogleVideoTrack, toogleAudioTrack };
  