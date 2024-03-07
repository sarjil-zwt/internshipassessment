const times = [];

let i = 0;
let t = 0;
while (i < 24) {
  for (let index = 0; index < 4; index++) {
    t++;

    let h = i % 12;

    if (h == 0) {
      h = 12;
    } else if (h < 10 && h > 0) {
      h = "0" + h;
    }
    times.push({
      hours: h,
      minutes: (index * 15) / 10 > 1 ? index * 15 : "0" + index * 15,
      meridiem: i < 12 ? "AM" : "PM",
      t,
    });
  }
  i++;
}

times.push({
  hours: 12,
  minutes: "00",
  meridiem: "AM",
  t: ++t,
});

export default times;
