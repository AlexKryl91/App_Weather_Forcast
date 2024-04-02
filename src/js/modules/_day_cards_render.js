export function renderDayCards(parentNode, appData, weatherObj) {
  // Clear bar
  parentNode.innerHTML = '';

  // Render 7-day cards
  for (let i = 0; i < 7; i++) {
    let div = document.createElement('div');
    div.className = i === 0 ? 'card card_active' : 'card';
    div.dataset.dayNum = i;
    div.setAttribute('role', 'button');
    div.setAttribute(
      'aria-label',
      'Нажмите, чтобы посмотреть погоду подробнее'
    );

    let daySName =
      i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : appData[i].dayShort;
    let dayLName =
      i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : appData[i].dayLong;

    div.innerHTML = `
  <div class="card__day-of-week compact" area-label="День недели">${daySName}</div>
  <div class="card__day-of-week full" area-label="День недели">${dayLName}</div>
  <div class="card__date" area-label="Дата">${appData[i].dateShort}</div>
  <div class="card__weather-icon" area-label="${
    weatherObj[appData[i].weatherCode].description
  }"></div>
  <div class="card__temp compact" area-label="Температура">${
    appData[i].maxTemperature
  }&degC</div>
  <div class="card__temp full" area-label="Температура">${
    appData[i].minTemperature
  }&degC ... ${appData[i].maxTemperature}&degC</div>`;
    //
    parentNode.append(div);
    //
    div.children[3].style.backgroundImage = `url(./img/wi_code_svg/wi_code${appData[i].weatherCode}.svg)`;
  }
}
