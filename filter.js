function copyTextToClipboard(text) {
  let tempText = document.createElement("textarea");
  document.querySelector("body").appendChild(tempText);
  tempText.style.whiteSpace = 'pre-wrap';
  tempText.innerText = text;
  tempText.select();
  document.execCommand("Copy");
  //tempText.style.display = 'none';
}


browser.runtime.onMessage.addListener(message => {
  if (message.method === 'simple') {
    let links = Array.from(document.querySelectorAll(message.tag))
      .filter((el) => {
        return (el.getAttribute(message.attribute) !== null && el.getAttribute(message.attribute).indexOf(message.query) >= 0);
      })
      .map((el) => el.getAttribute(message.attribute));

      copyTextToClipboard(links.join('\r\n'));

    return Promise.resolve({
      message: links
    });
  } else {
    let links = Array.from(document.querySelectorAll(message.tag))
      .filter((el) => {
        return (el.getAttribute(message.attribute) !== null && el.getAttribute(message.attribute).match(new RegExp(message.query, 'g')) !== null);
      })
      .map((el) => el.getAttribute(message.attribute));

      copyTextToClipboard(links.join('\r\n'));

    return Promise.resolve({
      message: links
    });
  }
});
