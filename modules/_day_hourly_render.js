export function renderDayHourly(num, parentNode, appData, weatherObj) {
  // Clear field
  parentNode.innerHTML = '';

  // First appearance - static time
  const date = new Date();
  date.setHours(date.getUTCHours() + appData.utcOffset);
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Render day info-header
  let headSection = document.createElement('section');
  headSection.className = 'day-info';
  headSection.setAttribute('aria-label', 'Выбранный день подробнее');
  let hiddenClass = Number(num) === 0 ? '' : 'hidden';

  headSection.innerHTML = `
      <p class="day-info__day" aria-label="Текущий день недели">${
        appData[num].dayOfWeek
      }</p>
      <p class="day-info__date" aria-label="Дата выбранного дня">
        <i class="_wi-cal-days icon_color"></i>
        ${appData[num].date.join(' ')}
      </p>
      <p class="day-info__current-time ${hiddenClass}" aria-label="Текущее время сегодня">
        <i class="_wi-clock icon_color"></i>Текущее время:&ensp;
        <time id="current-time">${time}</time>
      </p>
      `;

  parentNode.append(headSection);

  // Render weather hourly
  let hourlyData = appData[num].hourly;
  let hoursStr = hourlyData.hours;

  for (let i = 0; i < 6; i++) {
    let section = document.createElement('section');
    let weatherCode = hourlyData.weatherCode[i];
    let iconUrl =
      weatherCode <= 2 && appData[num].hourly.sunTag[i] === 'night'
        ? weatherObj[weatherCode].iconPathNight
        : weatherObj[weatherCode].iconPath;

    section.className = 'hour-weather';
    section.setAttribute('aria-label', `Погода в ${hoursStr[i]}:00`);
    section.innerHTML = `
      <label class="hour-weather__time" aria-label="Погода в указанный час">${hoursStr[i]}</label>
      <div class="hour-weather__icon" aria-label="Иконка погодных условий и температура">
        <img src="${iconUrl}" alt="${weatherObj[weatherCode].description}" />
        <p class="hour-weather__temp-value">${hourlyData.temperature[i]}&degC</p>
      </div>
      <table aria-label="Таблица параметров в указанный час">
        <caption role="definition" aria-label="Описание погодных условий">${weatherObj[weatherCode].description}</caption>
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
      `;
    parentNode.append(section);
  }
}
