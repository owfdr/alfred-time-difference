function run(argv: string[]) {
  // -- parse args --
  const arg0 = argv[0] ?? "";
  const args = arg0.split(" ");

  const time = {
    a: args[0],
    b: args[1] === "-" ? args[2] : args[1],
  };

  // -- validate args --
  if (time.a === undefined) {
    return "error=please enter a time to calculate.";
  }

  // -- set up current time --
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (time.a === "now") {
    time.a = `${hour}:${minute}`;
  }

  if (time.b === "now") {
    time.b = `${hour}:${minute}`;
  }

  if (time.b === undefined) {
    time.b = `${hour}:${minute}`;
  }

  if (!time.a.includes(":") || !time.b.includes(":")) {
    return "error=not a valid format. please enter your time like '8:30'.";
  }

  // -- validate hour and minute --
  const [aHourSting, aMinuteString] = time.a.split(":");
  const [bHourString, bMinuteString] = time.b.split(":");

  const aHour = Number(aHourSting);
  const aMinute = Number(aMinuteString);
  const bHour = Number(bHourString);
  const bMinute = Number(bMinuteString);

  const isNaN = Number.isNaN;

  if (isNaN(aHour) || isNaN(aMinute) || isNaN(bHour) || isNaN(bMinute)) {
    return "error=please enter your time in a correct format. example: '8:30'";
  }

  const aTime = aHour * 60 + aMinute;
  const bTime = bHour * 60 + bMinute;

  if (aTime % 1 !== 0 || bTime % 1 !== 0) {
    return "error=time must be an integer.";
  }

  // -- find out time difference --
  const timeDifference = Math.abs(aTime - bTime);
  const hourDifference = Math.floor(timeDifference / 60);
  const minuteDifference = timeDifference % 60;

  const paddedMinuteDifference =
    minuteDifference / 10 < 1 ? `0${minuteDifference}` : minuteDifference;
  const output = `${hourDifference}:${paddedMinuteDifference}`;

  // -- done it! --
  return output;
}
