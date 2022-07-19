import React, {Component} from 'react';
import { Typography, Divider, Button, List } from 'antd';

const { Title, Text } = Typography;

export default class BillToPrint extends Component{
  render(){
    return(
      <div>
        <div className="inner">
          <Title level={4} className="text-center">
            ЧЕК
          </Title>
          <div className="text-center">
            <h4>Шиномонтаж Шинлэнд</h4>
            <h4>{this.props.user.address}</h4>
            <h4>{this.props.user.phone}</h4>
          </div>
          <Divider/>
          {
            this.props.bill.map((item, i) => {
              return <h4><Text code>{i + 1}.</Text>  {item.name} - {item.price} р</h4>
            })
          }
          <Divider />
          <h4 className="py-1">
            Скидка: {this.props.discount}%
          </h4>
          <h4 className="py-1">
            Стоимость: {(this.props.total - (this.props.total * this.props.discount / 100)).toFixed(2)} р
          </h4>
          <Divider />
          <h3 className="text-center">Спасибо что выбрали нас.</h3>
        </div>
      </div>
    )
  }
}