const modalSearchWindow = document.querySelector('.search-modal');
const openModal = document.querySelector('.modal-open-btn');
const closeModal = document.querySelector('.modal-close-btn');

openModal.addEventListener('click', () => {
  modalSearchWindow.showModal();
});

closeModal.addEventListener('click', () => {
  modalSearchWindow.close();
});

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

// const requiredCity = 'Moscow';
// const selectContry = 'Russia';
// const selectContryCode = 'RU';
// const urlGeoloacation = `https://photon.komoot.io/api/?q=${requiredCity}`;

// fetch(urlGeoloacation)
//   .then((geoData) => {
//     return geoData.status === 200
//       ? geoData.json()
//       : console.error('Geolocation server. Connection error...');
//   })
//   .then((geoData) => {
//     console.log(geoData);
//     const geoProps = geoData?.features.filter(
//       (el) =>
//         el.properties.countrycode === selectContryCode &&
//         el.properties.type === 'city'
//     )[0];
//     const longitude = (
//       (geoProps.properties.extent[0] + geoProps.properties.extent[2]) /
//       2
//     ).toFixed(6);
//     const latitude = (
//       (geoProps.properties.extent[1] + geoProps.properties.extent[3]) /
//       2
//     ).toFixed(6);
//     console.log(geoProps);
//     console.log('Longitude => |', longitude, 'Latitude => |', latitude);

//     // const urlWeather = `https://api.open-meteo.com/v1/forecast?
//     // latitude=${latitude}&
//     // longitude=${longitude}&
//     // current=temperature_2m`;

//     // fetch(urlWeather)
//     //   .then((wData) => {
//     //     return wData.status === 200
//     //       ? wData.json()
//     //       : console.error('Weather forcast server. Connection error...');
//     //   })
//     //   .then((wData) => {
//     //     console.log(wData);
//     //   });
//   })
//   .catch((err) => console.log(err));
