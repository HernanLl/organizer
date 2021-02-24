import * as Constants from "./constants";

function getIconCode(iconId) {
  if (iconId >= 200 && iconId <= 232) return 200;
  if (iconId >= 300 && iconId <= 321) return 300;
  if (iconId >= 500 && iconId <= 531) return 500;
  else return iconId;
}
function getIcon(code) {
  switch (parseInt(code)) {
    case 200:
      return require("../assets/thunderstorm.svg");
    case 300:
      return require("../assets/drizzle.svg");
    case 500:
      return require("../assets/rain.svg");
    case 800:
      return require("../assets/clear.svg");
    case 801:
      return require("../assets/cloud1.svg");
    case 802:
      return require("../assets/cloud2.svg");
    case 803:
      return require("../assets/cloud3.svg");
    case 804:
      return require("../assets/cloud4.svg");
    default:
      return require("../assets/clear.svg");
  }
}
function getDays() {
  const date = new Date(Date.now());
  const days = Constants.days;
  const actualDay = date.getDay();
  let arr = [];
  arr.push(...days.slice(actualDay + 1));
  arr.push(...days.slice(0, actualDay));
  arr = arr.slice(0, 4);
  return arr;
}
export { getIcon, getIconCode, getDays };
