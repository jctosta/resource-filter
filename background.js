function onError(err) {
  //@TODO: Melhorar o tratamento de erros.
  console.error(`Error: ${err}`);
}

function sendMessageToTabs(tabs) {

  browser.storage.local.get()
    .then((res) => {
      let searchMethod = res.searchMethod || 'simple';
      let searchPattern = res.searchPattern || 'mega.co.nz';
      let searchTag = res.searchTag || 'a';
      let attribute = 'href';
      switch (searchTag) {
        case 'a':
          attribute = 'href';
          break;
        case 'img':
          attribute = 'src';
          break;
        case 'audio':
          attribute = 'src';
          break;
        case 'video':
          attribute = 'src';
          break;
        case 'track':
          attribute = 'src';
          break;
        default:
          attribute = 'href';
          break;
      }
      let listSeparator = res.listSeparator || 'new-line';

      for(let tab of tabs) {
        browser.tabs.sendMessage(
          tab.id,
          {
            method: searchMethod,
            query: searchPattern,
            tag: searchTag,
            separator: listSeparator,
            attribute: attribute
          }
        ).then(response => {
    
          browser.notifications.create({
            "type": "basic",
            "iconUrl": browser.extension.getURL("icons/48.png"),
            "title": 'Quantidade de links encontrados!',
            "message": `Total de links encontrados: ${response.message.length}`
          });
        }).catch(onError);
      }
    })
    .catch(onError);
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
});