import { api } from "config/index";

//
// open child windows that direct to 42 intra and get the code when user is
// redirected to our redirection callback that's it;

export default function oauthPopup(callback: (message: string) => void): void {
  console.log("auth url", api.auth42);
  const childPopup = window.open(api.auth42, "_blank", "height=800,width=600");

  if (!childPopup) {
    callback("failed to create child window");
    return;
  }

  function getCodeFromRedirection(windowChild: Window) {
    if (windowChild.document.domain === document.domain) {
      if (windowChild.document.readyState === "complete") {
        callback(windowChild.document.URL.split("=")[1]);
        clearInterval(interval);
        windowChild.close();
        clearTimeout(timeOutCallback);
      }
    } else {
      // this code should never be reached,
      // as the x-site security check throws
      // but just in case
      clearInterval(interval);
      windowChild.close();
      callback("error");
      clearTimeout(timeOutCallback);
    }
  }

  const timeOutCallback = setTimeout(function timeOut() {
    clearInterval(interval);
    childPopup.close();
    callback("error");
  }, 60000);

  const interval = setInterval(function () {
    try {
      getCodeFromRedirection(childPopup);
    } catch (e) {
      // we're here when the childPopup window has been closed
      if (childPopup.closed) {
        clearInterval(interval);
        callback("error");
        clearTimeout(timeOutCallback);
      }
    }
  }, 500);
}