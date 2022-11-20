import EventEmitter from "events"

const [hour, day, month, year] = process.argv.slice(2).map(item => parseInt(item));

const currentDate = new Date();
const date = new Date(year, month - 1, day, hour);
let timeDiff = date.getTime() - currentDate.getTime();

const isTimeLeft = () => {
  return timeDiff - 1000 > ( 1000 * 60 * 60 ) ? true : false;
}

const generateNewDateObj = () => {
  return {
    yearsLeft: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12)),
    monthsLeft: Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30) % 12),
    daysLeft: Math.floor(timeDiff / (1000 * 60 * 60 * 24) % 30),
    hoursLeft: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
  }
}

const showTimeLeft = (dateObj) => {
  const result = ["Осталось"];
  dateObj.yearsLeft > 0 ? result.push(`${dateObj.yearsLeft} лет`) : "";
  dateObj.monthsLeft > 0 ? result.push(`${dateObj.monthsLeft} месяцев`) : "";
  dateObj.daysLeft > 0 ? result.push(`${dateObj.daysLeft} дней`) : "";
  dateObj.hoursLeft > 0 ? result.push(`${dateObj.hoursLeft} часов`) : "";
  console.log(result.join(" "))
}

const timeIsOver = () => {
  console.log("Время вышло, завершение работы");
  emitterObject.removeListener('checkTime', checkTime);
  emitterObject.removeListener('decreaseTime', decreaseTime);
}

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

const checkTime = async () => {
  if (isTimeLeft()) {
    await delay().then(() => showTimeLeft(generateNewDateObj()));
    emitterObject.emit('decreaseTime');
  } else {
    timeIsOver();
  }
}

const decreaseTime = () => {
  timeDiff = timeDiff - ( 1000 * 60 * 60 ); // здесь вычитаю 1 час раз в секунду, т.к. иначе получается слишком долго ждать изменений времени, т.к. выводим часы, дни, месяцы, годы.
  emitterObject.emit('checkTime');
}

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

emitterObject.on('checkTime', checkTime);
emitterObject.on('decreaseTime', decreaseTime);

emitterObject.emit('checkTime');
