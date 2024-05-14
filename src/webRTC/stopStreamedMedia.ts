const stopStreamedMedia = (stream:MediaStream |null) => {
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
    }
  };
  export default stopStreamedMedia;