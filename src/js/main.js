import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import HTMLBuilder from "./htmlBuilder.js";
import DateUtils from "./dateUtils.js";
import dates from "./dates.js";
import getEvents from "./getEvents";

const headerDate = document.querySelector(".header__date");
const main = document.querySelector(".main");
const arrows = document.querySelectorAll(".arrow");
const preloader = document.getElementById("preloader");

dates.currentDate = DateUtils.getCurrentDate();
dates.actualDate = DateUtils.getCurrentDate();
dates.prevMonth = DateUtils.getCurrentDate();
dates.prevMonth.setMonth(dates.prevMonth.getMonth() - 1);
dates.nextMonth = DateUtils.getCurrentDate();
dates.nextMonth.setMonth(dates.nextMonth.getMonth() + 1);

function findCheckDay() {
  const th = document.querySelectorAll("th");
  const td = document.querySelectorAll("td");
  let num;
  let strTime = `${dates.currentDate.toLocaleString("en-US", {
    weekday: "short",
  })} ${dates.currentDate.getMonth() + 1}/${dates.currentDate.getDate()}`;
  th.forEach((elem, number) => {
    if (elem.textContent == strTime) {
      num = number;
    }
  });
  for (let i = num; i < td.length; i += 8) {
    td[i].classList.add("selected-date");
  }
}

function SwitchDates() {
  arrows[0].addEventListener("click", () => {
    if (
      dates.actualDate.getTime() - 7 * 24 * 60 * 60 * 1000 >=
      dates.prevMonth.getTime()
    ) {
      dates.actualDate.setDate(dates.actualDate.getDate() - 7);
      initPage(dates.actualDate);
    }
  });
  arrows[1].addEventListener("click", () => {
    if (
      dates.actualDate.getTime() + 7 * 24 * 60 * 60 * 1000 <=
      dates.nextMonth.getTime()
    ) {
      dates.actualDate.setDate(dates.actualDate.getDate() + 7);
      initPage(dates.actualDate);
    }
  });
}
SwitchDates();

async function initPage(dateNest) {
  const builder = new HTMLBuilder(headerDate, main, new Date(dateNest));
  new Promise(function (resolve, reject) {
    preloader.style.display = "block";
    resolve(builder.headerHTMLTime());
  })
    .then(function () {
      builder.tableBuilder();
    })
    .then(function () {
      findCheckDay();
    })
    .then(function () {
      getEvents();
    })
    .then(function () {
      preloader.style.display = "none";
    });
}

initPage(dates.actualDate);
