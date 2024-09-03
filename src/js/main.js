import '../scss/index.scss';

import { AppData } from './modules/app_data';
import { meteoDescriptionObj } from './modules/weather_description';
import { renderDayCards } from './modules/_day_cards_render';
import { renderAllDaysHourly } from './modules/_days_hourly_render';
import devKeys from './modules/devKeys';

// ====== CONST for search pop-up window interaction ======>
const modalSearchWindow = document.querySelector('.search-popup');
const modalOpenBtn = document.querySelector('#modal-open-btn');
const modalCloseBtn = document.querySelector('#modal-close-btn');
// ====== CONST for forms interaction ======>
const geoRequestForm = document.querySelector('#location-search-form');
const geoSearchInput = document.querySelector('#location-name-search');
const geoResultList = document.querySelector('#search-result-list');
const meteoRequestForm = document.querySelector('#get-weather-form');
// ====== CONST for data acquire and fields render ======>
const sideBar = document.querySelector('aside');
const mainField = document.querySelector('main');
// ====== CONST for error pop-up window  ======>
const errorPopUp = document.querySelector('.error-popup');
const errorCloseBtn = document.querySelector('#error-close-btn');
// ====== CONST for loadind animation  ======>
const animMainLoading = document.querySelector('.loading-main');
const animPopupLoading = document.querySelector('.loading-popup');
//
let geoSearchResults; // to store geosearch results
let currentTimeId; // to reassign setInterval for "Current Time Render"

// ====== Pop-up Window Events ======>
modalOpenBtn.addEventListener('click', () => {
  modalOpenBtn.classList.remove('first-appearance');
  modalSearchWindow.showModal();
});

modalCloseBtn.addEventListener('click', () => {
  modalSearchWindow.close();
});

modalSearchWindow.addEventListener('click', (event) => {
  if (event.target === modalSearchWindow) modalSearchWindow.close();
});

errorCloseBtn.addEventListener('click', () => {
  errorPopUp.close();
});

errorPopUp.addEventListener('click', (event) => {
  if (event.target === errorPopUp) errorPopUp.close();
});

// ====== Check History GeoData and Weather Forcast Request ======>
if (localStorage.getItem('_pre')) {
  animMainLoading.classList.remove('hidden');
  const history = JSON.parse(localStorage.getItem('_pre'));
  meteoRequestAndRender(history, 'auto').then((id) => (currentTimeId = id));
} else {
  modalOpenBtn.classList.add('first-appearance');
}

// ====== Geolocation Request ======>
geoRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  animPopupLoading.classList.remove('hidden');
  geoRequestAndRender(geoSearchInput).then((res) => (geoSearchResults = res));
});

// ====== Weather Forcast Request ======>
meteoRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (geoResultList.selectedIndex !== -1) {
    animPopupLoading.classList.remove('hidden');
    const selected = geoSearchResults[geoResultList.selectedIndex];
    clearInterval(currentTimeId);
    meteoRequestAndRender(selected, 'user').then((id) => (currentTimeId = id));
  }
});

// ====== Day Forcast Selection ======>
// 1. By mouse click
sideBar.addEventListener('click', (event) => {
  let node = event.target.closest('.card');
  if (node) {
    let previous = sideBar.querySelector('.card_active');
    let preIndex = previous.dataset.dayNum;
    let newIndex = node.dataset.dayNum;
    if (preIndex !== newIndex) {
      previous.classList.remove('card_active');
      node.classList.add('card_active');
      mainField.children[preIndex].classList.add('hidden');
      mainField.children[newIndex].classList.remove('hidden');
    }
  }
});
// 2. By arrow and num keys
const regex = /([1-7])|(^Arrow)/;
window.addEventListener('keyup', (event) => {
  if (
    regex.test(event.key) &&
    !modalSearchWindow.open &&
    sideBar.children.length !== 0
  ) {
    const current = sideBar.querySelector('.card_active');
    const preIndex = Number(current.dataset.dayNum);
    let newIndex = preIndex;

    if (event.key === 'ArrowDown' && newIndex < 6) newIndex++;
    if (event.key === 'ArrowUp' && newIndex > 0) newIndex--;
    if (event.key === 'ArrowRight' && newIndex < 6) newIndex++;
    if (event.key === 'ArrowLeft' && newIndex > 0) newIndex--;
    if (Number(event.key) >= 1 && Number(event.key) <= 7) {
      newIndex = Number(event.key) - 1;
    }

    if (preIndex !== newIndex) {
      current.classList.remove('card_active');
      sideBar.children[newIndex].classList.add('card_active');
      mainField.children[preIndex].classList.add('hidden');
      mainField.children[newIndex].classList.remove('hidden');
    }
  }
});

// <<<<<<<< FUNCTIONS >>>>>>>>
async function controledFetch(url) {
  const timeout = 8000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal }).then(
    (data) => {
      return data.status === 200 ? data.json() : console.error();
    }
  );

  clearTimeout(timeoutId);

  return response;
}

async function geoRequestAndRender({ value }) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=50&language=ru&format=json`;

  return controledFetch(url)
    .then((geoData) => {
      const res = geoData?.results;
      renderGeoResults(res, geoResultList);
      return res;
    })
    .catch((err) => {
      errorHandler(err, 'geo');
    })
    .finally(() => {
      animPopupLoading.classList.add('hidden');
    });
}

async function meteoRequestAndRender(geoInfo, callingEventKey) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${geoInfo.latitude}&longitude=${geoInfo.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,&wind_speed_unit=ms&timezone=auto`;

  return controledFetch(url)
    .then((data) => {
      const meteoData = new AppData(data);
      renderDayCards(sideBar, meteoData, meteoDescriptionObj);
      renderAllDaysHourly(mainField, meteoData, meteoDescriptionObj);
      const timeId = renderCurrentTime(mainField, meteoData);
      reRenderSearchBtn(modalOpenBtn, geoInfo);

      if (callingEventKey === 'user') {
        // Saving history to local storage
        localStorage.setItem('_pre', JSON.stringify(geoInfo));
      }

      return timeId;
    })
    .then((timeId) => {
      // Waiting for weather icons loading
      mainField.querySelector('img').onload = () => {
        callingEventKey === 'user'
          ? modalSearchWindow.close()
          : animMainLoading.classList.add('hidden');
      };

      return timeId;
    })
    .catch((err) => {
      errorHandler(err, 'meteo');
    })
    .finally(() => {
      let animationNode =
        callingEventKey === 'user' ? animPopupLoading : animMainLoading;
      animationNode.classList.add('hidden');
      modalSearchWindow.close();
    });
}

function renderCurrentTime(hourlyNode, appData) {
  const currentTime = hourlyNode.querySelector('#current-time');
  const timeId = setInterval(() => {
    let date = new Date();
    date.setHours(date.getUTCHours() + appData.utcOffset);
    currentTime.textContent = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Reload page after 00:00 in chosen location
    if (
      date.getHours() === 0 &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0
    ) {
      window.location.reload();
    }
  }, 1000);

  return timeId;
}

function reRenderSearchBtn(btnNode, { country_code, admin1, name }) {
  btnNode.innerHTML = `<i class="btn-icon"></i>
  <div class="btn-name">${admin1}, ${name}</div>`;
  btnNode.children[0].style.background = `url(./img/fi_rounded_svg/fi_${country_code}.svg)`;
}

function renderGeoResults(results, outputNode) {
  // Clear and activate fields
  outputNode.innerHTML = '';
  outputNode.removeAttribute('disabled');
  //
  if (results) {
    results.forEach((el) => {
      outputNode.append(new Option(`${el.country}, ${el.admin1}, ${el.name}`));
    });
  } else {
    outputNode.append(new Option('Нет совпадений'));
    outputNode.setAttribute('disabled', '');
  }
}

function errorHandler(err, errMsgKey) {
  const userErrorMsg = {
    geo: 'Geocoding Server request error',
    meteo: 'Weather forcast Server request error',
  };
  const message =
    err.name === 'AbortError'
      ? 'Server timeout error. Time limit exceeded'
      : userErrorMsg[errMsgKey];
  errorPopUp.querySelector('.message').innerHTML = message;
  errorPopUp.showModal();
}

// DEV KEYS FOR TESTING
devKeys(errorPopUp);
//
