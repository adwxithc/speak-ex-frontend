const toggleVideoTrack = (stream:MediaStream) => {

    const mutedStatus = stream.getVideoTracks()[0].enabled;
    stream.getVideoTracks()[0].enabled = !mutedStatus;
  };
  
  const toggleAudioTrack = (stream:MediaStream) => {
  
    const mutedStatus = stream.getAudioTracks()[0].enabled;
    stream.getAudioTracks()[0].enabled = !mutedStatus;
  };
  
  export { toggleVideoTrack, toggleAudioTrack };
  