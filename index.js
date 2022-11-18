import colors from "colors"

const [min, max] = process.argv.slice(2);

const showError = () => {
  const userError = new TypeError("Parameter is not a number");
  console.log(colors.red(userError.name));
  console.log(colors.red(userError.message));
}

const showNumbers = () => {
  let hasSimpleNumbers = false;

  const colorsArray = ["green", "yellow", "red"];
  let currentindex = 0;
  
  const setNextIndex = () => {
    if (currentindex >= 0 || currentindex < colorsArray.length) {
      currentindex = currentindex + 1;
    }
    if (currentindex === colorsArray.length) {
      currentindex = 0;
    }
  }
  
  for (let number = min; number <= max; number++) {
    if (number % 2 === 0) {
      console.log(colors[colorsArray[currentindex]](number));
      hasSimpleNumbers = true;
      setNextIndex();
    }
  }
  
  if (!hasSimpleNumbers) {
    console.log(colors.red("Простых чисел нет"));
  }
}

const integerRegex = /^(0|[1-9]\d*)([.,]\d+)?$/;

const isInteger = (val) => {
  return integerRegex.test(val);
};

const init = () => {
  if (isInteger(min) && isInteger(max)) {
    showNumbers();
  } else {
    showError();
  }
}
init();