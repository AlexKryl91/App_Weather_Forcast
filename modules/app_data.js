// Export the main structure of app data

const dayNames = {
  Mon: 'Понедельник',
  Tue: 'Вторник',
  Wed: 'Среда',
  Thu: 'Четверг',
  Fri: 'Пятница',
  Sat: 'Суббота',
  Sun: 'Воскресенье',
};
const dayShortNames = {
  Mon: 'Пн',
  Tue: 'Вт',
  Wed: 'Ср',
  Thu: 'Чт',
  Fri: 'Пт',
  Sat: 'Сб',
  Sun: 'Вс',
};
const monthNames = {
  Jan: 'Января',
  Feb: 'Февраля',
  Mar: 'Марта',
  Apr: 'Апреля',
  May: 'Мая',
  Jun: 'Июня',
  Jul: 'Июля',
  Aug: 'Августа',
  Sep: 'Сентября',
  Oct: 'Октября',
  Nov: 'Ноября',
  Dec: 'Декабря',
};
const appSelectedHours = [6, 9, 12, 15, 18, 21];

function dataHourFilter(data, selectedHours, dayNum) {
  return data
    .slice(dayNum * 24, (dayNum + 1) * 24)
    .filter((el, i) => selectedHours.includes(i));
}

function tempFormat(value) {
  let res = Math.round(value);
  return res > 0 ? `+${res}` : `${res}`;
}

function windDirectionStr(degree) {
  if (348.75 < degree || degree < 11.25) return 'С';
  if (11.25 <= degree && degree <= 33.75) return 'ССВ';
  if (33.75 < degree && degree < 56.25) return 'СВ';
  if (56.25 <= degree && degree <= 78.25) return 'ВСВ';
  if (78.25 < degree && degree < 101.25) return 'В';
  if (101.25 <= degree && degree <= 123.75) return 'ВЮВ';
  if (123.75 < degree && degree < 146.25) return 'ЮВ';
  if (146.25 <= degree && degree <= 168.75) return 'ЮЮВ';
  if (168.75 < degree && degree < 191.25) return 'Ю';
  if (191.25 <= degree && degree <= 213.75) return 'ЮЮЗ';
  if (213.75 < degree && degree < 236.25) return 'ЮЗ';
  if (236.25 <= degree && degree <= 258.75) return 'ЗЮЗ';
  if (258.75 < degree && degree < 281.25) return 'З';
  if (281.25 <= degree && degree <= 303.75) return 'ЗСЗ';
  if (303.75 < degree && degree < 326.25) return 'СЗ';
  if (326.25 <= degree && degree <= 348.75) return 'ССЗ';
}

function distanceFormat(value) {
  if (value < 1000) {
    return (value / 1000).toFixed(2);
  }
  if (value < 10000) {
    return (value / 1000).toFixed(1);
  }
  if (value >= 10000) {
    return (value / 1000).toFixed(0);
  }
}

function dateZeroClean(dayOfMonth) {
  return dayOfMonth
    .split('')
    .filter((el) => el !== '0')
    .join('');
}

function dayOrNigthFilter(data, selectedHours, index) {
  let sunriseDate = new Date(data.daily.sunrise[index]);
  let sunsetDate = new Date(data.daily.sunset[index]);
  let sunriseHour = sunriseDate.getHours();
  let sunsetHour = sunsetDate.getHours();
  return selectedHours.map((el) =>
    el > sunriseHour && el < sunsetHour ? 'day' : 'night'
  );
}

export function AppData(data) {
  this.utcOffset = data.utc_offset_seconds / 3600;

  for (let i = 0; i < 7; i++) {
    this[i] = {};

    const dayDate = new Date(data.daily.time[i]);
    const dateArr = dayDate.toDateString().split(/\s+/g);

    this[i].date = [
      dateZeroClean(dateArr[2]),
      monthNames[dateArr[1]],
      dateArr[3],
    ];
    this[i].dayOfWeek = dayNames[dateArr[0]];
    this[i].dayOfWeekShort = dayShortNames[dateArr[0]];

    this[i].maxTemperature = tempFormat(data.daily.temperature_2m_max[i]);

    this[i].minTemperature = tempFormat(data.daily.temperature_2m_min[i]);

    this[i].weatherCode = data.daily.weather_code[i];

    this[i].hourly = {};

    this[i].hourly.hours = appSelectedHours.map((el) => `${el}:00`);

    this[i].hourly.sunTag = dayOrNigthFilter(data, appSelectedHours, i);

    this[i].hourly.weatherCode = dataHourFilter(
      data.hourly.weather_code,
      appSelectedHours,
      i
    );

    this[i].hourly.temperature = dataHourFilter(
      data.hourly.temperature_2m,
      appSelectedHours,
      i
    ).map((el) => tempFormat(el));

    this[i].hourly.apparentTemperature = dataHourFilter(
      data.hourly.apparent_temperature,
      appSelectedHours,
      i
    ).map((el) => tempFormat(el));

    this[i].hourly.pressure = dataHourFilter(
      data.hourly.surface_pressure,
      appSelectedHours,
      i
    ).map((el) => Math.round(el * 0.750062));

    this[i].hourly.windSpeed = dataHourFilter(
      data.hourly.wind_speed_10m,
      appSelectedHours,
      i
    ).map((el) => el.toFixed(1));

    this[i].hourly.windGusts = dataHourFilter(
      data.hourly.wind_gusts_10m,
      appSelectedHours,
      i
    ).map((el) => el.toFixed(1));

    this[i].hourly.windDirection = dataHourFilter(
      data.hourly.wind_direction_10m,
      appSelectedHours,
      i
    ).map((el) => windDirectionStr(el));

    this[i].hourly.humidity = dataHourFilter(
      data.hourly.relative_humidity_2m,
      appSelectedHours,
      i
    );

    this[i].hourly.precipitation = dataHourFilter(
      data.hourly.precipitation,
      appSelectedHours,
      i
    );

    this[i].hourly.cloudCover = dataHourFilter(
      data.hourly.cloud_cover,
      appSelectedHours,
      i
    );

    this[i].hourly.visibility = dataHourFilter(
      data.hourly.visibility,
      appSelectedHours,
      i
    ).map((el) => distanceFormat(el));
  }
}
