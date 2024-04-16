export function renderAllDaysHourly(parentNode, appData, weatherObj) {
  // Clear field
  parentNode.innerHTML = '';

  // First appearance - static time
  const date = new Date();
  date.setHours(date.getUTCHours() + appData.utcOffset);
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  for (let i = 0; i < 7; i++) {
    let hiddenClass = i === 0 ? '' : ' hidden';
    // Create 7 containers (only one is visible)
    let container = document.createElement('div');
    container.className = `day-hourly-container${hiddenClass}`;

    // preRender day info-header
    let headSectionHTML = `
    <section class="day-info" aria-label="Выбранный день подробнее">
      <p class="day-info__day" aria-label="Текущий день недели">
        ${appData[i].dayLong}
      </p>
      <p class="day-info__date" aria-label="Дата выбранного дня">
        <i class="_wi-cal-days icon_color"></i>
        ${appData[i].dateLong}
      </p>
      <p class="day-info__current-time${hiddenClass}" aria-label="Текущее время сегодня">
        <i class="_wi-clock icon_color"></i>Текущее время:&ensp;
        <time id="current-time">${time}</time>
      </p>
    </section>
    `;

    // preRender hourly meteo data
    let hourlyData = appData[i].hourly;
    let hoursStr = hourlyData.hours;
    let hourlySectionHTML = '';

    for (let i = 0; i < 6; i++) {
      let weatherCode = hourlyData.weatherCode[i];
      let iconUrl =
        weatherCode <= 2 && appData[i].hourly.sunTag[i] === 'night'
          ? weatherObj[weatherCode].iconPathNight
          : weatherObj[weatherCode].iconPath;

      hourlySectionHTML += `
      <section class="hourly-weather" aria-label="Погода в ${hoursStr[i]}:00">
        <label class="hourly-weather__time" aria-label="Погода в указанный час">${hoursStr[i]}</label>
        <div class="hourly-weather__icon" aria-label="Иконка погодных условий и температура">
          <img src="${iconUrl}" alt="${weatherObj[weatherCode].description}" />
          <p class="hourly-weather__temp-value">${hourlyData.temperature[i]}&degC</p>
        </div>
        <table aria-label="Таблица параметров в указанный час">
          <caption aria-label="Описание погодных условий">${weatherObj[weatherCode].description}</caption>
          <tbody>
            <tr>
                <td class="_wi-temp-half"></td>
                <td>Ощущается</td>
                <td>${hourlyData.apparentTemperature[i]}</td>
                <td>&degC</td>
            </tr>
            <tr>
                <td class="_wi-arrow-down"></td>
                <td>Давление</td>
                <td>${hourlyData.pressure[i]}</td>
                <td>mmHg</td>
            </tr>
            <tr>
                <td class="_wi-wind"></td>
                <td>Ветер</td>
                <td>${hourlyData.windSpeed[i]}</td>
                <td>м/с</td>
            </tr>
            <tr>
                <td class="_wi-tornado"></td>
                <td>Порывы</td>
                <td>${hourlyData.windGusts[i]}</td>
                <td>м/с</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-compass"></td>
                <td>Направление</td>
                <td class="dir-data" colspan="2">${hourlyData.windDirection[i]}</td>            
            </tr>
            <tr>
                <td class="_wi-droplet"></td>
                <td>Влажность</td>
                <td>${hourlyData.humidity[i]}</td>
                <td>%</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-umbrella"></td>
                <td>Осадки</td>
                <td>${hourlyData.precipitation[i]}</td>
                <td>мм</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-cloud"></td>
                <td>Облачность</td>
                <td>${hourlyData.cloudCover[i]}</td>
                <td>%</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-eye"></td>
                <td>Видимость</td>
                <td>${hourlyData.visibility[i]}</td>
                <td>км</td>
            </tr>
          </tbody>
        </table>
      </section>`;
    }

    container.innerHTML = headSectionHTML + hourlySectionHTML;

    parentNode.append(container);
  }
}
