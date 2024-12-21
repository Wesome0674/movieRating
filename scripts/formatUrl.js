const formatUrl = (url, loop, autoplay, controls) => {
    const id = url.slice(30, 41);
    const prevID = url.slice(0, 29);
    const playlist = `playlist=${id}`;
    const isloop = `loop=${loop}`;
    const isautoplay = `autoplay=${autoplay}`;
    const iscontrols = `controls=${controls}`;
    const formatedUrl = `${prevID}/${id}?${playlist}&${isloop}&${isautoplay}&${iscontrols}`;
    return formatedUrl;
  };