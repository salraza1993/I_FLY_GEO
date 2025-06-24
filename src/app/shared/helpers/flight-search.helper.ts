import { easepick } from "@easepick/core";

export function getDatePickerSetup(picker: easepick.Core) {
  const prices: { [key: string]: string } = {
    '2023-12-03': "10AED",
    '2023-12-07': "100AED",
    '2023-12-08': "89AED",
    '2023-12-11': "50AED",
    '2023-12-15': "70AED",
    '2023-12-16': "0AED",
    '2023-12-17': "50AED",
    '2023-12-21': "890AED",
  };

  // add price to day element
  picker.on('view', (evt) => {
    const { view, date, target } = evt.detail;
    const d = date ? date.format('YYYY-MM-DD') : null;

    if (view === 'CalendarDay' && prices[d]) {
      const span = target.querySelector('.day-price') || document.createElement('span');
      span.className = 'day-price';
      span.innerHTML = `${prices[d]}`;
      target.append(span);
    }
  });
}