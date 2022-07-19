import React, { Component } from 'react';
import { Typography, Button, Divider, Card, List } from 'antd';
import { Link } from 'react-router-dom';
import api from '../api';

const { Title, Text } = Typography;

class FillialInfoBillings extends Component {
  state = {
    billings: [],
    fillial: [],
    total:0
  }

  async componentDidMount() {
    const { id,date } = this.props.match.params;
    const fillial = await api.getFillialById(id);
    let billings = await api.getBills(id, date);
    billings = billings.bills;
    let total = billings.map(bill => parseFloat((bill.total - (bill.total * bill.discount / 100)).toFixed(2)))
    total = total.reduce((accumulator,current) => accumulator + current);

    this.setState({
      fillial,
      billings,
      total
    });
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 py-5">
            <Link to="/">
              <Button type="primary">Назад</Button>
            </Link>
          </div>
          <div className="col-12 py-1">
            <Title level={3}>{this.state.fillial.address}</Title>
            <Title level={3}>Данные по терминалу на - <Text code>{this.props.match.params.date}</Text></Title>
          </div>
        </div>
        <div className="row">
          <Divider />
          <div className="col-12">
            <h2>Общая выручка по терминалу: {this.state.total} р</h2>
          </div>
          <Divider/>
        </div>
        <div>
            {
              this.state.billings.length
              ?
              <div className="row">
                  {
                    this.state.billings.map(bill =>
                    <div className="col-3" key={bill._id}>
                      <Card title={`Время: ${bill.time}`} bordered={true}>
                        {
                        <List
                          className="pa-1"
                          size="small"
                          dataSource={bill.goods}
                          renderItem={(item,i) => <List.Item><h3>{i + 1}. {item}</h3> </List.Item>}
                        />
                        }
                        <Divider />
                        <h3>Цена: {bill.total} р</h3>
                        <h3>Скидка: {bill.discount}%</h3>
                        <h3>К оплате: {(bill.total - (bill.total * bill.discount / 100)).toFixed(2)} р</h3>
                      </Card>
                    </div>)
                  }
                  </div>
                :
                <div className="col-12 py-5">
                  <Title level={3}>Данных нет</Title>
                </div>
            }
          </div>
        </div>

    );
  }
}

export default FillialInfoBillings;