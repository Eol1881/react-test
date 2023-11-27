import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from '@tremor/react';
import { ru } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { dateExtractor } from '../../utils/dateExtractor';
import { DateRange } from '../../routes/Root';

interface Props {
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const DatePicker: React.FC<Props> = ({ setDateRange }) => {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: dateExtractor.getFirstDayOfMonth(),
    to: dateExtractor.getThisDay(),
  });

  useEffect(() => {
    if (!value.from || !value.to) return;
    setDateRange({
      from: value.from,
      to: value.to,
    });
  }, [value, setDateRange]);

  return (
    <DateRangePicker
      className="date-range mx-auto mt-6 max-w-xs flex-col"
      value={value}
      onValueChange={setValue}
      locale={ru}
      selectPlaceholder="Выбрать период"
      placeholder="Выбрать период"
      color="rose"
      weekStartsOn={1}
    >
      <DateRangePickerItem
        key="ytd"
        value="ytd"
        from={dateExtractor.getFirstDayOfMonth()}
        to={dateExtractor.getThisDay()}
      >
        Текущий месяц
      </DateRangePickerItem>
      <DateRangePickerItem
        key="half"
        value="half"
        from={dateExtractor.getFirstDayOfPrevMonth()}
        to={dateExtractor.getLastDayOfPrevMonth()}
      >
        Прошлый месяц
      </DateRangePickerItem>
    </DateRangePicker>
  );
};
