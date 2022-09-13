/**
 * The main function of this script is to get url
 * from param then stream the m3u8 file using
 * videojs.
 */
/**
 * @param {string} key
 */
function getParam(key){
    let searchParam = window.location.search;
    if(!searchParam.startsWith("?")){
        return null;
    }
    searchParam = searchParam.substring(1);
    if(searchParam.includes("&")){
        for(let paramKey of searchParam.split("&")){
            let kv = paramKey.split("=");
            if(kv[0] == key){
                return kv[1];
            }
        }
    }else{
        return searchParam.split("=")[1];
    }
    return null;
}

function isLocalFile(url){
    return url.startsWith("file://");
}

window.onload = ()=>{
    let video = videojs("video");
    // video.src({type: "application/vnd.apple.mpegurl", src: getParam("origin")});
    video.src({type: "application/x-mpegURL", src: decodeURIComponent(getParam("origin"))});
}