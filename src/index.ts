interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

function formaterNormalize(
  formatter: string | ((dateInfo: DateInfo) => string)
): (dateInfo: DateInfo) => string {
  if (typeof formatter === "function") {
    return formatter;
  }
  let matchPattern = formatter;
  switch (matchPattern) {
    case "date":
      matchPattern = "yyyy-MM-dd";
      break;
    case "datetime":
      matchPattern = "yyyy-MM-dd hh:mm:ss";
      break;
  }

  return (dateInfo: DateInfo) => {
    const replaceMap: { [key: string]: string } = {
      yyyy: dateInfo.yyyy,
      MM: dateInfo.MM,
      dd: dateInfo.dd,
      hh: dateInfo.hh,
      mm: dateInfo.mm,
      ss: dateInfo.ss,
    };
    for (const key in replaceMap) {
      matchPattern = matchPattern.replace(key, replaceMap[key]);
    }

    return matchPattern;
  };
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const formaterFunction = formaterNormalize(formatter);

  const getPadString = (str: number) => {
    return isPad ? str.toString().padStart(2, "0") : str.toString();
  };

  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    yyyy: date.getFullYear().toString(),
    MM: getPadString(date.getMonth() + 1),
    dd: getPadString(date.getDate()),
    hh: getPadString(date.getHours()),
    mm: getPadString(date.getMinutes()),
    ss: getPadString(date.getSeconds()),
  };

  return formaterFunction(dateInfo);
}
