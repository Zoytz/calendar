import moment from 'moment';
import { useRef, useState } from 'react';
import Day from '../Day/Day';

export type DailyTodoType = {
  time: string
  todo: string
};

export type DayType = {
  dayTitle: string,
  month: string,
  day: number,
  isCurrentDay: boolean,
  passed: boolean,
  dailyTodo: DailyTodoType[]
}

function App() {

  const [monthCount, setMonthCount] = useState(0);

  moment.updateLocale('ru', { week: { dow: 1 } });

  const ruMonths = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const dailyTodo = [
    {
      time: '9:00',
      todo: 'Молиться'
    },
    {
      time: '10:00',
      todo: 'Еще молиться'
    },
    {
      time: '11:00',
      todo: 'Поститься'
    },
    {
      time: '12:00',
      todo: 'Опять молиться'
    },
  ];

  const selectedMonth = moment().add(monthCount, 'month');
  const selectedMonthTitle = ruMonths[selectedMonth.month()];

  const startDayOfMonth = Number(selectedMonth.startOf('month').day());

  const daysInMonth = selectedMonth.daysInMonth();
  const neededDays = 42 - daysInMonth;

  const currentDay = Number(moment().format('D'));

  const currentMonthDays = [];

  for (let i = 1; i <= daysInMonth; i = i + 1) {

    let isCurrentDay: boolean = false;
    let passed: boolean = true;

    if (monthCount === 0) {
      isCurrentDay = currentDay === i;
      passed = currentDay > i;
    } else if (monthCount < 0) {
      isCurrentDay = false;
      passed = true;
    } else {
      isCurrentDay = false;
      passed = false;
    }

    const day = {
      dayTitle: 'Яблочный Спас',
      month: selectedMonthTitle,
      day: i,
      isCurrentDay,
      passed,
      dailyTodo
    };

    currentMonthDays.push(day);
  };

  const lastMonthDays = [];
  const previousMonth = selectedMonth.subtract(1, 'month');
  const daysInPreviousMonth = previousMonth.daysInMonth();

  for (let i = 0; i <= startDayOfMonth - 1; i = i + 1) {
    if (lastMonthDays.length === startDayOfMonth - 1) {
      break
    };

    const day = {
      dayTitle: 'Яблочный Спас',
      month: ruMonths[Number(previousMonth.format('M')) - 1],
      day: daysInPreviousMonth - i,
      isCurrentDay: false,
      passed: true,
      dailyTodo
    };

    lastMonthDays.push(day);
  };

  lastMonthDays.reverse();

  const nextMonthDays = [];
  const nextMonth = ruMonths[Number(selectedMonth.add(1, 'month').format('M'))];

  for (let i = 1; i <= neededDays - lastMonthDays.length; i = i + 1) {
    let passed: boolean = false;

    if (monthCount < 0) {
      passed = true;
    }

    const day = {
      dayTitle: 'Яблочный Спас',
      month: nextMonth,
      day: i,
      isCurrentDay: false,
      passed,
      dailyTodo
    };

    nextMonthDays.push(day);
  };

  const calendarData = [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];

  const handleDecrementMonth = () => {
    setMonthCount(monthCount - 1);
  };

  const handleIncrementMonth = () => {
    setMonthCount(monthCount + 1);
  };

  const listRef: any = useRef();

  return (
    <div className='page'>
      <main className='main'>
        <h1 className='main__title'>
          Расписание богослужений
        </h1>
        <ul ref={listRef} className='days page__list'>
          {
            calendarData.map((day) => {
              return <Day listRef={listRef} key={day.day + day.month} day={day} />
            })
          }
        </ul>
      </main>
      <footer className='footer'>
        <button onClick={handleDecrementMonth} type='button' className='footer__button'>&#129040;</button>
        <p className='footer__month'>
          {selectedMonthTitle} {selectedMonth.format('yyyy')}
        </p>
        <button onClick={handleIncrementMonth} type='button' className='footer__button'>&#129042;</button>
      </footer>
    </div>
  );
}

export default App;
