export const formatDate = (string, modifications) => {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  if (modifications.includes('short')) {
    options = {
      month: 'short',
      day: '2-digit',
    };
  }
  if (modifications.includes('monthInNumbers')) {
    options = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    };
  }
  if (modifications.includes('includeWeekday')) {
    options.weekday = 'long';
  }
  if (modifications.includes('includeHour')) {
    options.hour = 'numeric';
  }
  if (modifications.includes('includeMinute')) {
    options.minute = '2-digit';
  }
  return new Date(string).toLocaleDateString([], options);
};

export const removeNonNumerics = (value) => {
  return value.replace(/[^0-9]+/g, '');
};

export const convertFloatToMinuteFormat = (value) => {
  const minutes = parseInt(Math.floor(value));
  const seconds = ((value - Math.floor(value)) * 60).toString();
  return `${minutes}:${seconds.length == 2 ? seconds : `${seconds}0`}`;
};
