let curUrl = window.location.hostname;
let loanUrl = "loan.vsegda-da.com";
let loanHost = "https://omay-loan-front.test02.rancher-test.vsegda.da/";
let appHost = "https://omay-application-site.test02.rancher-test.vsegda.da/";
const creationTypeSelfService = ['', ];

document.addEventListener("click", async function (event) {
    if (true) {//curURL == loanUrl) 
        event.addEventListener
        // Получаем имя класса элемена, по которому произошло событие клик
        // let clickClass = event.target.className;
        // console.log("classList contains lastApplicationStatus: ", event.target.classList.contains("lastApplicationStatus"));
        // Проверяем на соответствие требуемому классу
        const roleList = await new Promise((resolve) => {
            chrome.storage.local.get(['authorities'], result => resolve(result))
        });
        if (event.target.classList.contains("lastApplicationStatus") && roleList.authorities.includes('SERVICE_DESK')) {
            // Получаем родителя 4 уровня объекта, по которому было событие клик, в котором хранится ID заявки
            let divId = event.target.parentNode.parentNode.parentNode.parentNode;
            let creation = event.target.parentNode.parentNode.parentNode.childNodes[4].childNodes[0].childNodes[0].childNodes[1].innerHTML;
            //console.log(creation)
            //let divApp = (((((event.target.parentNode).parentNode).parentNode).parentNode).parentNode).parentNode;
            let divApp = (divId.parentNode).parentNode;
            let divStatus = (event.target.parentNode).parentNode;
            // console.log(divStatus);
            let divToDelete = document.querySelector('.div-status-icon');
            // console.log(divToDelete);
            if (divToDelete) divToDelete.remove();
            if (divApp.childNodes[1]) {
                let item = document.createElement("div");
                item.className = "div-status-icon";
                item.innerHTML = `
                    <div class="c1">
                            <div data-component="Icon" data-type="editClipboard" class="c1" style="height: 16px; width: 16px; position: relative; box-sizing: border-box; vertical-align: text-top; display: inline-block;">
                                <svg viewBox="0 0 20 20" focusable="false" class="c1">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83331 5.00001C5.37308 5.00001 4.99998 5.37311 4.99998 5.83334V15.8333C4.99998 16.2936 5.37308 16.6667 5.83331 16.6667H7.49998C7.96022 16.6667 8.33331 17.0398 8.33331 17.5C8.33331 17.9602 7.96022 18.3333 7.49998 18.3333H5.83331C4.4526 18.3333 3.33331 17.2141 3.33331 15.8333V5.83334C3.33331 4.45263 4.4526 3.33334 5.83331 3.33334H7.49998C7.96022 3.33334 8.33331 3.70644 8.33331 4.16668C8.33331 4.62691 7.96022 5.00001 7.49998 5.00001H5.83331ZM11.6666 4.16668C11.6666 3.70644 12.0397 3.33334 12.5 3.33334H14.1666C15.5474 3.33334 16.6666 4.45263 16.6666 5.83334V7.50001C16.6666 7.96025 16.2936 8.33334 15.8333 8.33334C15.3731 8.33334 15 7.96025 15 7.50001V5.83334C15 5.37311 14.6269 5.00001 14.1666 5.00001H12.5C12.0397 5.00001 11.6666 4.62691 11.6666 4.16668Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.25 9.16668C16.471 9.16668 16.683 9.25448 16.8393 9.41076L18.495 11.0665C18.8204 11.3919 18.8204 11.9196 18.495 12.245L13.4334 17.3066C13.2007 17.5393 12.9044 17.6979 12.5817 17.7624L10.7595 18.1269C10.4863 18.1815 10.2038 18.096 10.0068 17.899C9.80981 17.702 9.72429 17.4195 9.77893 17.1463L10.1434 15.3241C10.2079 15.0014 10.3665 14.7051 10.5992 14.4724L15.6607 9.41076C15.817 9.25448 16.029 9.16668 16.25 9.16668ZM16.25 11.1785L11.7777 15.6509L11.6584 16.2474L12.2549 16.1281L16.7272 11.6557L16.25 11.1785Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66669 4.16667C6.66669 2.78596 7.78598 1.66667 9.16669 1.66667H10.8334C12.2141 1.66667 13.3334 2.78596 13.3334 4.16667V5.83334C13.3334 6.29358 12.9603 6.66667 12.5 6.66667H7.50002C7.03978 6.66667 6.66669 6.29358 6.66669 5.83334V4.16667ZM9.16669 3.33334C8.70645 3.33334 8.33335 3.70643 8.33335 4.16667V5.00001H11.6667V4.16667C11.6667 3.70643 11.2936 3.33334 10.8334 3.33334H9.16669Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <a href="${loanHost}application/${divId.id}/form" target="_blank">УБЛ</a>
                            <div data-component="Icon" data-type="mobile" class="c1" style="height: 16px; width: 16px; position: relative; box-sizing: border-box; vertical-align: text-top; display: inline-block;">
                                <svg viewBox="0 0 20 20" focusable="false" class="c1">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 1.66667C14.714 1.66667 15.8333 2.78596 15.8333 4.16667V15.8333C15.8333 17.2141 14.714 18.3333 13.3333 18.3333H6.66666C5.28594 18.3333 4.16666 17.2141 4.16666 15.8333V4.16667C4.16666 2.78596 5.28594 1.66667 6.66666 1.66667H13.3333ZM13.3333 3.33334H6.66666C6.20642 3.33334 5.83332 3.70643 5.83332 4.16667V15.8333C5.83332 16.2936 6.20642 16.6667 6.66666 16.6667H13.3333C13.7936 16.6667 14.1667 16.2936 14.1667 15.8333V4.16667C14.1667 3.70643 13.7936 3.33334 13.3333 3.33334ZM9.99999 13.3333C10.4602 13.3333 10.8333 13.7064 10.8333 14.1667C10.8333 14.6269 10.4602 15 9.99999 15C9.53975 15 9.16666 14.6269 9.16666 14.1667C9.16666 13.7064 9.53975 13.3333 9.99999 13.3333Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <a href="${appHost}application/${divId.id}/remote-registration" target="_blank">Клиент</a>
                    </div>`;
                divStatus.append(item);
            }

            let target = divApp;
            // создаем экземпляр наблюдателя
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    console.log(mutation.type);
                });
            });

            // настраиваем наблюдатель
            var config = { attributes: true, childList: true, characterData: true }

            // передаем элемент и настройки в наблюдатель
            observer.observe(target, config);

            // // раз в секунду ищем элемент
            // let i = setInterval(function () {
            //     if (document.querySelector("#GridItem")) {
            //         // если нашли останавливаем таймер и вызываем алерт
            //         clearInterval(i);
            //         console.log("element found");
            //     }
            // }, 1000);
            // // while (divApp.childNodes[1] == undefined){};
            // if (divApp.childNodes[1]) {  //.getElementById(`application-table-expanded-${divId.id}`)
            //     console.log(divApp);
            //     console.log(divId);
            //     let divButton1 = divApp.childNodes[1];
            //     console.log(divButton1);
            //     let divButton2 = divApp.childNodes[1].childNodes[0];
            //     console.log(divButton2);
            //     let divButton3 = divApp.childNodes[1].childNodes[0].childNodes[1];
            //     console.log(divButton3);
            // let i = setInterval(function () {
            //     if (divApp.childNodes[1].childNodes[0].childNodes[1]) {
            //         // если нашли останавливаем таймер и вызываем алерт
            //         clearInterval(i);
            //         console.log("element found");
            //     }
            // }, 1000);
            // i = setInterval(function () {
            //     if (divApp.childNodes[1].childNodes[0].childNodes[1].childNodes[0]) {
            //         // если нашли останавливаем таймер и вызываем алерт
            //         clearInterval(i);
            //         console.log("element found");
            //     }
            // }, 1000);
            //     // while (divApp.childNodes[1].childNodes[0].childNodes[1].childNodes[0] == undefined){};
            // let divButton4 = divApp.childNodes[1].childNodes[0].childNodes[1].childNodes[0];
            // console.log(divButton4);
            // let divButton = divApp.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
            // console.log(divButton);
            // }
        }
    }
    // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // console.log(tab);


    // let statusAppBtn = document.querySelectorAll(".lastApplicationStatus");
    // console.log(statusAppBtn);
    // console.log("click logon button");
    // console.log(event);
    //console.log(statusAppBtn);

});

// document.querySelector(".lastApplicationStatus").addEventListener("click", async function (event) {
//     console.log(event);

// });

