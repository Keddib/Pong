import { URL_42 as URL } from "/src/Components/Constants";

//
// open child windows that direct to 42 intra and get the code when user is
// redirected to our redirection callback that's it;

export default function oauthPopup(setCode) {

  var childPopup = window.open(
    URL,
    "_blank",
    "height=800,width=600"
  );

  const timeOutCallback = setTimeout(function timeOut() {
    clearInterval(interval);
    childPopup.close();
    setCode('error');
  }, 60000);

  var interval = setInterval(function () {
    console.log(childPopup.document)
    try {
      getCodeFromRedirection();
    } catch (e) {
      // we're here when the childPopup window has been closed
      if (childPopup.closed) {
        console.log('error 1');
        clearInterval(interval);
        setCode('error');
        clearTimeout(timeOutCallback);
      }
    }
  }, 500);

  function getCodeFromRedirection() {
    console.log(childPopup.document)
    if (childPopup.document.domain === document.domain) {
      if (childPopup.document.readyState === "complete") {
        setCode(childPopup.document.URL.split('=')[1]);
        clearInterval(interval);
        childPopup.close();
        clearTimeout(timeOutCallback);
      }
    }
    else {
      // this code should never be reached,
      // as the x-site security check throws
      // but just in case
      console.log('error 2');
      clearInterval(interval);
      childPopup.close();
      setCode('error');
      clearTimeout(timeOutCallback);
    }
  }
}
