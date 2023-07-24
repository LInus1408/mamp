import DateUtils from "./dateUtils.js";

class HTMLBuilder {
  constructor(elementOne, elementTwo, time) {
    this.elementOne = elementOne;
    this.elementTwo = elementTwo;
    this.time = time;
  }

  headerDateRangeTime(days) {
    const currentDate = this.time;
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + days[0]);
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + days[1]);
    return `${DateUtils.formatDateMonth(
      startDate
    )} - ${DateUtils.formatDateMonth(endDate)}, ${endDate.getFullYear()}`;
  }
  headerHTMLTime() {
    const dateRange = this.headerDateRangeTime([-3, 3]);
    this.elementOne.innerHTML = dateRange;
  }

  tableBuilder() {
    if (document.querySelector("table")) {
      document.querySelector("table").remove();
    }
    let table = document.createElement("table");
    table.className = "table";
    this.elementTwo.append(table);
    let dateTable = this.time;
    let t = 12;
    dateTable.setDate(dateTable.getDate() - 3);

    let thead = document.createElement("thead");
    table.append(thead);

    let tbody = document.createElement("tbody");
    table.append(tbody);

    for (let i = 1; i <= 50; i++) {
      let tr = document.createElement("tr");
      if (i === 1) {
        thead.append(tr);
      } else {
        tbody.append(tr);
      }

      for (let j = 1; j <= 8; j++) {
        if (i === 1) {
          let th = document.createElement("th");
          th.className = "th";
          tr.append(th);
          if (j > 1) {
            th.textContent = `${dateTable.toLocaleString("en-US", {
              weekday: "short",
            })} ${dateTable.getMonth() + 1}/${dateTable.getDate()}`;
            dateTable.setDate(dateTable.getDate() + 1);
          }
        } else if (i === 2) {
          let td = document.createElement("td");
          td.className = "td all-day";
          tr.append(td);
          if (j === 1) {
            td.textContent = `all-day`;
          }
        } else {
          let td = document.createElement("td");
          td.className = "td";
          tr.append(td);
          if (j > 1) {
            td.textContent = ``;
          } else {
            if (i === 3) {
              td.textContent = `${t}am`;
              t = 1;
            } else if (i <= 26 && i % 2 !== 0) {
              td.textContent = `${t}am`;
              ++t;
            } else if (i === 27) {
              td.textContent = `12pm`;
              t = 1;
            } else if (i > 27 && i % 2 !== 0) {
              td.textContent = `${t}pm`;
              ++t;
            }
          }
        }
      }
    }
  }
}

export default HTMLBuilder;
