export const formatDate = (string, modifications) => {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
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
