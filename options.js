function saveOptions(e) {
  browser.storage.local.set({
    searchMethod: document.querySelector("#search-method").value,
    searchPattern: document.querySelector("#search-pattern").value,
    searchTag: document.querySelector("#search-tag").value,
    listSeparator: document.querySelector("#list-separator").value
  });
  e.preventDefault();
}

function restoreOptions() {
  let storageItem = browser.storage.local.get();
  storageItem.then((res) => {
    document.querySelector("#search-method").value = res.searchMethod || 'simple';
    document.querySelector("#search-pattern").value = res.searchPattern || 'mega.co.nz';
    document.querySelector("#search-tag").value = res.searchTag || 'a';
    document.querySelector("#list-separator").value = res.listSeparator || 'new-line';
  }, (err) => {
    //@TODO: Melhorar o tratamento de erros.
    console.error(err);
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#options-form').addEventListener('submit', saveOptions);