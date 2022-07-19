import React, { useState, useEffect } from 'react';
import { Calendar, Button, Modal, Typography } from 'antd';
import classNames from "classnames";
import api from '../../api';

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

const makeBookingHours = (startHour, endHour) => {
  const bookingHours = [];

  const startHourSplitted = startHour.split(':');
  const endHourSplitted = endHour.split(':');
  const startHours = moment().hour(startHourSplitted[0]).minutes(startHourSplitted[1]).second(0);
  const endHours = moment().hour(endHourSplitted[0]).minutes(endHourSplitted[1]).second(0);

  bookingHours.push({
    time: startHour
  });

  for (let i = 1; i <= 28; i++) {
    const nextHour = moment(startHours).add(30 * i, 'm');

    // //remove if every half hour 
    // if (nextHour.minutes() === 30) { 
    //   continue;                       
    // }                               

    if (nextHour.diff(moment(endHours).add(30, 'm'), 'minutes') >= 0) {
      break;
    };
    bookingHours.push({
      time: nextHour.format('HH:mm')
    });
  }

  return bookingHours;
}

export const ChooseDate = (props) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [timePickerModalVisible, setTimePickerModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookings, setBookings] = useState([]);

  const fillial = props.fillial;

  const hours = makeBookingHours(fillial.startBookingAt, fillial.endBookingAt);

  const getBookings = async () => {
    try {
      const bookings = await api.getBookingsByFillialId(fillial._id);
      setBookings(bookings);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  const acceptableMonths = [
    moment().month(),
    moment().month() + 1,
    moment().month() + 2
  ]


  const onSelect = (date) => {
    setCurrentDate(date);
    setTimePickerModalVisible(true);
  }

  const handleTimeSelect = (i) => {
    const time = hours[i].time.split(':');
    setSelectedTime(i);
    setCurrentDate(moment(currentDate).hour(time[0]).minutes(time[1]))
    props.onDateSelect(moment(currentDate).hour(time[0]).minutes(time[1]));
    setTimePickerModalVisible(!timePickerModalVisible);
  }

  const handleCancel = () => {
    setTimePickerModalVisible(!timePickerModalVisible);
    setSelectedTime(null);
    setCurrentDate(currentDate);
  }

  const isHourSelectorDisabled = (hour) => {
    const hours = hour.time.split(':')[0];
    const minutes = hour.time.split(':')[1];
    const HOUR = moment(currentDate.hour(hours).minutes(minutes).second(0).millisecond(0));

    const isBooked = bookings.some(booking => {
      return moment(booking.bookedAt).isSame(HOUR);
    });

    return isBooked || (moment(currentDate).date() === moment().date()
      && moment().diff(moment().hours(hours).minutes(minutes), 'minutes') > 0)
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
      <div className="mt-5">
        <Calendar
          value={currentDate}
          dateCellRender={dateCellRender}
          validRange={[moment().hour('00'), moment().month(moment().month() + 3).subtract(1, 'days')]}
          onSelect={onSelect}
          headerRender={() => null}
        />
      </div>
      <Modal
        title="Выберите удобное для вас время"
        centered
        visible={timePickerModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key={'cancel'} onClick={handleCancel}>Записаться на другую дату</Button>
        ]}
      >
        <Title key={'title'} className="text-center" level={3}>Дата: {`
           ${monthsNames[moment(currentDate).month()]} 
           ${daysNames[moment(currentDate).day()]} 
           ${moment(currentDate).format("DD")}
           `}
        </Title>
        <div className="hours-container">
          {
            hours.map((hour, i) => {
              return (
                <div className={
                  classNames({
                    'disabled': isHourSelectorDisabled(hour),
                    'hour': true,
                    'selected': i === selectedTime
                  })}
                  key={hour.time}
                  onClick={
                    () => {
                      if (isHourSelectorDisabled(hour)) return;
                      handleTimeSelect(i);
                    }
                  }
                >
                  {hour.time}
                </div>
              )
            })
          }
        </div>
      </Modal>
    </div>
  )
} 