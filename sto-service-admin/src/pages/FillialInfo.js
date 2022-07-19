import React, { Component } from 'react';
import { Calendar, Typography, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';

import api from '../api';

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
    'Ноябрь',
    'Декабрь',
  ]
});

const { Title } = Typography;

const daysNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];



class FillialInfo extends Component {
  state = {
    currentDate: moment(),
    fillial: {}
  };

  onSelect = (date) => {
    this.setCurrentDate(date);
    this.props.history.push(`/fillial-info/${this.state.fillial._id}/${moment(date).format('YYYY-DD-MM')}`);
  }

  setCurrentDate = (date) => {
    this.setState({
      ...this.state,
      currentDate: date
    })
  }

  async componentDidMount() {
    const fillial = await api.getFillialById(this.props.match.params.id);

    this.setState({
      ...this.state,
      fillial
    })
  }

  dateCellRender = (moment) => {
    return (
      <div className="calendar-day">
        {daysNames[moment.day()]}
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <Link to="/"><Button type="primary">Назад</Button></Link>
          </div>
          <div className="col-12 py-5">
            <Title level={4}>
              Филлиал {this.state.fillial.address}
            </Title>
            <Divider />
          </div>
          <div className="col-12 py-1">
            <Calendar
              value={this.state.currentDate}
              dateCellRender={this.dateCellRender}
              onSelect={(date) => {
                this.onSelect(date)
              }}
              locale={{
                "lang": {
                  "locale": "en_US",
                  "placeholder": "Select date",
                  "rangePlaceholder": ["Start date", "End date"],
                  "today": "Today",
                  "now": "Now",
                  "backToToday": "Back to today",
                  "ok": "Ok",
                  "clear": "Clear",
                  "month": "Месяц",
                  "year": "Год",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FillialInfo;