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

  console.log("Get data");
  console.log(clientInfo);

  if (rememberMe) {
    chrome.storage.local.set({ clientInfo: clientInfo });
    // chrome.storage.local.get(['clientInfo'], result => {
    //     let myStor = result.clientInfo;

    //     console.log("Read from store to myStor");
    //     console.log(myStor);
    // });
  }

  if (clientInfo["clientId"] != "" && clientInfo["password"] != "") {
    let url = "http://omay-authentication.prod.rancher-prod.vsegda.da/oauth/token?grant_type=client_credentials";
    let authBase64 = "Basic " + btoa(clientInfo["clientId"] + ":" + clientInfo["password"]);
    console.log("b64: " + authBase64);
    let response = fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authBase64        
      },
      body: ""
    });
    console.log("new code1");
    console.log((await response).json());
  } else {
    console.log("not ok");
  }

//https://loan.vsegda-da.com/#access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHByb3ZlZCI6dHJ1ZSwiY3VpZCI6IjVmN2M5MmQ2LWRmNzctNDhkMC05MGY0LThkYWVlMWY5Y2U3YiIsInNjb3BlIjpbImZyb250LXNldHRpbmdzLWFkbWluIiwiYXV0aCIsImZyb250LXNldHRpbmdzIiwic2V0dGluZ19tYW5hZ2VtZW50IiwiZG9jLWFwaSIsIi9vbWF5LW9yZGVyLXJvdXRlci92MSIsInByaW50LXNlcnZlciIsInNpZWJlbCIsImRvYy1yZXAiLCJldmVudCIsInNlcSIsImRyYWZ0IiwicmVmcmVzaCIsInNtcyIsImFjY291bnQiLCJtYWlsIiwicmVmIiwicHJvbW8iLCJhY2NvdW50aW5nIiwic3RhdCIsImNsaWVudC12aWV3LWRvY3MiLCJjdXMiLCJsay1hcGkiLCJzMyIsInNldHRpbmdzIiwic2FwIiwiYWNjcmVkIiwiY2hhbmdlX3Bhc3N3b3JkIiwiYXBwLXZpZXctYXBpIiwicndyZCIsInJlcC1kYXRhIiwibG9hbi1hcGkiLCJjYy1hZGFwdGVyIiwiL29tYXktYXBwbGljYXRpb24tdmlldy1mcm9udC1hcGkvdjEiLCJyY2duIiwicHJvZC1jYXQiLCJvbWF5LWFjY291bnQvdjEiLCJjYXJkLWFwaSIsImFkbWluLWFwaSIsImVucmljaCIsImFwcC1hcGkiLCIvYWRtaW4tZnJvbnQtYXBpL3YxIiwic2V0dGluZ19wYXJhbV9tYW5hZ2VtZW50IiwiY29ucy1zdXAiLCJhdXRoX2VkaXQiLCIvb21heS1jdXN0b21lci92MSIsIi9vbWF5LWF1dGhvcml6YXRpb24vdjEiLCIvb21heS1wcm9kdWN0LWNhdGFsb2cvdjEvcHJpdmF0ZSIsIi9vbWF5LXNlcXVlbmNlL3YxIiwiL29tYXktcHJvZHVjdC1jYXRhbG9nL3YxIiwiL29tYXktYWNjb3VudC92MSIsIi9vbWF5LXByb2R1Y3QtY2F0YWxvZy92MiIsIi9vbWF5LXMzLXN0b3JhZ2UvIiwiY2xpZW50LXZpZXctYXBpIiwiY2xvYy1zdXAiLCJwcmludGluZy1mb3JtIiwiYSIsImFkbS1hdWRpdCIsImFhIiwicXVpeiIsInBvLXBhIiwib3Blbi1hcGktYXBwIiwibGstYXBwLWFwaSIsIm5ld3MiXSwiZXhwIjoxNjY4MDYzNjIyLCJhdXRob3JpdGllcyI6WyJQQVJUTkVSX0ZyYW5jaGlzZSIsIktTIiwiUEFSVE5FUl9WRCIsIlNFUlZJQ0VfREVTS18yTCIsIlBhcnRuZXJfU0FQIiwiUEFSVE5FUl9TRUxMRVIiLCJQQVJUTkVSX0lOVEVSTkVUIiwiU0VUVElOR1NfQURNSU4iLCJTRVJWSUNFX0RFU0siLCJORVdTX0NSRUFUT1IiLCJLU19MSVRFIiwiUEFSVE5FUl9BRE1JTiIsIlJPTEVfTUFOQUdFUiIsIlZEX1N1cGVyIiwiVEVDSF9TRUxMRVIiLCJTRVRUSU5HU19FRElUT1IiXSwianRpIjoiMDg0MWZhNTgtNGE3Yi00YmE4LWE3ODAtYzEyMWYwYTA3ZmViIiwiY2xpZW50X2lkIjoiOTE0ODE3MTA5MCJ9.pmdRPeACneLFkwQELjN4LF-xLMGAiHx5ISYvTh_psXkQrCTuia5gs9O6NiRTZ63gcAsZQXT8b6Xiy5DAx5bazbZm7SxPYBaiS1lmbldEUhXsxDZR2Hm76eOrYmfoPdqPlMuxzvfvP1ZrulunyEomTgkoaP_YcC57K2g726JRWhPC6AeT5_qR5WRHA-2IlBaFXHLxyVq6lbDkTgWHI1OoxiideThNTU2r5uppk3OIsUKpcBh_rQWAAWGsPIKdwvThZ0Uwcv80JOq-3pAO5Fx2ZeIVgh_sE-BC4N3p6BmUoBEWZ7LqxEXFzH8caEZqHXLmcQMAMR6FOYADnV4y62ii-g&token_type=bearer&expires_in=43199&scope=front-settings-admin%20auth%20front-settings%20setting_management%20doc-api%20%2Fomay-order-router%2Fv1%20print-server%20siebel%20doc-rep%20event%20seq%20draft%20refresh%20sms%20account%20mail%20ref%20promo%20accounting%20stat%20client-view-docs%20cus%20lk-api%20s3%20settings%20sap%20accred%20change_password%20app-view-api%20rwrd%20rep-data%20loan-api%20cc-adapter%20%2Fomay-application-view-front-api%2Fv1%20rcgn%20prod-cat%20omay-account%2Fv1%20card-api%20admin-api%20enrich%20app-api%20%2Fadmin-front-api%2Fv1%20setting_param_management%20cons-sup%20auth_edit%20%2Fomay-customer%2Fv1%20%2Fomay-authorization%2Fv1%20%2Fomay-product-catalog%2Fv1%2Fprivate%20%2Fomay-sequence%2Fv1%20%2Fomay-product-catalog%2Fv1%20%2Fomay-account%2Fv1%20%2Fomay-product-catalog%2Fv2%20%2Fomay-s3-storage%2F%20client-view-api%20cloc-sup%20printing-form%20a%20adm-audit%20aa%20quiz%20po-pa%20open-api-app%20lk-app-api%20news&cuid=5f7c92d6-df77-48d0-90f4-8daee1f9ce7b&approved=true&need_change_secret=&jti=0841fa58-4a7b-4ba8-a780-c121f0a07feb&expired_secret_date=2024-09-01&authorities%5B0%5D=PARTNER_Franchise&authorities%5B1%5D=KS&authorities%5B2%5D=PARTNER_VD&authorities%5B3%5D=SERVICE_DESK_2L&authorities%5B4%5D=Partner_SAP&authorities%5B5%5D=PARTNER_SELLER&authorities%5B6%5D=PARTNER_INTERNET&authorities%5B7%5D=SETTINGS_ADMIN&authorities%5B8%5D=SERVICE_DESK&authorities%5B9%5D=NEWS_CREATOR&authorities%5B10%5D=KS_LITE&authorities%5B11%5D=PARTNER_ADMIN&authorities%5B12%5D=ROLE_MANAGER&authorities%5B13%5D=VD_Super&authorities%5B14%5D=TECH_SELLER&authorities%5B15%5D=SETTINGS_EDITOR&state=32abe22b-e2c8-433a-b40f-15d3a72516fd

//   fetch(url, {method:'GET',
//   headers: headers,
//   //credentials: 'user:passwd'
//  })
// .then(response => response.json())
// .then(json => console.log(json));
  // Authentication: authBase64,
  // 'Content-Type': 'application/json;charset=utf-8'
//  'Postman-Token': 'd4ca49f1-2d94-462e-b52d-21e1e0e714b2',
//'User-Agent': 'PostmanRuntime/7.29.2',
// Accept: '*/*',
// 'Accept-Encoding': 'gzip, deflate, br',
// Connection: 'keep-alive',
// 'Content-Length': 0
//Host: 'omay-authentication.prod.rancher-prod.vsegda.da'

})