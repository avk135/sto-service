import React, { Component } from 'react';
import Header from '../components/global/Header';
import { NavLink } from 'react-router-dom';

import api from '../api';
import { Table, Typography, message, Divider, Button, Popconfirm } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import moment from 'moment';
import _ from 'lodash';

const { Title } = Typography;
const { Column } = Table;


class FillialDashBoard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    bookings: [],
    bookingsToday: []
  }

  setBookingsToday(bookingsToday) {
    this.setState({
      ...this.state,
      bookingsToday: bookingsToday
    })
  }

  async deleteBooking(bookingId) {
    let response = await api.deleteBookingById(bookingId);
    message.success(`Заказ удален ${response.name} - ${response.phone}`);

    await this.getBookingsByFillialId();
  }

  async completeBooking(bookingId) {
    let response = await api.completeBookingById(bookingId);
    message.success(`Заказ отмечен как выполенный ${response.name} - ${response.phone}`);

    await this.getBookingsByFillialId();
  }

  setBookings(bookings) {
    this.setState({
      ...this.state,
      bookings: bookings
    })
  }

  getBookingsByFillialId = async () => {
    const bookings = await api.getBookingsByFillialId(this.props.user._id);
    const bookingsToday = bookings.filter(booking => {
      return moment(booking.bookedAt).isSame(moment(), 'day');
    })
    this.setBookingsToday(bookingsToday);
    this.setBookings(bookings);
  }

  refreshBookings = () => {
    setInterval(async () => {
      const fetchedBookings = await api.getBookingsByFillialId(this.props.user._id);

      const newBookingsCount = fetchedBookings.length - this.state.bookings.length;

      if (newBookingsCount) {
        message.info(`Количество новых заказов ${newBookingsCount}`);
      }

      this.getBookingsByFillialId();
    }, 2000 * 60)
  }

  componentDidMount() {
    this.getBookingsByFillialId();
    this.refreshBookings()
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
            <Title level={3} className="text-center">Запись на сегодня</Title>
          </div>
          <div className="col-12 mt-4">
            <Table dataSource={this.state.bookingsToday} rowKey="_id" scroll={{ x: 1000 }} locale={
              {
                emptyText: 'Нет бронирований на сегодня'
              }
            }
              rowClassName={(record, index) => record.isComplited ? 'table-row-completed' : ''}
            >

              <Column
                title='Время'
                dataIndex='bookedAt'
                render={(date, row) => {
                  return <b>{moment(date).format('HH:mm')}</b>;
                }}
                sorter={(a, b) => moment(a.bookedAt).utc() - moment(b.bookedAt).utc()}
                showSorterTooltip={false}
                defaultSortOrder={'descend'}
              />
              <Column
                title='Имя'
                dataIndex='name'

                render={(name, row) => {
                  return <b>{name} - {row.carBrand}</b>;
                }}
              />
              <Column
                title='Телефон'
                dataIndex='phone'
              />
              <Column
                title='Комментарий'
                dataIndex='comment'
              />

              <Column
                title="Выполнено"
                key="completed"
                render={(text, record) => (
                  <span className="d-flex justify-content-center" >
                    <Popconfirm
                      title="Отметить как выполнено?"
                      onConfirm={() => {
                        this.completeBooking(record._id)
                      }}
                      okText="Выполнено"
                      cancelText="Отмена"
                    >
                      <Button type="primary" disabled={record.isComplited}><CheckOutlined /></Button>
                    </Popconfirm>

                  </span>
                )}
              />
              <Column
                title="Удалить"
                key="delete"
                render={(text, record) => (
                  <span className="d-flex justify-content-center" >
                    <Popconfirm
                      title="Действительно удалить бронь?"
                      onConfirm={() => {
                        this.deleteBooking(record._id)
                      }}
                      okText="Удалить"
                      cancelText="Отмена"
                    >
                      <Button type="danger"><DeleteOutlined /></Button>
                    </Popconfirm>

                  </span>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default FillialDashBoard;