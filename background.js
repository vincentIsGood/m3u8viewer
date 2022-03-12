/**
 * The Processing Pipeline to Create a New Player Tab for m3u8.
 * 1st: We'll stop chrome from downloading m3u8.
 * 2nd: Open a new player tab for that m3u8
 * 
 * API References:
 * https://developer.chrome.com/docs/extensions/reference/tabs/
 * https://developer.chrome.com/docs/extensions/reference/downloads/
 * https://developer.chrome.com/docs/extensions/reference/scripting/
 */

/**
 * When it is null, the script is not running.
 * @type {string}
 */
let originalUrl = null;

function canCreatePlayer(){
    return originalUrl && isStreamFile(originalUrl);
}

function isRemoteFile(url){
    if(!url) return false;
    return url.startsWith("http") || url.startsWith("https");
}

function isStreamFile(url){
    if(!url) return false;
    return url.endsWith(".m3u8") || url.endsWith(".m3u");
}

function closeCurrentTab(){
    return chrome.tabs.query({active: true, currentWindow: true})
            .then((tabs)=>{
                chrome.tabs.remove(tabs[0].id);
            });
}

async function createPlayerTab(){
    if(canCreatePlayer()){
        chrome.tabs.create({
            url: "player/index.html?origin=" + originalUrl,
            active: true,
        });
    }

    // complete the pipeline / cycle
    if(originalUrl){
        originalUrl = null;
    }
}

chrome.downloads.onCreated.addListener((item)=>{
    // console.log("Downloads on created with id " + item.id + " " + originalUrl);
    // chrome.downloads.search({}, console.log);
    if(isStreamFile(item.finalUrl)){
        originalUrl = item.finalUrl;
        chrome.downloads.cancel(item.id);
        chrome.downloads.erase({id: item.id});
        if(isRemoteFile(item.finalUrl)){
            closeCurrentTab().then(createPlayerTab);
        }
    }
});

/**
 * Important.
 * {@link https://stackoverflow.com/questions/43103659/is-there-a-
 * way-to-abort-a-download-from-ondeterminingfilename}
 */
chrome.downloads.onDeterminingFilename.addListener((item, suggest)=>{
    if(isStreamFile(item.finalUrl)){
        originalUrl = item.finalUrl;
        chrome.downloads.cancel(item.id);
    }
    // suggest({
    //     filename: item.filename,
    //     conflictAction: 'prompt'
    // });
});

// https://stackoverflow.com/questions/54708537/pass-data-or-modify-extension-html-in-a-new-tab-window/54715122#54715122
chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
    createPlayerTab();
});