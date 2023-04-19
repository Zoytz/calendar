import { FC, useRef } from 'react';
import { DayType } from '../App/App';

type PropsType = {
  handleSelectDay: (param: string) => void
  selectedDay: string
  day: DayType
  listRef: any
};

const Day: FC<PropsType> = (props) => {

  const { dayTitle, month, day, isCurrentDay, passed, dailyTodo, id } = props.day;
  const { handleSelectDay, selectedDay } = props;

  const isDayChecked = selectedDay === id;

  const handleCardSelect = (e: any) => {

    if (selectedDay === id) {
      handleSelectDay('');
    } else {
      handleSelectDay(id);
    }

    const listPosition = props.listRef.current.getBoundingClientRect();
    const dayPosition = e.target.getBoundingClientRect();
    const relativeLeftPosition = dayPosition.left - listPosition.left;

    infoRef.current.style.width = `${props.listRef.current.getBoundingClientRect().width}px`;
    infoRef.current.style.left = `-${relativeLeftPosition}px`;
  };

  const infoRef: any = useRef();

  return (
    <>
      <li onClick={handleCardSelect} className={`day ${passed ? 'day_type_passed' : ''} ${isCurrentDay ? 'day_type_current' : ''} ${isDayChecked ? 'day_type_selected' : ''}`}>
        <h2 className='day__number'>
          {day}
        </h2>
        <p className='day__month'>
          {
            isCurrentDay
            ?
            'Сегодня'
            :
            month
          }
        </p>
        <div ref={infoRef} className={`day__info ${isDayChecked ? 'day__info_type_checked' : ''}`}>
          <h2 className='day__title'>
            {dayTitle}
          </h2>
          <ul className='day__todos page__list'>
            {
              dailyTodo.map((todo) => {
                return (
                  <li key={todo.time} className='day__todo'>
                    {todo.time} {todo.todo}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    </>
  )
};

export default Day;