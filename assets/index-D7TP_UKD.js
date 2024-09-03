(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const T={1:{long:"Понедельник",short:"Пн"},2:{long:"Вторник",short:"Вт"},3:{long:"Среда",short:"Ср"},4:{long:"Четверг",short:"Чт"},5:{long:"Пятница",short:"Пт"},6:{long:"Суббота",short:"Сб"},0:{long:"Воскресенье",short:"Вс"}},a=[6,9,12,15,18,21];function d(e,t,i){return e.slice(i*24,(i+1)*24).filter((r,o)=>t.includes(o))}function p(e){let t=Math.round(e);return t>0?`+${t}`:`${t}`}function k(e){if(348.75<e||e<11.25)return"С";if(11.25<=e&&e<=33.75)return"ССВ";if(33.75<e&&e<56.25)return"СВ";if(56.25<=e&&e<=78.25)return"ВСВ";if(78.25<e&&e<101.25)return"В";if(101.25<=e&&e<=123.75)return"ВЮВ";if(123.75<e&&e<146.25)return"ЮВ";if(146.25<=e&&e<=168.75)return"ЮЮВ";if(168.75<e&&e<191.25)return"Ю";if(191.25<=e&&e<=213.75)return"ЮЮЗ";if(213.75<e&&e<236.25)return"ЮЗ";if(236.25<=e&&e<=258.75)return"ЗЮЗ";if(258.75<e&&e<281.25)return"З";if(281.25<=e&&e<=303.75)return"ЗСЗ";if(303.75<e&&e<326.25)return"СЗ";if(326.25<=e&&e<=348.75)return"ССЗ"}function F(e){if(e<1e3)return(e/1e3).toFixed(2);if(e<1e4)return(e/1e3).toFixed(1);if(e>=1e4)return(e/1e3).toFixed(0)}function I(e,t,i){let r=new Date(e.daily.sunrise[i]).getHours(),o=new Date(e.daily.sunset[i]).getHours();return t.map(n=>n>r&&n<o?"day":"night")}function E(e){this.utcOffset=e.utc_offset_seconds/3600;for(let t=0;t<7;t++){this[t]={};const i=new Date(e.daily.time[t]),r=i.toLocaleString("ru-RU",{day:"numeric",month:"long"}),o=i.getDay();this[t].dateShort=r,this[t].dateLong=`${r} ${i.getFullYear()}`,this[t].dayLong=T[o].long,this[t].dayShort=T[o].short,this[t].maxTemperature=p(e.daily.temperature_2m_max[t]),this[t].minTemperature=p(e.daily.temperature_2m_min[t]),this[t].weatherCode=e.daily.weather_code[t],this[t].hourly={},this[t].hourly.hours=a.map(n=>`${n}:00`),this[t].hourly.sunTag=I(e,a,t),this[t].hourly.weatherCode=d(e.hourly.weather_code,a,t),this[t].hourly.temperature=d(e.hourly.temperature_2m,a,t).map(p),this[t].hourly.apparentTemperature=d(e.hourly.apparent_temperature,a,t).map(p),this[t].hourly.pressure=d(e.hourly.surface_pressure,a,t).map(n=>Math.round(n*.750062)),this[t].hourly.windSpeed=d(e.hourly.wind_speed_10m,a,t).map(n=>n.toFixed(1)),this[t].hourly.windGusts=d(e.hourly.wind_gusts_10m,a,t).map(n=>n.toFixed(1)),this[t].hourly.windDirection=d(e.hourly.wind_direction_10m,a,t).map(k),this[t].hourly.humidity=d(e.hourly.relative_humidity_2m,a,t),this[t].hourly.precipitation=d(e.hourly.precipitation,a,t),this[t].hourly.cloudCover=d(e.hourly.cloud_cover,a,t),this[t].hourly.visibility=d(e.hourly.visibility,a,t).map(F)}}const R="./img/wi_code_svg/wi_code",O="svg",K={0:"Чистое небо",1:"Преимущественно ясно",2:"Переменная облачность",3:"Пасмурно",45:"Легкий туман",48:"Плотный туман",51:"Легкая морось",53:"Средняя морось",55:"Сильная морось",56:"Слабая ледяная морось",57:"Сильная ледяная морось",61:"Слабый дождь",63:"Умеренный дождь",65:"Сильный дождь",66:"Слабый ледяной дождь",67:"Сильный ледяной дождь",71:"Легкий снегопад",73:"Умеренный снегопад",75:"Сильный снегопад",77:"Снежные зерна",80:"Слабый ливень",81:"Умеренный ливень",82:"Сильный ливень",85:"Слабый дождь со снегом",86:"Сильный дождь со снегом",95:"Гроза",96:"Гроза с градом",99:"Сильная гроза с градом"};function P(e,t,i){for(const r in i)this[r]={description:i[r],iconPath:`${e}${r}.${t}`},(r=="0"||r=="1"||r=="2")&&(this[r].iconPathNight=`${e}${r}_night.${t}`)}const q=new P(R,O,K);function U(e,t,i){e.innerHTML="";for(let r=0;r<7;r++){let o=document.createElement("div");o.className=r===0?"card card_active":"card",o.dataset.dayNum=r,o.setAttribute("role","button"),o.setAttribute("aria-label","Нажмите, чтобы посмотреть погоду подробнее");let n=r===0?"Сегодня":r===1?"Завтра":t[r].dayShort,l=r===0?"Сегодня":r===1?"Завтра":t[r].dayLong;o.innerHTML=`
  <div class="card__day-of-week compact" area-label="День недели">${n}</div>
  <div class="card__day-of-week full" area-label="День недели">${l}</div>
  <div class="card__date" area-label="Дата">${t[r].dateShort}</div>
  <div class="card__weather-icon" area-label="${i[t[r].weatherCode].description}"></div>
  <div class="card__temp compact" area-label="Температура">${t[r].maxTemperature}&degC</div>
  <div class="card__temp full" area-label="Температура">${t[r].minTemperature}&degC ... ${t[r].maxTemperature}&degC</div>`,e.append(o),o.children[3].style.backgroundImage=`url(./img/wi_code_svg/wi_code${t[r].weatherCode}.svg)`}}function B(e,t,i){e.innerHTML="";const r=new Date;r.setHours(r.getUTCHours()+t.utcOffset);const o=r.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"});for(let n=0;n<7;n++){let l=n===0?"":" hidden",g=document.createElement("div");g.className=`day-hourly-container${l}`;let A=`
    <section class="day-info" aria-label="Выбранный день подробнее">
      <p class="day-info__day" aria-label="Текущий день недели">
        ${t[n].dayLong}
      </p>
      <p class="day-info__date" aria-label="Дата выбранного дня">
        <i class="_wi-cal-days icon_color"></i>
        ${t[n].dateLong}
      </p>
      <p class="day-info__current-time${l}" aria-label="Текущее время сегодня">
        <i class="_wi-clock icon_color"></i>Текущее время:&ensp;
        <time id="current-time">${o}</time>
      </p>
    </section>
    `,c=t[n].hourly,S=c.hours,$="";for(let s=0;s<6;s++){let f=c.weatherCode[s],N=f<=2&&t[s].hourly.sunTag[s]==="night"?i[f].iconPathNight:i[f].iconPath;$+=`
      <section class="hourly-weather" aria-label="Погода в ${S[s]}:00">
        <label class="hourly-weather__time" aria-label="Погода в указанный час">${S[s]}</label>
        <div class="hourly-weather__icon" aria-label="Иконка погодных условий и температура">
          <img src="${N}" alt="${i[f].description}" />
          <p class="hourly-weather__temp-value">${c.temperature[s]}&degC</p>
        </div>
        <table aria-label="Таблица параметров в указанный час">
          <caption aria-label="Описание погодных условий">${i[f].description}</caption>
          <tbody>
            <tr>
                <td class="_wi-temp-half"></td>
                <td>Ощущается</td>
                <td>${c.apparentTemperature[s]}</td>
                <td>&degC</td>
            </tr>
            <tr>
                <td class="_wi-arrow-down"></td>
                <td>Давление</td>
                <td>${c.pressure[s]}</td>
                <td>mmHg</td>
            </tr>
            <tr>
                <td class="_wi-wind"></td>
                <td>Ветер</td>
                <td>${c.windSpeed[s]}</td>
                <td>м/с</td>
            </tr>
            <tr>
                <td class="_wi-tornado"></td>
                <td>Порывы</td>
                <td>${c.windGusts[s]}</td>
                <td>м/с</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-compass"></td>
                <td>Направление</td>
                <td class="dir-data" colspan="2">${c.windDirection[s]}</td>            
            </tr>
            <tr>
                <td class="_wi-droplet"></td>
                <td>Влажность</td>
                <td>${c.humidity[s]}</td>
                <td>%</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-umbrella"></td>
                <td>Осадки</td>
                <td>${c.precipitation[s]}</td>
                <td>мм</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-cloud"></td>
                <td>Облачность</td>
                <td>${c.cloudCover[s]}</td>
                <td>%</td>
            </tr>
            <tr class="table_extended">
                <td class="_wi-eye"></td>
                <td>Видимость</td>
                <td>${c.visibility[s]}</td>
                <td>км</td>
            </tr>
          </tbody>
        </table>
      </section>`}g.innerHTML=A+$,e.append(g)}}function D(e){document.addEventListener("keydown",t=>{t.code=="KeyL"&&t.shiftKey&&(t.ctrlKey||t.metaKey)&&(localStorage.clear(),e.querySelector(".message").innerHTML="Local Storage Cleared",e.showModal()),t.code=="KeyK"&&t.shiftKey&&(t.ctrlKey||t.metaKey)&&(e.querySelector(".message").innerHTML="Test error",e.showModal())})}const u=document.querySelector(".search-popup"),_=document.querySelector("#modal-open-btn"),G=document.querySelector("#modal-close-btn"),J=document.querySelector("#location-search-form"),W=document.querySelector("#location-name-search"),L=document.querySelector("#search-result-list"),z=document.querySelector("#get-weather-form"),y=document.querySelector("aside"),m=document.querySelector("main"),h=document.querySelector(".error-popup"),Y=document.querySelector("#error-close-btn"),b=document.querySelector(".loading-main"),w=document.querySelector(".loading-popup");let x,v;_.addEventListener("click",()=>{_.classList.remove("first-appearance"),u.showModal()});G.addEventListener("click",()=>{u.close()});u.addEventListener("click",e=>{e.target===u&&u.close()});Y.addEventListener("click",()=>{h.close()});h.addEventListener("click",e=>{e.target===h&&h.close()});if(localStorage.getItem("_pre")){b.classList.remove("hidden");const e=JSON.parse(localStorage.getItem("_pre"));C(e,"auto").then(t=>v=t)}else _.classList.add("first-appearance");J.addEventListener("submit",e=>{e.preventDefault(),w.classList.remove("hidden"),V(W).then(t=>x=t)});z.addEventListener("submit",e=>{if(e.preventDefault(),L.selectedIndex!==-1){w.classList.remove("hidden");const t=x[L.selectedIndex];clearInterval(v),C(t,"user").then(i=>v=i)}});y.addEventListener("click",e=>{let t=e.target.closest(".card");if(t){let i=y.querySelector(".card_active"),r=i.dataset.dayNum,o=t.dataset.dayNum;r!==o&&(i.classList.remove("card_active"),t.classList.add("card_active"),m.children[r].classList.add("hidden"),m.children[o].classList.remove("hidden"))}});const Q=/([1-7])|(^Arrow)/;window.addEventListener("keyup",e=>{if(Q.test(e.key)&&!u.open&&y.children.length!==0){const t=y.querySelector(".card_active"),i=Number(t.dataset.dayNum);let r=i;e.key==="ArrowDown"&&r<6&&r++,e.key==="ArrowUp"&&r>0&&r--,e.key==="ArrowRight"&&r<6&&r++,e.key==="ArrowLeft"&&r>0&&r--,Number(e.key)>=1&&Number(e.key)<=7&&(r=Number(e.key)-1),i!==r&&(t.classList.remove("card_active"),y.children[r].classList.add("card_active"),m.children[i].classList.add("hidden"),m.children[r].classList.remove("hidden"))}});async function H(e){const i=new AbortController,r=setTimeout(()=>i.abort(),8e3),o=await fetch(e,{signal:i.signal}).then(n=>n.status===200?n.json():console.error());return clearTimeout(r),o}async function V({value:e}){const t=`https://geocoding-api.open-meteo.com/v1/search?name=${e}&count=50&language=ru&format=json`;return H(t).then(i=>{const r=i==null?void 0:i.results;return j(r,L),r}).catch(i=>{M(i,"geo")}).finally(()=>{w.classList.add("hidden")})}async function C(e,t){const i=`https://api.open-meteo.com/v1/forecast?latitude=${e.latitude}&longitude=${e.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,&wind_speed_unit=ms&timezone=auto`;return H(i).then(r=>{const o=new E(r);U(y,o,q),B(m,o,q);const n=X(m,o);return Z(_,e),t==="user"&&localStorage.setItem("_pre",JSON.stringify(e)),n}).then(r=>(m.querySelector("img").onload=()=>{t==="user"?u.close():b.classList.add("hidden")},r)).catch(r=>{M(r,"meteo")}).finally(()=>{(t==="user"?w:b).classList.add("hidden"),u.close()})}function X(e,t){const i=e.querySelector("#current-time");return setInterval(()=>{let o=new Date;o.setHours(o.getUTCHours()+t.utcOffset),i.textContent=o.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"}),o.getHours()===0&&o.getMinutes()===0&&o.getSeconds()===0&&window.location.reload()},1e3)}function Z(e,{country_code:t,admin1:i,name:r}){e.innerHTML=`<i class="btn-icon"></i>
  <div class="btn-name">${i}, ${r}</div>`,e.children[0].style.background=`url(./img/fi_rounded_svg/fi_${t}.svg)`}function j(e,t){t.innerHTML="",t.removeAttribute("disabled"),e?e.forEach(i=>{t.append(new Option(`${i.country}, ${i.admin1}, ${i.name}`))}):(t.append(new Option("Нет совпадений")),t.setAttribute("disabled",""))}function M(e,t){const i={geo:"Geocoding Server request error",meteo:"Weather forcast Server request error"},r=e.name==="AbortError"?"Server timeout error. Time limit exceeded":i[t];h.querySelector(".message").innerHTML=r,h.showModal()}D(h);
