//https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/applicationId?appNum=1-15149269
var sdLib = {};
var curURL = window.location.hostname; //"about:blank";
//var curURL = window.location.href; // надо проверить - текущий url страницы;

document.addEventListener("click", function (event) {
  if (curURL == "vsegdadacom.webim.ru") {
    getChatData();
    chrome.storage.local.set({sdLib: sdLib});
    console.log('In storage saved ', sdLib);
  }

  if (curURL == "loan.vsegda-da.com") {
    // Получем имя класса элемена, по которому произошло событие клик
    // let clickClass = event.target.className;
    // console.log("classList contains lastApplicationStatus: ", event.target.classList.contains("lastApplicationStatus"));
    // Проверяем на соответствие требуемому классу
    if (event.target.classList.contains("lastApplicationStatus")) {
      // Получаем родителя 4 уровня объекта, по которому было событие клик, в котором хранится ID заявки
      let  divID= (((event.target.parentNode).parentNode).parentNode).parentNode;
      // Открываем заявку от имени УБЛ
      if (event.altKey) window.open(`https://loan.vsegda-da.com/application/${divID.id}/form`, '_blank')
      // Открываем заявку от имени клиента
      else if (event.ctrlKey) window.open(`https://application.vsegda-da.com/application/${divID.id}/remote-registration`, '_blank')
      // Анализируем данные по заявке
      else {
        // Необходимо установить расширение в Хром 
        // https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
        console.log(divID.id);

        // Работает - открывает нужную ссылку в новом окне
        let url = `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}`;
        window.open(url, '_blank');
        

        jQuery(document).ready(function () {
          const url = `http://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}`;
          $.ajax({
            url,
            success: function (users) {
              console.log("Success", users);
            },
            error: function () {
              console.log("Error");
            },
            dataType: "jsonp",
            type: "get",
          });
        });

        // 
        // // Работает - получает коллекцию данных JSON
        // url = `https://gorest.co.in/public/v1/users`; //?callback=?
        // $.getJSON(url, function(result) {
        //   console.log("1. Request ur: ", url);
        //   console.log('1. Checkout this JSON! ', result);
        // });
        
        // Работает - получает коллекцию данных JSON
        
        // $.ajax({
        //   url: `http://testlodtask20172.azurewebsites.net/task/qyfgqiyhwfoq1`, 
        //   dataType: "jsonp",
        //   success: function (data) {
        //     // обрабатываем данные
        //     console.log("3. Request ur: ", url);
        //     console.log('3. Checkout this JSON! ', data);
        //   }
        // });

        // $.get(
        //   'https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}',
        //   function (response) {
        //       console.log("2.> ", response);
        //       $("#viewer").html(response);
        //   }
        // );        

        // $.ajaxPrefilter( function (options) {
        //   if (options.crossDomain && jQuery.support.cors) {
        //     console.log("3. cross and support");
        //     var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        //     options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        //     console.log("3. options", options);
        //     //options.url = "http://cors.corsproxy.io/url=" + options.url;
        //   }
        // });
        
        // $.get(
        //     'omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}',
        //     function (response) {
        //         console.log("4.> ", response);
        //         $("#viewer").html(response);
        // });

        // // НЕ Работает
        // url = `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}`; //?callback=?
        // $.getJSON(url, function(result) {
        //   console.log("Request ur: ", url);
        //   console.log('Checkout this JSON! ', result);
        // });

        // // НЕ Работает с ?callback=? в конце запроса. Если я правильно понял обход проксирования
        // url = `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}?callback=?`; 
        // $.getJSON(url, function(result) {
        //   console.log("Request ur: ", url);
        //   console.log('Checkout this JSON! ', result);
        // });

        // // НЕ Работает
        // $.ajax({
        //   url: `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}`, 
        //   dataType: "jsonp",
        //   success: function (data) {
        //     // обрабатываем данные
        //     console.log('Checkout this JSON! ', data);
        //   }
        // });

        // // НЕ Работает с ?callback=? в конце запроса. Если я правильно понял обход проксирования
        // $.ajax({
        //   url: `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v2/applications/${divID.id}?callback=?`, 
        //   dataType: "jsonp",
        //   success: function (data) {
        //     // обрабатываем данные
        //     console.log("3. Request ur: ", url);
        //     console.log('3. Checkout this JSON! ', data);
        //   }
        // });

        // https://www.youtube.com/watch?v=PNtFSVU-YTI

        // var req = new XMLHttpRequest();
        // //https://application-view-front-api.vsegda-da.com/omay-application-view-front-api/v1/applications/a0f53d26-082c-4e49-b66e-9c8e76a0a138/info?sellerplaceId=64c280f4-8115-48b9-a841-218e4631cef3
        // // let url = `https://application-view-front-api.vsegda-da.com/omay-application-view-front-api/v1/applications/a0f53d26-082c-4e49-b66e-9c8e76a0a138/info?sellerplaceId=64c280f4-8115-48b9-a841-218e4631cef3`
        // let url = `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v1/applications/${divID.id}`;
        // //req.open('GET', document.location, false);
        // req.open('GET', url, false);
        // req.send(null);
        // var headers = req.getAllResponseHeaders().toLowerCase();
        // console.log(headers);
        // let url = `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v1/applications/${divID.id}`;
        // let jsonResponse = getOmayResponse(url);
        // console.log("Contents: ", jsonResponse);
        // window.open(url, '_blank');
        // url = `https://omay-application.prod.rancher-prod.vsegda.da/omay-application/v3/applications/${divID.id}`;
        // window.open(url, '_blank');
        // $.getJSON(url, function(data) {
        //   console.log('Checkout this JSON! ', date);
        //   // JSON result in `data` variable
        // });
      }
    // window.open(`https://application.vsegda-da.com/application/${appDiv.id}/remote-registration`, '_blank');
      
    }
  }
});

document.addEventListener("keydown", function (event) {
  if (curURL == "sd.vsegda-da.com" && event.code == "KeyV" && event.altKey) {
    // Получаем данные из локального хранилища
    chrome.storage.local.get(['sdLib'], result => {
      sdLib = result.sdLib;
      console.log("Get from storage to sdLib ", sdLib);
      // Заполняем поля формы сервисдеска
      fillSDForm();
    });
  }
});

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