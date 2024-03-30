// Export the main structure of app data

const dayNames = {
  1: { long: 'Понедельник', short: 'Пн' },
  2: { long: 'Вторник', short: 'Вт' },
  3: { long: 'Среда', short: 'Ср' },
  4: { long: 'Четверг', short: 'Чт' },
  5: { long: 'Пятница', short: 'Пт' },
  6: { long: 'Суббота', short: 'Сб' },
  0: { long: 'Воскресенье', short: 'Вс' },
};

const hoursPreset = [6, 9, 12, 15, 18, 21];

function dataHourFilter(dataArr, selectedHours, index) {
  return dataArr
    .slice(index * 24, (index + 1) * 24)
    .filter((el, i) => selectedHours.includes(i));
}

function tempFormatter(value) {
  let res = Math.round(value);
  return res > 0 ? `+${res}` : `${res}`;
}

function windDirFormatter(degree) {
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

function distanceFormatter(value) {
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

function dayOrNigth(data, selectedHours, index) {
  let sunriseHour = new Date(data.daily.sunrise[index]).getHours();
  let sunsetHour = new Date(data.daily.sunset[index]).getHours();
  return selectedHours.map((el) =>
    el > sunriseHour && el < sunsetHour ? 'day' : 'night'
  );
}

export function AppData(data) {
  this.utcOffset = data.utc_offset_seconds / 3600;

  for (let i = 0; i < 7; i++) {
    this[i] = {};
    //
    const dayDate = new Date(data.daily.time[i]);
    const dateStr = dayDate.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
    const dayNumber = dayDate.getDay();
    //
    this[i].dateShort = dateStr;
    this[i].dateLong = `${dateStr} ${dayDate.getFullYear()}`;
    this[i].dayLong = dayNames[dayNumber].long;
    this[i].dayShort = dayNames[dayNumber].short;
    this[i].maxTemperature = tempFormatter(data.daily.temperature_2m_max[i]);
    this[i].minTemperature = tempFormatter(data.daily.temperature_2m_min[i]);
    this[i].weatherCode = data.daily.weather_code[i];

    this[i].hourly = {};
    this[i].hourly.hours = hoursPreset.map((el) => `${el}:00`);
    this[i].hourly.sunTag = dayOrNigth(data, hoursPreset, i);

    this[i].hourly.weatherCode = dataHourFilter(
      data.hourly.weather_code,
      hoursPreset,
      i
    );

    this[i].hourly.temperature = dataHourFilter(
      data.hourly.temperature_2m,
      hoursPreset,
      i
    ).map(tempFormatter);

    this[i].hourly.apparentTemperature = dataHourFilter(
      data.hourly.apparent_temperature,
      hoursPreset,
      i
    ).map(tempFormatter);

    this[i].hourly.pressure = dataHourFilter(
      data.hourly.surface_pressure,
      hoursPreset,
      i
    ).map((el) => Math.round(el * 0.750062));

    this[i].hourly.windSpeed = dataHourFilter(
      data.hourly.wind_speed_10m,
      hoursPreset,
      i
    ).map((el) => el.toFixed(1));

    this[i].hourly.windGusts = dataHourFilter(
      data.hourly.wind_gusts_10m,
      hoursPreset,
      i
    ).map((el) => el.toFixed(1));

    this[i].hourly.windDirection = dataHourFilter(
      data.hourly.wind_direction_10m,
      hoursPreset,
      i
    ).map(windDirFormatter);

    this[i].hourly.humidity = dataHourFilter(
      data.hourly.relative_humidity_2m,
      hoursPreset,
      i
    );

    this[i].hourly.precipitation = dataHourFilter(
      data.hourly.precipitation,
      hoursPreset,
      i
    );

    this[i].hourly.cloudCover = dataHourFilter(
      data.hourly.cloud_cover,
      hoursPreset,
      i
    );

    this[i].hourly.visibility = dataHourFilter(
      data.hourly.visibility,
      hoursPreset,
      i
    ).map(distanceFormatter);
  }
}
