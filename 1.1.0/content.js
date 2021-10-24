var sdLib = {};
var curURL = window.location.hostname; //"about:blank";

document.addEventListener("click", function (event) {
  if (curURL == "vsegdadacom.webim.ru") {
    getChatData();
    chrome.storage.local.set({sdLib: sdLib});
    console.log('In storage saved ', sdLib);
  }

  if (event.altKey && curURL == "loan.vsegda-da.com") {
    var appDivClasses = getAppDivClasses();
    if (appDivClasses != null) {
      var appDivSelector = `[class="${appDivClasses}"]`;
      var appDiv = event.target.closest(appDivSelector);
      if (appDiv != null) window.open(url, '_blank');
    }
  }
});

document.addEventListener("keydown", function (event) {
  if (curURL == "sd.vsegda-da.com" && event.code == "KeyV" && event.altKey) {
    chrome.storage.local.get(['sdLib'], result => {
      sdLib = result.sdLib;
      console.log("Get from storage to sdLib ", sdLib);
      fillSDForm();
    });
  }
});

function getAppDivClasses() {
    var divs = document.getElementsByTagName("div");
    var re = /^[\dabcdef]{8}-[\dabcdef]{4}-[\dabcdef]{4}-[\dabcdef]{4}-[\dabcdef]{12}$/i;
    for (var theDiv in divs) {
        if (divs[theDiv].id != null && divs[theDiv].id.match(re)) {
            return divs[theDiv].className;
        }
    }
    return null;
}

function fillSDForm() {
  // Тема
  var input = document.getElementById('summary');
  if (input) {
    input.value = (sdLib['SellerPlaceHomerCode']) ? "ТТ " + sdLib['SellerPlaceHomerCode'] + " заявка " : "";
  };
  // Номер диалога Webim
  input = document.getElementById('customfield_10502');
  if (input) input.value = (sdLib['current_chat_id']) ? sdLib['current_chat_id'] : "нет";
  // Название СЕТИ (из loan, без лишних знаков и пробелов)
  // input = document.getElementById('customfield_10503')
  // if (input) input.value = sdLib[''];
  // Номер ТТ
  input = document.getElementById('customfield_10401');
  if (input) input.value = (sdLib['SellerPlaceHomerCode']) ? sdLib['SellerPlaceHomerCode'] : "нет";
  // Номер УБЛ
  input = document.getElementById('customfield_10125');
  if (input) input.value = (sdLib['UserHomerCode']) ? sdLib['UserHomerCode'] : "нет";
  // Номер заявки
  // input = document.getElementById('customfield_10130');
  // if (input) input.value = sdLib[''];
  // Контактный телефон заявителя
  input = document.getElementById('customfield_10129');
  if (input) input.value = (sdLib['visitor_phone']) ? sdLib['visitor_phone'] : "нет";
  // Описание
  input = document.getElementById('description');
  if (input) input.value = "\n\n\n" + 
    "[Информация о обратившемся]\n" + 
    "Имя: " + sdLib['visitor_name'] + "\n" +
    "Роль: " + sdLib['DefaultRole'] + "\n" +
    "Логин: " + sdLib['visitor_login'] + "\n" +
    "Электронная почта: " + sdLib['visitor_email'] + "\n" +
    "ID: " + sdLib['visitor_id'] + "\n" +
    "[Точка входа]\n" +
    "Местоположение: " + sdLib['visit_location'] + "\n" +
    "IP: " + sdLib['visit_ip_addr'] + "\n" +
    "ОС: " + sdLib['visit_platform'] + "\n" +
    "Браузер: " + sdLib['visit_browser'] + "\n" +
    "Точка входа: " + sdLib['visit_landing_page'];
}

function getChatData() {
  // Получаем скрытый документ
  const shadowRoot = document.getElementsByTagName('af-root');
  //console.log(shadowRoot[0]);
  // Полаем содержимое документа ифрайм из стрытого документа
  const iframe = $(shadowRoot[0].shadowRoot.querySelector('iframe').contentWindow.document);
  //Создаем библиотеку для хранения данных
  var sInfo = iframe.find("#current_chat_id").text();
  sdLib = {};
  //Добавляем в библиотеку
  sdLib["current_chat_id"] = sInfo
  //Ищем раздел блок class=current_chat и в этом блоке ищем блок class=message_text - в нем хранится информация текущего диалога и создаем массив, в который помещаем текст разделенный по признаку переноса строки
  const curChat = iframe.find(".current_chat .message_text").html().split("<br>");
  //Добавляем в библиотеку 
  for (let item of curChat) {
      const sTemp = item.split(": ");
      //console.log(sTemp)
        if (sTemp[0] === "DefaultRole" || sTemp[0] === "UserHomerCode" || sTemp[0] === "SellerPlaceHomerCode")
          sdLib[sTemp[0]] = sTemp[1];
  };
  console.log("current_chat ", sdLib)

  //Получаем данные из раздела "Информация о посетителе"
  //Ищем раздел текста ID=
  sInfo = iframe.find("#visitor_name").text();
  //Добавляем в библиотеку
  sdLib["visitor_name"] = sInfo;
  //Ищем раздел текста ID=visitor_email
  sInfo = iframe.find("#visitor_email").text();
  //Добавляем в библиотеку
  sdLib["visitor_email"] = sInfo;
  //Ищем раздел текста ID=visitor_phone
  sInfo = iframe.find("#visitor_phone").text();
  //Добавляем в библиотеку
  sdLib["visitor_phone"] = sInfo;
  //Ищем раздел текста ID=visitor_login
  sInfo = iframe.find("#visitor_login").text();
  //Добавляем в библиотеку
  sdLib["visitor_login"] = sInfo;
  //Ищем раздел текста ID=visitor_id
  sInfo = iframe.find("#visitor_id").text();
  //Добавляем в библиотеку
  sdLib["visitor_id"] = sInfo;

  //Получаем данные из раздела "Точка входа"
  //Ищем раздел текста ID=visit_location
  sInfo = iframe.find("#visit_location").text();
  //Добавляем в библиотеку
  sdLib["visit_location"] = sInfo;
  //Ищем раздел текста ID=visit_ip_addr
  sInfo = iframe.find("#visit_ip_addr").text();
  //Добавляем в библиотеку
  sdLib["visit_ip_addr"] = sInfo;
  //Ищем раздел текста ID=visit_platform
  sInfo = iframe.find("#visit_platform").text();
  //Добавляем в библиотеку
  sdLib["visit_platform"] = sInfo;
  //Ищем раздел текста ID=visit_browser
  sInfo = iframe.find("#visit_browser").text();
  //Добавляем в библиотеку
  sdLib["visit_browser"] = sInfo;
  //Ищем раздел текста ID=visit_landing_page
  sInfo = iframe.find("#visit_landing_page").text();
  //Добавляем в библиотеку
  sdLib["visit_landing_page"] = sInfo;
  //visitor_name
  console.log(sdLib);

  return null;
}