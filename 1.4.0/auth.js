let logonBtn = document.getElementById("logon");
let clientInfo = {};

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content-script.js']
    });
  });

logonBtn.addEventListener("click", async () => {
    console.log("click logon button");

    console.log(document);
    clientInfo["clientId"] = document.getElementById("clientId").value;
    clientInfo["password"] = document.getElementById("password").value;
    clientInfo["rememberMe"] = document.getElementById("rememberMe").checked;
    console.log(clientInfo);
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
      // file: 'snowfall2020.js'
    });

    // if (rememberMe) {
    //     chrome.storage.local.set({clientInfo: clientInfo});
    //     //localStorage.setItem("client", client);
    //     //localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    //     chrome.storage.local.get(['clientInfo'], result => {
    //         let myStor = result.clientInfo;
    //         console.log(myStor);
    //     });
    // }



})