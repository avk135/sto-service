import React, { useState, useEffect } from 'react';
import { Calendar, Button, Modal, Typography } from 'antd';

import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

moment.updateLocale('en', {
  weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  monthsShort: [
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
  ]
});

const daysNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const { Title } = Typography;

const dateCellRender = (moment) => {

  return (
    <div className="calendar-day">
      {daysNames[moment.day()]}
    </div>
  )
}

const monthsNames = [
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

export const FillialBookingsByDates = (props) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const acceptableMonths = [
    moment().month(),
    moment().month() + 1,
    moment().month() + 2
  ]


  const onSelect = (date) => {
    setCurrentDate(date);
    props.onSelectDate(date);
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        {
          acceptableMonths.map(acceptableMonth => {
            return (
              <Button block className="mx-2"
                type={moment(currentDate).month() === acceptableMonth ? "primary" : "default"}
                size="large"
                onClick={() => {
                  setCurrentDate(moment().month(acceptableMonth))
                }}
                key={acceptableMonth}
              >
                {monthsNames[acceptableMonth]}
              </Button>
            )
          })
        }
      </div>
      <div className="py-5">
        <Calendar
          value={currentDate}
          dateCellRender={dateCellRender}
          validRange={[moment().hour('00'), moment().month(moment().month() + 3).subtract(1, 'days')]}
          headerRender={() => null}
          onSelect={onSelect}
        />
      </div>
    </div>
  )
}

export default FillialBookingsByDates;