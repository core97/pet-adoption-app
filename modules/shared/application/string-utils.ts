type DateFormats = 'yyyy-mm-dd';

export const formatDateToString = (
  date: number | Date | string,
  format: DateFormats
) => {
  const validDate = typeof date === 'string' ? new Date(date) : date;
  const locale: Record<DateFormats, string> = {
    'yyyy-mm-dd': 'fr-CA',
  };

  const formatOptions: Record<DateFormats, Intl.DateTimeFormatOptions> = {
    'yyyy-mm-dd': {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    },
  };

  const formattedDate = new Intl.DateTimeFormat(
    locale[format],
    formatOptions[format]
  ).format(validDate);

  return formattedDate;
};