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

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const dateInfo: DateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    yyyy: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString(),
    dd: date.getDate().toString(),
    hh: date.getHours().toString(),
    mm: date.getMinutes().toString(),
    ss: date.getSeconds().toString(),
  };

  if (typeof formatter === "function") {
    return formatter(dateInfo);
  }

  let matchPattern = formatter;

  if (formatter === "date") {
    matchPattern = "yyyy-MM-dd";
  } else if (formatter === "datetime") {
    matchPattern = "yyyy-MM-dd hh:mm:ss";
  }

  const getPadString = (value: string) =>
    isPad ? value.padStart(2, "0") : value;

  const replaceMap: { [key: string]: string } = {
    yyyy: dateInfo.yyyy,
    MM: getPadString(dateInfo.MM),
    dd: getPadString(dateInfo.dd),
    hh: getPadString(dateInfo.hh),
    mm: getPadString(dateInfo.mm),
    ss: getPadString(dateInfo.ss),
  };

  for (const key in replaceMap) {
    matchPattern = matchPattern.replace(key, replaceMap[key]);
  }

  return matchPattern;
}
