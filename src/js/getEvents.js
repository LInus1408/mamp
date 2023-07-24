async function getEvents() {
  const res = await fetch("./json/events.json");
  const data = await res.json();

  const headerDate = document.querySelector(".header__date").textContent;
  const table = document.querySelector(".table");
  const th = document.querySelectorAll("th");
  const tr = document.querySelectorAll("tbody tr");
  const td = document.querySelectorAll("td");

  const isPastDate = (dateString) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    return targetDate <= currentDate;
  };

  for (let key in data) {
    if (headerDate.split(",")[1].trim() == data[key].year) {
      for (let i = 0; i < th.length; i++) {
        if (th[i].textContent.split(" ")[1] == data[key].date) {
          let x = data[key].begin[0] * 2 + data[key].begin[1] / 30;

          const firstCell = th[i];
          const rect = firstCell.getBoundingClientRect();

          const cellHeight = firstCell.offsetHeight;

          const bottomLeftX = rect.left;
          const bottomLeftY = rect.top + cellHeight;

          const heightCell = data[key].duration / 30;
          let div = document.createElement("div");
          div.style.backgroundColor = `${data[key].color}`;
          div.style.fontSize = "16px";
          div.style.color = "white";
          div.style.textAlign = "left";
          div.style.verticalAlign = "middle";
          div.style.position = "absolute";
          div.style.width = "13.7%";
          div.style.height = `${23 + heightCell * 23}px`;
          div.style.top = `${bottomLeftY + 46 + x * 23}px`;
          div.style.left = `${bottomLeftX}px`;
          div.textContent =
            data[key].begin[0] +
            `:` +
            data[key].begin[1] +
            ` ` +
            data[key].title;

          if (isPastDate(`${data[key].date} ${data[key].year}`) === true) {
            div.style.opacity = `0.6`;
          }
          table.append(div);
        }
      }
    }
  }
}

export default getEvents;
