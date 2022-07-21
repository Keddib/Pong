import { URL_42 as URL } from "/src/Components/Constants";

//
// open child windows that direct to 42 intra and get the code when user is
// redirected to our redirection callback that's it;

export default function oauthPopup(callback) {

  var childPopup = window.open(
    URL,
    "_blank",
    "height=800,width=600"
  );

  const timeOutCallback = setTimeout(function timeOut() {
    clearInterval(interval);
    // childPopup.close();
    callback('error');
  }, 60000);

  var interval = setInterval(function () {
    try {
      getCodeFromRedirection();
    } catch (e) {
      console.log(e)
      // we're here when the childPopup window has been closed
      if (childPopup.closed) {
        clearInterval(interval);
        callback('error');
        clearTimeout(timeOutCallback);
      }
    }
  }, 500);

  function getCodeFromRedirection() {
    
    if (childPopup.document.domain === document.domain) {
      if (childPopup.document.readyState === "complete") {
        console.log(childPopup.document.URL.split('code=')[1])
        callback(childPopup.document.URL.split('code=')[1]);
        clearInterval(interval);
        // childPopup.close();
        clearTimeout(timeOutCallback);
      }
    }
    else {
      // this code should never be reached,
      // as the x-site security check throws
      // but just in case
      clearInterval(interval);
      // childPopup.close();
      callback('error');
      clearTimeout(timeOutCallback);
    }
  }
}
