console.log('|| <=== Weather data for Moscow ===> ||');

// fetch(url)
//   .then((data) => {
//     return data.status === 200
//       ? data.json()
//       : console.error('Server connection error...');
//   })
//   .then((data) => {
//     console.log(data);
//     console.log('UTC offset => |', `+${data.utc_offset_seconds / 3600} hours`);
//     console.log('Current Time => |', `${data.current.time}`);
//     console.log(
//       'Current Temperature => |',
//       `${data.current.temperature_2m}${data.current_units.temperature_2m}`
//     );
//   })
//   .catch((err) => console.log(err));

const requiredCity = 'Moscow';
const selectContry = 'Russia';
const selectContryCode = 'RU';
const urlGeoloacation = `https://photon.komoot.io/api/?q=${requiredCity}`;

fetch(urlGeoloacation)
  .then((geoData) => {
    return geoData.status === 200
      ? geoData.json()
      : console.error('Geolocation server. Connection error...');
  })
  .then((geoData) => {
    console.log(geoData);
    const geoProps = geoData?.features.filter(
      (el) =>
        el.properties.countrycode === selectContryCode &&
        el.properties.type === 'city'
    )[0];
    const longitude = (
      (geoProps.properties.extent[0] + geoProps.properties.extent[2]) /
      2
    ).toFixed(6);
    const latitude = (
      (geoProps.properties.extent[1] + geoProps.properties.extent[3]) /
      2
    ).toFixed(6);
    console.log(geoProps);
    console.log('Longitude => |', longitude, 'Latitude => |', latitude);

    // const urlWeather = `https://api.open-meteo.com/v1/forecast?
    // latitude=${latitude}&
    // longitude=${longitude}&
    // current=temperature_2m`;

    // fetch(urlWeather)
    //   .then((wData) => {
    //     return wData.status === 200
    //       ? wData.json()
    //       : console.error('Weather forcast server. Connection error...');
    //   })
    //   .then((wData) => {
    //     console.log(wData);
    //   });
  })
  .catch((err) => console.log(err));

// {
//   "0":{
//     "day":{
//       "description":"Sunny",
//       "image":"http://openweathermap.org/img/wn/01d@2x.png"
//     },
//     "night":{
//       "description":"Clear",
//       "image":"http://openweathermap.org/img/wn/01n@2x.png"
//     }
//   },
//   "1":{
//     "day":{
//       "description":"Mainly Sunny",
//       "image":"http://openweathermap.org/img/wn/01d@2x.png"
//     },
//     "night":{
//       "description":"Mainly Clear",
//       "image":"http://openweathermap.org/img/wn/01n@2x.png"
//     }
//   },
//   "2":{
//     "day":{
//       "description":"Partly Cloudy",
//       "image":"http://openweathermap.org/img/wn/02d@2x.png"
//     },
//     "night":{
//       "description":"Partly Cloudy",
//       "image":"http://openweathermap.org/img/wn/02n@2x.png"
//     }
//   },
//   "3":{
//     "day":{
//       "description":"Cloudy",
//       "image":"http://openweathermap.org/img/wn/03d@2x.png"
//     },
//     "night":{
//       "description":"Cloudy",
//       "image":"http://openweathermap.org/img/wn/03n@2x.png"
//     }
//   },
//   "45":{
//     "day":{
//       "description":"Foggy",
//       "image":"http://openweathermap.org/img/wn/50d@2x.png"
//     },
//     "night":{
//       "description":"Foggy",
//       "image":"http://openweathermap.org/img/wn/50n@2x.png"
//     }
//   },
//   "48":{
//     "day":{
//       "description":"Rime Fog",
//       "image":"http://openweathermap.org/img/wn/50d@2x.png"
//     },
//     "night":{
//       "description":"Rime Fog",
//       "image":"http://openweathermap.org/img/wn/50n@2x.png"
//     }
//   },
//   "51":{
//     "day":{
//       "description":"Light Drizzle",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Light Drizzle",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "53":{
//     "day":{
//       "description":"Drizzle",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Drizzle",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "55":{
//     "day":{
//       "description":"Heavy Drizzle",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Heavy Drizzle",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "56":{
//     "day":{
//       "description":"Light Freezing Drizzle",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Light Freezing Drizzle",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "57":{
//     "day":{
//       "description":"Freezing Drizzle",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Freezing Drizzle",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "61":{
//     "day":{
//       "description":"Light Rain",
//       "image":"http://openweathermap.org/img/wn/10d@2x.png"
//     },
//     "night":{
//       "description":"Light Rain",
//       "image":"http://openweathermap.org/img/wn/10n@2x.png"
//     }
//   },
//   "63":{
//     "day":{
//       "description":"Rain",
//       "image":"http://openweathermap.org/img/wn/10d@2x.png"
//     },
//     "night":{
//       "description":"Rain",
//       "image":"http://openweathermap.org/img/wn/10n@2x.png"
//     }
//   },
//   "65":{
//     "day":{
//       "description":"Heavy Rain",
//       "image":"http://openweathermap.org/img/wn/10d@2x.png"
//     },
//     "night":{
//       "description":"Heavy Rain",
//       "image":"http://openweathermap.org/img/wn/10n@2x.png"
//     }
//   },
//   "66":{
//     "day":{
//       "description":"Light Freezing Rain",
//       "image":"http://openweathermap.org/img/wn/10d@2x.png"
//     },
//     "night":{
//       "description":"Light Freezing Rain",
//       "image":"http://openweathermap.org/img/wn/10n@2x.png"
//     }
//   },
//   "67":{
//     "day":{
//       "description":"Freezing Rain",
//       "image":"http://openweathermap.org/img/wn/10d@2x.png"
//     },
//     "night":{
//       "description":"Freezing Rain",
//       "image":"http://openweathermap.org/img/wn/10n@2x.png"
//     }
//   },
//   "71":{
//     "day":{
//       "description":"Light Snow",
//       "image":"http://openweathermap.org/img/wn/13d@2x.png"
//     },
//     "night":{
//       "description":"Light Snow",
//       "image":"http://openweathermap.org/img/wn/13n@2x.png"
//     }
//   },
//   "73":{
//     "day":{
//       "description":"Snow",
//       "image":"http://openweathermap.org/img/wn/13d@2x.png"
//     },
//     "night":{
//       "description":"Snow",
//       "image":"http://openweathermap.org/img/wn/13n@2x.png"
//     }
//   },
//   "75":{
//     "day":{
//       "description":"Heavy Snow",
//       "image":"http://openweathermap.org/img/wn/13d@2x.png"
//     },
//     "night":{
//       "description":"Heavy Snow",
//       "image":"http://openweathermap.org/img/wn/13n@2x.png"
//     }
//   },
//   "77":{
//     "day":{
//       "description":"Snow Grains",
//       "image":"http://openweathermap.org/img/wn/13d@2x.png"
//     },
//     "night":{
//       "description":"Snow Grains",
//       "image":"http://openweathermap.org/img/wn/13n@2x.png"
//     }
//   },
//   "80":{
//     "day":{
//       "description":"Light Showers",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Light Showers",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "81":{
//     "day":{
//       "description":"Showers",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Showers",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "82":{
//     "day":{
//       "description":"Heavy Showers",
//       "image":"http://openweathermap.org/img/wn/09d@2x.png"
//     },
//     "night":{
//       "description":"Heavy Showers",
//       "image":"http://openweathermap.org/img/wn/09n@2x.png"
//     }
//   },
//   "85":{
//     "day":{
//       "description":"Light Snow Showers",
//       "image":"http://openweathermap.org/img/wn/13d@2x.png"
//     },
//     "night":{
//       "description":"Light Snow Showers",
//       "image":"http://openweathermap.org/img/wn/13n@2x.png"
//     }
//   },
//   "86":{
//     "day":{
//       "description":"Snow Showers",
//       "image":"http://openweathermap.org/img/wn/13d@2x.png"
//     },
//     "night":{
//       "description":"Snow Showers",
//       "image":"http://openweathermap.org/img/wn/13n@2x.png"
//     }
//   },
//   "95":{
//     "day":{
//       "description":"Thunderstorm",
//       "image":"http://openweathermap.org/img/wn/11d@2x.png"
//     },
//     "night":{
//       "description":"Thunderstorm",
//       "image":"http://openweathermap.org/img/wn/11n@2x.png"
//     }
//   },
//   "96":{
//     "day":{
//       "description":"Light Thunderstorms With Hail",
//       "image":"http://openweathermap.org/img/wn/11d@2x.png"
//     },
//     "night":{
//       "description":"Light Thunderstorms With Hail",
//       "image":"http://openweathermap.org/img/wn/11n@2x.png"
//     }
//   },
//   "99":{
//     "day":{
//       "description":"Thunderstorm With Hail",
//       "image":"http://openweathermap.org/img/wn/11d@2x.png"
//     },
//     "night":{
//       "description":"Thunderstorm With Hail",
//       "image":"http://openweathermap.org/img/wn/11n@2x.png"
//     }
//   }
// }
