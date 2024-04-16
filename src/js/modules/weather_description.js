const pathTemplate = './img/wi_code_svg/wi_code';
const fileExt = 'svg';
const codeAndText = {
  0: 'Чистое небо',
  1: 'Преимущественно ясно',
  2: 'Переменная облачность',
  3: 'Пасмурно',
  45: 'Легкий туман',
  48: 'Плотный туман',
  51: 'Легкая морось',
  53: 'Средняя морось',
  55: 'Сильная морось',
  56: 'Слабая ледяная морось',
  57: 'Сильная ледяная морось',
  61: 'Слабый дождь',
  63: 'Умеренный дождь',
  65: 'Сильный дождь',
  66: 'Слабый ледяной дождь',
  67: 'Сильный ледяной дождь',
  71: 'Легкий снегопад',
  73: 'Умеренный снегопад',
  75: 'Сильный снегопад',
  77: 'Снежные зерна',
  80: 'Слабый ливень',
  81: 'Умеренный ливень',
  82: 'Сильный ливень',
  85: 'Слабый дождь со снегом',
  86: 'Сильный дождь со снегом',
  95: 'Гроза',
  96: 'Гроза с градом',
  99: 'Сильная гроза с градом',
};

function MeteoFeatureDescriptor(path, ext, codeObj) {
  for (const prop in codeObj) {
    this[prop] = {
      description: codeObj[prop],
      iconPath: `${path}${prop}.${ext}`,
    };
    if (prop == '0' || prop == '1' || prop == '2') {
      this[prop].iconPathNight = `${path}${prop}_night.${ext}`;
    }
  }
}

export const meteoDescriptionObj = new MeteoFeatureDescriptor(
  pathTemplate,
  fileExt,
  codeAndText
);
