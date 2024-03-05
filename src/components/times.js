const times = [];

let i = 0;
let t = 0;
while (i < 24) {
  for (let index = 0; index < 4; index++) {
    t++;
    times.push({
      hours: i % 12,
      minutes: index * 15,
      meridiem: i <= 12 ? "AM" : "PM",
      hours24: i,
      t,
    });
  }
  i++;
}

export default times;
