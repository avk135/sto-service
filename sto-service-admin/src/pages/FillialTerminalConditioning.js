import React, { Component } from 'react';
import { Button, Table, Typography, message } from 'antd';
import { NavLink } from 'react-router-dom';

import moment from 'moment';

import { Input, Modal } from 'antd';

import Bill from '../components/terminal/Bill';
import BillToPrint from '../components/terminal/BillToPrint'
import { DeleteOutlined, PrinterOutlined } from '@ant-design/icons'
import api from '../api';

const { Column } = Table;
const { Title } = Typography;

export default class FillialTerminalConditioning extends Component {
  state = {
    tireFittingGoods: [],
    conditioningGoods: [],
    tireRepair: [],
    additionalServices: [],
    bill: [

    ],
    customGoodName: '',
    customGoodPrice: '',
    total: 0,
    conditioningGoodsVisible: false,
    additionalServicesVisible: false,
    printing: false,
    discount: 0
  }

  getTireFittingGoods = async () => {
    const tireFittingGoods = await api.getTireFittingGoods();

    this.setState({
      ...this.state,
      tireFittingGoods
    });
  }

  addToBill = (text, row, title = '') => {
    const bill = this.state.bill;

    bill.push({
      name: `${row.title} ${title}`,
      price: text
    })


    this.info();

    let total = 0;

    if (bill.length) {
      let prices = bill.map(good => {
        return good.price;
      })

      total = prices.reduce((sum, current) => {
        return sum + current;
      })

      total = total.toFixed(2);
    }

    this.setState({
      ...this.state,
      bill,
      total
    })
  }

  addCustomGood = () => {
    const bill = this.state.bill;

    if (!this.state.customGoodName.length || !this.state.customGoodPrice.length) {
      this.error();
      return;
    }

    bill.push({
      name: `${this.state.customGoodName}`,
      price: Number(this.state.customGoodPrice)
    });

    this.info();

    let total = 0;

    if (bill.length) {
      let prices = bill.map(good => {
        return good.price;
      })

      total = prices.reduce((sum, current) => {
        return sum + current;
      })

      total = total.toFixed(2);
    }

    this.setState({
      ...this.state,
      bill,
      total,
      customGoodName: '',
      customGoodPrice: ''
    })
  }

  saveBill = () => {
    const fillialId = this.props.user._id;

    const { total, discount } = this.state;

    const goods = this.state.bill.map((good) => {
      return `${good.name} - ${good.price} р`
    })

    const date = moment().format('YYYY-DD-MM')
    const time = moment().format('HH:mm');

    const payload = {
      fillialId,
      goods,
      total,
      discount,
      date,
      time
    }

    api.saveBill(payload)
  }

  removeFromBill = (_, i) => {
    const bill = this.state.bill;

    bill.splice(i, 1);

    let total = 0;

    if (bill.length) {
      let prices = bill.map(good => {
        return good.price;
      })

      total = prices.reduce((sum, current) => {
        return sum + current;
      })

      total = total.toFixed(2);
    }

    this.setState({
      ...this.state,
      bill,
      total
    })
  }

  setDiscount = discount => {
    this.setState({
      ...this.state,
      discount
    })
    console.log(discount);
  }

  error = () => {
    message.error('Введите название и цену!');
  }

  info = () => {
    message.info('Добавлено!');
  }

  async componentDidMount() {
    const tireFittingGoods = await api.getTireFittingGoods();
    const conditioningGoods = await api.getConditioningGoods();
    const tireRepair = await api.getTireRepair();
    const additionalServices = await api.getAdditionalServices();

    this.setState({
      ...this.state,
      tireFittingGoods,
      conditioningGoods,
      tireRepair,
      additionalServices
    });
  }

  render() {
    return (
      <>
        <div className="print">
          <BillToPrint discount={this.state.discount} bill={this.state.bill} user={this.props.user} total={this.state.total} />
        </div>
        <div className="container not-print">
          <div className="row mt-3">
            <div className="col-12">
              <Title level={1} className="text-center">
                Терминал - Кондиционеры
            </Title>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-4">
              <NavLink to="/fillial-terminal">
                <Button block size="large">Назад</Button>
              </NavLink>
            </div>
            <div className="col-4" >
              <Button onClick={() => {
                this.setState(
                  {
                    ...this.state,
                    additionalServicesVisible: true
                  }
                )
              }} block type="primary" size="large">Дополнительные Услуги</Button>
            </div>
            <div className="col-4" >
              <Button onClick={() => {
                this.setState(
                  {
                    ...this.state,
                    conditioningGoodsVisible: true
                  }
                )
              }}
                block
                type="primary"
                size="large">
                Ремонт Шин
            </Button>
            </div>
          </div>
          <Modal
            visible={this.state.additionalServicesVisible}
            cancelText="Закрыть"
            onOk={() => {
              this.setState(
                {
                  ...this.state,
                  additionalServicesVisible: false
                }
              )
            }}
            onCancel={() => {
              this.setState(
                {
                  ...this.state,
                  additionalServicesVisible: false
                }
              )
            }}>
            <Table rowKey="_id" dataSource={this.state.additionalServices} className="prices-table">
              <Column dataIndex="title" width="80%" title="Наименование услуг" />
              <Column dataIndex="price" title="Цена" render={(text, row) => {
                return <Button type="primary" onClick={() => this.addToBill(row.price, row)}>{row.price} р</Button>
              }} />
            </Table>
          </Modal>
          <Modal
            visible={this.state.conditioningGoodsVisible}
            cancelText="Закрыть"
            onOk={() => {
              this.setState(
                {
                  ...this.state,
                  conditioningGoodsVisible: false
                }
              )
            }}
            onCancel={() => {
              this.setState(
                {
                  ...this.state,
                  conditioningGoodsVisible: false
                }
              )
            }}>
            <Table rowKey="_id" dataSource={this.state.tireRepair} className="prices-table">
              <Column dataIndex="title" width="80%" title="Наименование услуг" />
              <Column dataIndex="price" title="Цена" render={(text, row) => {
                return <Button type="primary" onClick={() => this.addToBill(row.price, row)}>{row.price} р</Button>
              }} />
            </Table>
          </Modal>
          <div className="row mt-5">
            <div className="col-4" >
              <Bill onSaveBill={this.saveBill} handleDiscountChange={this.setDiscount} user={this.props.user} bill={this.state.bill} total={this.state.total} onDelete={this.removeFromBill} />
            </div>
            <div className="col-8">
              <div className="my-4 d-flex">
                <Input placeholder="Название Услуги" value={this.state.customGoodName} onChange={e => this.setState({
                  ...this.state,
                  customGoodName: e.target.value
                })} />
                <Input placeholder="Цена" className="ml-2" type="number" value={this.state.customGoodPrice} onChange={e => this.setState({
                  ...this.state,
                  customGoodPrice: e.target.value
                })} />
                <Button type="primary" className="ml-2" onClick={() => {
                  this.addCustomGood()
                }}>Добавить</Button>
              </div>
              <Table rowKey="_id" dataSource={this.state.conditioningGoods} className="prices-table prices-table_text-left">
                <Column dataIndex="title" width="80%" title="Наименование услуг" />
                <Column dataIndex="price" title="Цена" render={(text, row) => {
                  return <Button type="primary" onClick={() => this.addToBill(text, row)}> {text} р</Button>
                }}/>
              </Table>
            </div>
          </div>


        </div>
      </>
    )
  }
}