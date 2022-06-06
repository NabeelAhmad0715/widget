var IFRAME_ID = 'injectWidget';
var TOOLTIP_STATE_KEY = '__prisme_tooltip';
var toggle = false;
var chatUrl = 'http://localhost:3000';
var displayTooltip = async (iframeWidget) => {
  var modalPopup = document.createElement('iframe');
  modalPopup.setAttribute('id', 'message-frame');
  modalPopup.setAttribute('name', 'modal');
  modalPopup.width = '360';
  modalPopup.height = '180';
  modalPopup.sandbox =
    '';
  modalPopup.frameBorder = 0;
  modalPopup.style =
    'right: 20px !important;\nbottom: 100px;\nposition: fixed !important; \n z-index: 99999999999 !important; \n inset: auto 14px 66px auto !important; \n margin:auto !important';
  modalPopup.allowFullscreen = true;
  var iframeButton = document.createElement('iframe');
  var image = document.createElement('img');
  iframeButton.setAttribute('id', 'widget');
  iframeButton.setAttribute('name', 'button');
  iframeButton.width = '68';
  iframeButton.height = '68';
  iframeButton.sandbox =
    '';
  iframeButton.frameBorder = 0;
  iframeButton.style =
    'position: fixed !important; \n z-index: 99999999999 !important; \n inset: auto 10px 0px auto !important; \n margin:auto !important';
  iframeButton.allowFullscreen = true;
  var src = `${chatUrl}/static/media/invocom-log.734c4bdf.png`;
  var image = document.createElement('img');
  image.id = 'widgetIcon';
  image.setAttribute('style', 'width:60px;height:60px;cursor:pointer;background: white;border-radius: 53%');
  image.src = src;
  image.onclick = widget;
  document.body.appendChild(iframeWidget);
  async function widget() {
    if (iframeWidget.getAttribute('toggle') === 'true') {
      image.setAttribute(
        'src',
        `${chatUrl}/static/media/invocom-log.734c4bdf.png`
      );
      image.setAttribute('id', 'logo-icon');
      iframeWidget.setAttribute('toggle', false);
      iframeWidget.setAttribute('height', '0');
      iframeWidget.setAttribute('class', 'd-none');
      // iframeWidget.remove();
    } else {
      modalPopup.remove();
      setTimeout(function () {
        modalPopup.remove();
      }, 15000)
      image.setAttribute('src', `${chatUrl}/cross-icon.png`);
      image.setAttribute('id', 'cross-icon');
      iframeWidget.setAttribute('class', 'd-block');
      iframeWidget.setAttribute('height', '690');
      iframeWidget.setAttribute('toggle', true);
    }
  }
  iframeButton.addEventListener(
    'load',
    function (e) {
      iframeButton.contentDocument.body.appendChild(image);
      iframeButton.contentDocument.body.style = 'margin:auto !important;';
    },
    false
  );
  document.body.appendChild(iframeButton);
  
  window.localStorage.setItem('modalMessage', true);
  modalPopup.addEventListener(
    'load',
    function (e) {
      
      modalPopup.contentDocument.body.innerHTML += `
          <div style="width: 100%;height:100%">
          <div style="display:flex">
              <div style="box-shadow: 0 5px 12px rgb(0 0 0 / 18%);width: calc(100% - 3.3rem);
              margin-left: auto;
              border: 1px solid #f7f7f9;
              background-color: #fff;    padding: 1rem;border-radius:5px;position:absolute;bottom:15;">
              <div role="button" tabindex="0" data-text="Chat attention grabber" aria-label="Chat attention grabber" style="display:flex; margin-bottom:10px;align-items: center;">
              <div style="border: 1px solid white;
              background: white;
              border-radius: 50%;
              ">
              <img src='${chatUrl}/modalLogo2.svg' alt="Avatar" style="width:60px;height:60px;">
              </div>
                <img src='${chatUrl}/cross.svg' alt='X' id="closeButton" style="height: 15px;width: 15px;border-radius: 50%;display: -ms-flexbox;display: flex;-ms-flex-align: center;align-items: center;-ms-flex-pack: center;justify-content: center;text-align: center;margin-top: 0px;margin-bottom: 4px;margin-left: auto;padding: 0;background-color: #f7f7f9;border: 1px solid #fff;" />
              </div>
                <div style="padding-bottom: 10px;line-height: 20px;">
                  <span class="" style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,sans-serif;">Welcome to invocom! Feel free to send us a message if you have any questions, we're available 24x7.</span>
              </div>
              <div style="display:flex;color: #92929e!important;font-size: .812rem;">                
              </div>
            </div>
          </div>
        </div>`;
    },
    false
  );

  async function modalClose() {
    localStorage.setItem('modalMessage', false);
    modalPopup.remove();
  }

  setTimeout(function () {
    document.body.appendChild(modalPopup);
  }, 15000);

  setTimeout(function () {
    document.getElementById('message-frame').contentWindow.document.getElementById('closeButton').addEventListener('click', modalClose, false);
  }, 16000);

};
var injectWidget = async (opts) => {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', opts.id ? opts.id : IFRAME_ID);
  iframe.setAttribute('name', 'chat');
  iframe.setAttribute('title', 'Invocom');
  iframe.setAttribute('toggle', toggle);
  iframe.setAttribute('allow', 'microphone');
  iframe.setAttribute('class', 'd-none');
  iframe.sandbox = '';
  iframe.src = chatUrl;
  iframe.width = opts.width ? opts.width : '350';
  iframe.height = opts.height ? opts.height : '690';
  iframe.style =
    'position: fixed !important; \nz-index: 1000001 !important; \ninset: auto 0px 17px auto !important;\n';
  iframe.frameBorder = 0;
  iframe.allowFullscreen = true;
  try {
    const baseUrl = opts.API_BASE_URL;
    const entity = 'entity';
    const response = await fetch(`${baseUrl}/${entity}/search/url`, {
      method: 'POST',
      body: JSON.stringify({
        url: opts.APP_URL,
        token: opts.APP_ID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('entityId', data.entity);
      displayTooltip(iframe);
    }
  } catch (error) {
    console.log(error);
  }
};
window.injectWidget = injectWidget;