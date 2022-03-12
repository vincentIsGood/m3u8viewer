# m3u8 Viewer
## Usage
Since this is a chrome extension, it should work on chromium browsers. To import this extension, simply go to `Settings > Extensions > Turn on Developer Mode > Load Unpacked > Locate this project folder`.

Enable this extension then type in a *remote* .m3u8 file into the url address bar in chrome. Note that the remote m3u8 file must be a downloadable file. If the remote webserver for some reason sent you a "text/plain" m3u8 file, the chrome extension will not work. 

You may test it using a sample m3u8 from apple: https://devimages.apple.com.edgekey.net/iphone/samples/bipbop/bipbopall.m3u8

# Caveats
I noticed there are bugs inside the chrome extension. But it can be temporarily fixed by reloading the extension manually inside `Extensions` settings page. 

# Note
This extension made use of video-js.

Original webpage of video-js:
https://videojs.com/

The source code of video-js comes from github of video-js:
https://github.com/videojs/video.js