(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const P={1:{long:"Понедельник",short:"Пн"},2:{long:"Вторник",short:"Вт"},3:{long:"Среда",short:"Ср"},4:{long:"Четверг",short:"Чт"},5:{long:"Пятница",short:"Пт"},6:{long:"Суббота",short:"Сб"},0:{long:"Воскресенье",short:"Вс"}},c=[6,9,12,15,18,21];function a(e,t,r){return e.slice(r*24,(r+1)*24).filter((i,o)=>t.includes(o))}function p(e){let t=Math.round(e);return t>0?`+${t}`:`${t}`}function k(e){if(348.75<e||e<11.25)return"С";if(11.25<=e&&e<=33.75)return"ССВ";if(33.75<e&&e<56.25)return"СВ";if(56.25<=e&&e<=78.25)return"ВСВ";if(78.25<e&&e<101.25)return"В";if(101.25<=e&&e<=123.75)return"ВЮВ";if(123.75<e&&e<146.25)return"ЮВ";if(146.25<=e&&e<=168.75)return"ЮЮВ";if(168.75<e&&e<191.25)return"Ю";if(191.25<=e&&e<=213.75)return"ЮЮЗ";if(213.75<e&&e<236.25)return"ЮЗ";if(236.25<=e&&e<=258.75)return"ЗЮЗ";if(258.75<e&&e<281.25)return"З";if(281.25<=e&&e<=303.75)return"ЗСЗ";if(303.75<e&&e<326.25)return"СЗ";if(326.25<=e&&e<=348.75)return"ССЗ"}function A(e){if(e<1e3)return(e/1e3).toFixed(2);if(e<1e4)return(e/1e3).toFixed(1);if(e>=1e4)return(e/1e3).toFixed(0)}function I(e,t,r){let i=new Date(e.daily.sunrise[r]).getHours(),o=new Date(e.daily.sunset[r]).getHours();return t.map(s=>s>i&&s<o?"day":"night")}function E(e){this.utcOffset=e.utc_offset_seconds/3600;for(let t=0;t<7;t++){this[t]={};const r=new Date(e.daily.time[t]),i=r.toLocaleString("ru-RU",{day:"numeric",month:"long"}),o=r.getDay();this[t].dateShort=i,this[t].dateLong=`${i} ${r.getFullYear()}`,this[t].dayLong=P[o].long,this[t].dayShort=P[o].short,this[t].maxTemperature=p(e.daily.temperature_2m_max[t]),this[t].minTemperature=p(e.daily.temperature_2m_min[t]),this[t].weatherCode=e.daily.weather_code[t],this[t].hourly={},this[t].hourly.hours=c.map(s=>`${s}:00`),this[t].hourly.sunTag=I(e,c,t),this[t].hourly.weatherCode=a(e.hourly.weather_code,c,t),this[t].hourly.temperature=a(e.hourly.temperature_2m,c,t).map(p),this[t].hourly.apparentTemperature=a(e.hourly.apparent_temperature,c,t).map(p),this[t].hourly.pressure=a(e.hourly.surface_pressure,c,t).map(s=>Math.round(s*.750062)),this[t].hourly.windSpeed=a(e.hourly.wind_speed_10m,c,t).map(s=>s.toFixed(1)),this[t].hourly.windGusts=a(e.hourly.wind_gusts_10m,c,t).map(s=>s.toFixed(1)),this[t].hourly.windDirection=a(e.hourly.wind_direction_10m,c,t).map(k),this[t].hourly.humidity=a(e.hourly.relative_humidity_2m,c,t),this[t].hourly.precipitation=a(e.hourly.precipitation,c,t),this[t].hourly.cloudCover=a(e.hourly.cloud_cover,c,t),this[t].hourly.visibility=a(e.hourly.visibility,c,t).map(A)}}const T={0:{description:"Чистое небо",iconPath:"./img/wi_code_svg/wi_code0.svg",iconPathNight:"./img/wi_code_svg/wi_code0_night.svg"},1:{description:"Преимущественно ясно",iconPath:"./img/wi_code_svg/wi_code1.svg",iconPathNight:"./img/wi_code_svg/wi_code1_night.svg"},2:{description:"Переменная облачность",iconPath:"./img/wi_code_svg/wi_code2.svg",iconPathNight:"./img/wi_code_svg/wi_code2_night.svg"},3:{description:"Пасмурно",iconPath:"./img/wi_code_svg/wi_code3.svg"},45:{description:"Легкий туман",iconPath:"./img/wi_code_svg/wi_code45.svg"},48:{description:"Плотный туман",iconPath:"./img/wi_code_svg/wi_code48.svg"},51:{description:"Легкая морось",iconPath:"./img/wi_code_svg/wi_code51.svg"},53:{description:"Средняя морось",iconPath:"./img/wi_code_svg/wi_code53.svg"},55:{description:"Сильная морось",iconPath:"./img/wi_code_svg/wi_code55.svg"},56:{description:"Слабая ледяная морось",iconPath:"./img/wi_code_svg/wi_code56.svg"},57:{description:"Сильная ледяная морось",iconPath:"./img/wi_code_svg/wi_code57.svg"},61:{description:"Слабый дождь",iconPath:"./img/wi_code_svg/wi_code61.svg"},63:{description:"Умеренный дождь",iconPath:"./img/wi_code_svg/wi_code63.svg"},65:{description:"Сильный дождь",iconPath:"./img/wi_code_svg/wi_code65.svg"},66:{description:"Слабый ледяной дождь",iconPath:"./img/wi_code_svg/wi_code66.svg"},67:{description:"Сильный ледяной дождь",iconPath:"./img/wi_code_svg/wi_code67.svg"},71:{description:"Легкий снегопад",iconPath:"./img/wi_code_svg/wi_code71.svg"},73:{description:"Умеренный снегопад",iconPath:"./img/wi_code_svg/wi_code73.svg"},75:{description:"Сильный снегопад",iconPath:"./img/wi_code_svg/wi_code75.svg"},77:{description:"Снежные хлопья",iconPath:"./img/wi_code_svg/wi_code77.svg"},80:{description:"Слабый ливень",iconPath:"./img/wi_code_svg/wi_code80.svg"},81:{description:"Умеренный ливень",iconPath:"./img/wi_code_svg/wi_code81.svg"},82:{description:"Сильный ливень",iconPath:"./img/wi_code_svg/wi_code82.svg"},85:{description:"Слабый дождь со снегом",iconPath:"./img/wi_code_svg/wi_code85.svg"},86:{description:"Сильный дождь со снегом",iconPath:"./img/wi_code_svg/wi_code86.svg"},95:{description:"Гроза",iconPath:"./img/wi_code_svg/wi_code95.svg"},96:{description:"Гроза с градом",iconPath:"./img/wi_code_svg/wi_code96.svg"},99:{description:"Сильная гроза с градом",iconPath:"./img/wi_code_svg/wi_code99.svg"}};function F(e,t,r){e.innerHTML="";for(let i=0;i<7;i++){let o=document.createElement("div");o.className=i===0?"card card_active":"card",o.dataset.dayNum=i,o.setAttribute("role","button"),o.setAttribute("aria-label","Нажмите, чтобы посмотреть погоду подробнее");let s=i===0?"Сегодня":i===1?"Завтра":t[i].dayShort,l=i===0?"Сегодня":i===1?"Завтра":t[i].dayLong;o.innerHTML=`
  <div class="card__day-of-week compact" area-label="День недели">${s}</div>
  <div class="card__day-of-week full" area-label="День недели">${l}</div>
  <div class="card__date" area-label="Дата">${t[i].dateShort}</div>
  <div class="card__weather-icon" area-label="${r[t[i].weatherCode].description}"></div>
  <div class="card__temp compact" area-label="Температура">${t[i].maxTemperature}&degC</div>
  <div class="card__temp full" area-label="Температура">${t[i].minTemperature}&degC ... ${t[i].maxTemperature}&degC</div>`,e.append(o),o.children[3].style.backgroundImage=`url(./img/wi_code_svg/wi_code${t[i].weatherCode}.svg)`}}function R(e,t,r){e.innerHTML="";const i=new Date;i.setHours(i.getUTCHours()+t.utcOffset);const o=i.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"});for(let s=0;s<7;s++){let l=s===0?"":" hidden",f=document.createElement("div");f.className=`day-hourly-container${l}`;let M=`
    <section class="day-info" aria-label="Выбранный день подробнее">
      <p class="day-info__day" aria-label="Текущий день недели">
        ${t[s].dayLong}
      </p>
      <p class="day-info__date" aria-label="Дата выбранного дня">
        <i class="_wi-cal-days icon_color"></i>
        ${t[s].dateLong}
      </p>
      <p class="day-info__current-time${l}" aria-label="Текущее время сегодня">
        <i class="_wi-clock icon_color"></i>Текущее время:&ensp;
        <time id="current-time">${o}</time>
      </p>
    </section>
    `,d=t[s].hourly,S=d.hours,$="";for(let n=0;n<6;n++){let g=d.weatherCode[n],N=g<=2&&t[n].hourly.sunTag[n]==="night"?r[g].iconPathNight:r[g].iconPath;$+=`
      <section class="hourly-weather" aria-label="Погода в ${S[n]}:00">
        <label class="hourly-weather__time" aria-label="Погода в указанный час">${S[n]}</label>
        <div class="hourly-weather__icon" aria-label="Иконка погодных условий и температура">
          <img src="${N}" alt="${r[g].description}" />
          <p class="hourly-weather__temp-value">${d.temperature[n]}&degC</p>
        </div>
        <table aria-label="Таблица параметров в указанный час">
          <caption role="definition" aria-label="Описание погодных условий">${r[g].description}</caption>
          <tbody>
            <tr>
                <td class="_wi-temp-half"></td>
                <td>Ощущается</td>
                <td>${d.apparentTemperature[n]}</td>
                <td>&degC</td>
            </tr>
            <tr>
                <td class="_wi-arrow-down"></td>
                <td>Давление</td>
                <td>${d.pressure[n]}</td>
                <td>mmHg</td>
            </tr>
            <tr>
                <td class="_wi-wind"></td>
                <td>Ветер</td>
                <td>${d.windSpeed[n]}</td>
                <td>м/с</td>
            </tr>
            <tr>
                <td class="_wi-tornado"></td>
                <td>Порывы</td>
                <td>${d.windGusts[n]}</td>
                <td>м/с</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-compass"></td>
                <td>Направление</td>
                <td class="dir-data" colspan="2">${d.windDirection[n]}</td>            
            </tr>
            <tr>
                <td class="_wi-droplet"></td>
                <td>Влажность</td>
                <td>${d.humidity[n]}</td>
                <td>%</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-umbrella"></td>
                <td>Осадки</td>
                <td>${d.precipitation[n]}</td>
                <td>мм</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-cloud"></td>
                <td>Облачность</td>
                <td>${d.cloudCover[n]}</td>
                <td>%</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-eye"></td>
                <td>Видимость</td>
                <td>${d.visibility[n]}</td>
                <td>км</td>
            </tr>
          </tbody>
        </table>
      </section>`}f.innerHTML=M+$,e.append(f)}}const m=document.querySelector(".search-popup"),y=document.querySelector("#modal-open-btn"),O=document.querySelector("#modal-close-btn"),K=document.querySelector("#location-search-form"),U=document.querySelector("#location-name-search"),v=document.querySelector("#search-result-list"),D=document.querySelector("#get-weather-form"),_=document.querySelector("aside"),h=document.querySelector("main"),u=document.querySelector(".error-popup"),B=document.querySelector("#error-close-btn"),L=document.querySelector(".loading-main"),w=document.querySelector(".loading-popup");let q,b;y.addEventListener("click",()=>{y.classList.remove("first-appearance"),m.showModal()});O.addEventListener("click",()=>{m.close()});m.addEventListener("click",e=>{e.target===m&&m.close()});B.addEventListener("click",()=>{u.close()});u.addEventListener("click",e=>{e.target===u&&u.close()});if(localStorage.getItem("_pre")){L.classList.remove("hidden");const e=JSON.parse(localStorage.getItem("_pre"));C(e,"auto").then(t=>b=t)}else y.classList.add("first-appearance");K.addEventListener("submit",e=>{e.preventDefault(),w.classList.remove("hidden"),J(U).then(t=>q=t)});D.addEventListener("submit",e=>{if(e.preventDefault(),v.selectedIndex!==-1){w.classList.remove("hidden");const t=q[v.selectedIndex];clearInterval(b),C(t,"user").then(r=>b=r)}});_.addEventListener("click",e=>{let t=e.target.closest(".card");if(t){let r=_.querySelector(".card_active"),i=r.dataset.dayNum,o=t.dataset.dayNum;i!==o&&(r.classList.remove("card_active"),t.classList.add("card_active"),h.children[i].classList.add("hidden"),h.children[o].classList.remove("hidden"))}});const G=/([1-7])|(^Arrow)/;window.addEventListener("keyup",e=>{if(G.test(e.key)&&!m.open&&_.children.length!==0){const t=_.querySelector(".card_active"),r=Number(t.dataset.dayNum);let i=r;e.key==="ArrowDown"&&i<6&&i++,e.key==="ArrowUp"&&i>0&&i--,e.key==="ArrowRight"&&i<6&&i++,e.key==="ArrowLeft"&&i>0&&i--,Number(e.key)>=1&&Number(e.key)<=7&&(i=Number(e.key)-1),r!==i&&(t.classList.remove("card_active"),_.children[i].classList.add("card_active"),h.children[r].classList.add("hidden"),h.children[i].classList.remove("hidden"))}});async function x(e){const r=new AbortController,i=setTimeout(()=>r.abort(),8e3),o=await fetch(e,{signal:r.signal}).then(s=>s.status===200?s.json():console.error());return clearTimeout(i),o}async function J({value:e}){const t=`https://geocoding-api.open-meteo.com/v1/search?name=${e}&count=50&language=ru&format=json`;return x(t).then(r=>{const i=r==null?void 0:r.results;return Y(i,v),i}).catch(r=>{H(r,"geo")}).finally(()=>{w.classList.add("hidden")})}async function C(e,t){const r=`https://api.open-meteo.com/v1/forecast?latitude=${e.latitude}&longitude=${e.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,&wind_speed_unit=ms&timezone=auto`;return x(r).then(i=>{const o=new E(i);F(_,o,T),R(h,o,T);const s=W(h,o);return z(y,e),t==="user"&&localStorage.setItem("_pre",JSON.stringify(e)),s}).then(i=>(h.querySelector("img").onload=()=>{t==="user"?m.close():L.classList.add("hidden")},i)).catch(i=>{H(i,"meteo")}).finally(()=>{(t==="user"?w:L).classList.add("hidden")})}function W(e,t){const r=e.querySelector("#current-time");return setInterval(()=>{let o=new Date;o.setHours(o.getUTCHours()+t.utcOffset),r.textContent=o.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"}),o.getHours()===0&&o.getMinutes()===0&&o.getSeconds()===0&&window.location.reload()},1e3)}function z(e,{country_code:t,admin1:r,name:i}){e.innerHTML=`<i class="btn-icon"></i>
  <div class="btn-name">${r}, ${i}</div>`,e.children[0].style.background=`url(./img/fi_rounded_svg/fi_${t}.svg)`}function Y(e,t){t.innerHTML="",t.removeAttribute("disabled"),e?e.forEach(r=>{t.append(new Option(`${r.country}, ${r.admin1}, ${r.name}`))}):(t.append(new Option("Нет совпадений")),t.setAttribute("disabled",""))}function H(e,t){const r={geo:"Geocoding Server request error",meteo:"Weather forcast Server request error"},i=e.name==="AbortError"?"Server timeout error. Time limit exceeded":r[t];u.querySelector(".message").innerHTML=i,u.showModal()}window.addEventListener("keydown",e=>{e.code=="KeyL"&&e.shiftKey&&(e.ctrlKey||e.metaKey)&&(console.log("DevKeys => Clear Local storage"),localStorage.clear()),e.code=="KeyK"&&e.shiftKey&&(e.ctrlKey||e.metaKey)&&(console.log("DevKeys => Show Test Error Popup"),u.querySelector(".message").innerHTML="Test error",u.showModal())});
