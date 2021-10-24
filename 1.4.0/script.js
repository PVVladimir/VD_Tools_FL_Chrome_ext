
let doSomeAction = document.getElementById("doSomeAction");


doSomeAction.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: doAction,
  });
});

function doAction() {
  // Получаем скрытый документ
  const shadowRoot = document.getElementsByTagName('af-root');
  //console.log(shadowRoot[0]);
  // Полаем содержимое документа ифрайм из стрытого документа
  const iframe = $(shadowRoot[0].shadowRoot.querySelector('iframe').contentWindow.document);
  //Создаем библиотеку для хранения данных
  const sdLib = {};
  //Ищем раздел текста ID=current_chat_id - в нем хранится номер текущего диалога
  var sInfo = iframe.find("#current_chat_id").text();
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
  sdLib["visitor_name"] = sInfo
  //Ищем раздел текста ID=visitor_email
  sInfo = iframe.find("#visitor_email").text();
  //Добавляем в библиотеку
  sdLib["visitor_email"] = sInfo
  //Ищем раздел текста ID=visitor_phone
  sInfo = iframe.find("#visitor_phone").text();
  //Добавляем в библиотеку
  sdLib["visitor_phone"] = sInfo
  //Ищем раздел текста ID=visitor_login
  sInfo = iframe.find("#visitor_login").text();
  //Добавляем в библиотеку
  sdLib["visitor_login"] = sInfo
  //Ищем раздел текста ID=visitor_id
  sInfo = iframe.find("#visitor_id").text();
  //Добавляем в библиотеку
  sdLib["visitor_id"] = sInfo

  //Получаем данные из раздела "Точка входа"
  //Ищем раздел текста ID=visit_location
  sInfo = iframe.find("#visit_location").text();
  //Добавляем в библиотеку
  sdLib["visit_location"] = sInfo
  //Ищем раздел текста ID=visit_ip_addr
  sInfo = iframe.find("#visit_ip_addr").text();
  //Добавляем в библиотеку
  sdLib["visit_ip_addr"] = sInfo
  //Ищем раздел текста ID=visit_platform
  sInfo = iframe.find("#visit_platform").text();
  //Добавляем в библиотеку
  sdLib["visit_platform"] = sInfo
  //Ищем раздел текста ID=visit_browser
  sInfo = iframe.find("#visit_browser").text();
  //Добавляем в библиотеку
  sdLib["visit_browser"] = sInfo
  //Ищем раздел текста ID=visit_landing_page
  sInfo = iframe.find("#visit_landing_page").text();
  //Добавляем в библиотеку
  sdLib["visit_landing_page"] = sInfo
  // //Ищем раздел текста ID=
  // sInfo = iframe.find("#").text();
  // //Добавляем в библиотеку
  // sdLib[""] = sInfo
  // //Ищем раздел текста ID=
  // sInfo = iframe.find("#").text();
  // //Добавляем в библиотеку
  // sdLib[""] = sInfo

  //visitor_name
  console.log(sdLib);
}
