import React, { Component } from 'react';
import Header from '../components/global/Header';
import { NavLink } from 'react-router-dom';
import { Divider, Typography, Modal } from 'antd';
import FillialBookingsByDates from '../components/fillials/FillialBookingsByDates';
import moment from 'moment';
import api from '../api';

const { Title } = Typography;

class FillialsDashBoardAllDates extends Component {

  state = {
    selectedDate: moment().format('YYYY-MM-DD 00:00:00'),
    bookings: [],
    bookingsByDate: [],
    visible: false
  }

  onSelectDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: moment(date).format('YYYY-MM-DD 00:00:00')
    }, () => {
      this.setState({
        ...this.state,
        visible: true,
        bookingsByDate: this.filterBookingsByDate(date)
      })
    });
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      visible: false,
    })
  }

  filterBookingsByDate = (date) => {
    let bookingsByDate = this.state.bookings.filter(booking => {
      return moment(booking.bookedAt).isSame(moment(date), 'day');
    });

    bookingsByDate = bookingsByDate.sort((a, b) => moment(a.bookedAt).utc() - moment(b.bookedAt).utc());



    return bookingsByDate;
  }

  getBookings = async () => {
    try {
      const bookings = await api.getBookingsByFillialId(this.props.user._id);
      this.setState({
        ...this.state,
        bookings
      });

      console.log(bookings);
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidMount() {
    await this.getBookings();
  }

  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className="сol-12 col-md-8 offset-md-2">
            <Header user={this.props.user} onLogout={this.props.onLogout} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="navigation">
              <NavLink exact={true} activeClassName='is-active' to='/fillial'>Запись на сегодня</NavLink>
              <NavLink activeClassName='is-active' to='/fillial-bookings'>Все записи</NavLink>
              <NavLink activeClassName='is-active' to='/fillial-terminal'>Терминал</NavLink>
            </div>
            <Divider />
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-12">
            <Title level={3} className="text-center">Все Записи</Title>
          </div>
          <div className="col-12 mt-5">
            <Modal visible={this.state.visible} width={'700px'} onCancel={this.toggleModal} onOk={this.toggleModal} footer={null}>
              <div className="bookings-list py-2">
                <Title key="title" level={3} className="text-center m-0">
                  Дата {moment(this.state.selectedDate).format('DD.MM')}
                </Title>
                <Divider />
                {
                  this.state.bookingsByDate.length
                    ?
                    this.state.bookingsByDate.map((booking) => {
                      return (
                        <div key={booking._id}>
                          <div className="bookings-item">
                            <b>
                              {moment(booking.bookedAt).format('DD.MM HH:mm')}
                            </b>
                            <span>
                              {booking.phone}
                            </span>
                            <span>
                              {booking.name}
                            </span>
                            <span>
                              {booking.comment}
                            </span>
                          </div>
                          <Divider />
                        </div>
                      )
                    })
                    :
                    <Title className="text-center" key={'no-bookings'} level={3}>Бронирований на этот день нет</Title>
                }
              </div>
            </Modal>
            <FillialBookingsByDates onSelectDate={this.onSelectDate} />
          </div>
        </div>
      </div>
    )
  }
}

export default FillialsDashBoardAllDates;