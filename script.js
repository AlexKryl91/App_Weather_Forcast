import { AppData } from './modules/app_data.js';
import { wmoData } from './modules/weather_description.js';
import { renderDayCards } from './modules/_day_cards_render.js';
import { renderDayHourly } from './modules/_day_hourly_render.js';

// ====== CONST for search pop-up window interaction ======>
const modalSearchWindow = document.querySelector('.search-popup');
const modalOpenBtn = document.querySelector('#modal-open-btn');
const modalCloseBtn = document.querySelector('#modal-close-btn');
// ====== CONST for forms interaction ======>
const geoRequestForm = document.querySelector('#location-search-form');
const geoSearchInput = document.querySelector('#location-name-search');
const geoResultList = document.querySelector('#search-result-list');
const weatherRequestForm = document.querySelector('#get-weather-form');
// ====== CONST for data acquire and fields render ======>
const daysBar = document.querySelector('aside');
const dayHourly = document.querySelector('main');
// ====== CONST for error pop-up window  ======>
const errorPopUp = document.querySelector('.error-popup');
const errorCloseBtn = document.querySelector('#error-close-btn');
// ====== CONST for loadind animation  ======>
const animMainLoading = document.querySelector('.loading-main');
const animPopupLoading = document.querySelector('.loading-popup');
//
let searchResults; // to store geosearch results
let mainData; // to store processed weather data
let previousTimeId; // to erase previous setInterval

// ====== Pop-up Window Events ======>
modalOpenBtn.addEventListener('click', () => {
  modalOpenBtn.classList.remove('first-appearance');
  modalSearchWindow.showModal();
});

modalCloseBtn.addEventListener('click', () => {
  modalSearchWindow.close();
  // Clear fields
  searchResults = [];
  geoSearchInput.value = '';
  geoResultList.innerHTML = '';
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
if (localStorage.getItem('_pre') ?? false) {
  animMainLoading.classList.remove('hidden');
  const history = JSON.parse(localStorage.getItem('_pre'));
  weatherRequest(history.latitude, history.longitude)
    .then((data) => {
      mainData = new AppData(data);
      renderDayCards(daysBar, mainData, wmoData);
      renderDayHourly(0, dayHourly, mainData, wmoData);
      previousTimeId = renderCurrentTime(dayHourly, mainData, previousTimeId);
      reRenderSearchBtn(
        modalOpenBtn,
        history.country_code,
        history.region,
        history.name
      );
    })
    .then(() => {
      // Waiting for weather icons loading
      dayHourly.querySelector('img').onload = () => {
        animMainLoading.classList.add('hidden');
      };
    })
    .catch(() => {
      animMainLoading.classList.add('hidden');
      errorPopUp.querySelector('.message').innerHTML =
        'Weather forcast API server request error';
      errorPopUp.showModal();
    });
} else {
  animMainLoading.classList.add('hidden');
  modalOpenBtn.classList.add('first-appearance');
}

// ====== Geolocation Request ======>
geoRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  animPopupLoading.classList.remove('hidden');

  geoRequest(geoSearchInput.value)
    .then((geoData) => {
      searchResults = geoData?.results;
      renderGeoResults(searchResults, geoResultList);
      animPopupLoading.classList.add('hidden');
    })
    .catch((err) => {
      animPopupLoading.classList.add('hidden');
      const message =
        err.name === 'AbortError'
          ? 'Server timeout error. Time limit exceeded'
          : 'Geocoding API server request error';
      errorPopUp.querySelector('.message').innerHTML = message;
      errorPopUp.showModal();
    });
});

// ====== Weather Forcast Request ======>
weatherRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (geoResultList.selectedIndex !== -1) {
    animPopupLoading.classList.remove('hidden');

    const selected = searchResults[geoResultList.selectedIndex];

    weatherRequest(selected.latitude, selected.longitude)
      .then((data) => {
        mainData = new AppData(data);
        renderDayCards(daysBar, mainData, wmoData);
        renderDayHourly(0, dayHourly, mainData, wmoData);
        previousTimeId = renderCurrentTime(dayHourly, mainData, previousTimeId);
        reRenderSearchBtn(
          modalOpenBtn,
          selected.country_code,
          selected.admin1,
          selected.name
        );

        // Saving history to local storage
        localStorage.setItem(
          '_pre',
          JSON.stringify({
            country_code: selected.country_code,
            region: selected.admin1,
            name: selected.name,
            latitude: selected.latitude,
            longitude: selected.longitude,
          })
        );
      })
      .then(() => {
        // Waiting for weather icons loading
        dayHourly.querySelector('img').onload = () => {
          animPopupLoading.classList.add('hidden');
          modalSearchWindow.close();
          // Clear fields
          // geoSearchInput.value = '';
          // geoResultList.innerHTML = '';
        };
      })
      .catch((err) => {
        animPopupLoading.classList.add('hidden');
        const message =
          err.name === 'AbortError'
            ? 'Server timeout error. Time limit exceeded'
            : 'Weather forcast API server request error';
        errorPopUp.querySelector('.message').innerHTML = message;
        errorPopUp.showModal();
      });
  }
});

// ====== Day Forcast Selection ======>
// 1. By mouse click
daysBar.addEventListener('click', (event) => {
  let node = event.target.closest('.card');
  if (node) {
    let previous = daysBar.querySelector('.card_active');
    if (previous.dataset.dayNum !== node.dataset.dayNum) {
      previous.classList.remove('card_active');
      node.classList.add('card_active');
      renderDayHourly(node.dataset.dayNum, dayHourly, mainData, wmoData);
      renderCurrentTime(dayHourly, mainData);
    }
  }
});
// 2. By arrow and num keys
const regex = /[1-7]|Arrow+/g;
window.addEventListener('keyup', (event) => {
  if (
    regex.test(event.key) &&
    !modalSearchWindow.open &&
    daysBar.children.length !== 0
  ) {
    const current = daysBar.querySelector('.card_active');
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
      daysBar.children[newIndex].classList.add('card_active');
      renderDayHourly(newIndex, dayHourly, mainData, wmoData);
      previousTimeId = renderCurrentTime(dayHourly, mainData, previousTimeId);
    }
  }
});

// <<<<<<<< FUNCTIONS >>>>>>>>
async function geoRequest(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=50&language=ru&format=json`;

  const timeout = 8000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal }).then(
    (data) => {
      return data.status === 200
        ? data.json()
        : Error('Geocoding API server request error');
    }
  );

  clearTimeout(timeoutId);

  return response;
}

async function weatherRequest(latVal, longVal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latVal}&longitude=${longVal}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,&wind_speed_unit=ms&timezone=auto`;

  const timeout = 8000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal }).then(
    (data) => {
      return data.status === 200
        ? data.json()
        : Error('Weather forcast API server request error');
    }
  );

  clearTimeout(timeoutId);

  return response;
}

function renderCurrentTime(hourlyNode, appData, timeId) {
  clearInterval(timeId);

  const currentTime = hourlyNode.querySelector('#current-time');

  const currentTimeId = setInterval(() => {
    let date = new Date();
    date.setHours(date.getUTCHours() + appData.utcOffset);
    currentTime.innerHTML = date.toLocaleTimeString('ru-RU', {
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

  return currentTimeId;
}

function reRenderSearchBtn(btnNode, countryCode, region, name) {
  btnNode.innerHTML = `<i class="btn-icon"></i>
  <div class="btn-name">${region}, ${name}</div>`;
  btnNode.setAttribute('title', region, name);
  btnNode.children[0].style.background = `url(./img/fi_rounded_svg/fi_${countryCode}.svg)`;
}

function renderGeoResults(results, outputNode) {
  // Clear and activate fields
  outputNode.innerHTML = '';
  outputNode.removeAttribute('disabled');
  //
  if (results) {
    results.forEach((el, i) => {
      let option = document.createElement('option');
      option.setAttribute('value', i);
      option.innerHTML = `${el.country}, ${el.admin1}, ${el.name}`;
      outputNode.append(option);
    });
  } else {
    let option = document.createElement('option');
    option.textContent = 'Нет совпадений';
    outputNode.append(option);
    outputNode.setAttribute('disabled', '');
  }
}

// FIRST START TESTING => LocalStorage Erase
// window.addEventListener('keydown', (event) => {
//   if (event.key === 'e') {
//     localStorage.clear();
//   }
// });

// window.addEventListener('keydown', (event) => {
//   if (event.key === 'r') {
//     const message = 'Test error';
//     errorPopUp.querySelector('.message').innerHTML = message;
//     errorPopUp.showModal();
//   }
// });
