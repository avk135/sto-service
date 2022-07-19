import React, { Component } from "react";

import _ from 'lodash'

import { Typography, Divider, Button, List } from 'antd';
import { DeleteOutlined, PrinterOutlined  } from '@ant-design/icons'

import BillToPrint from '../terminal/BillToPrint'

const { Title, Text } = Typography;

const discounts = [
  0,
  10,
  15,
  20
]

export default class Bill extends Component{
  constructor(props) {
    super(props);
  } 

  state = {
    total: 0,
    discount: 0,
    printing: false
  }

  setDiscount = (discount) => {
    this.props.handleDiscountChange(discount);
    this.setState({
      ...this.state,
      discount
    })
  }

  print = () => {
    let print = document.querySelector('.print').querySelector('.inner');

    const oldStyles = document.querySelector('style.print-styles');

    if(oldStyles){
      oldStyles.remove();
    }

    let height = print.scrollHeight;

    const css = `
    @media print {
      @page {
        size: 44mm ${height}px;
      }
    }  
    `,

    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.setAttribute('class','print-styles');
    head.appendChild(style);

    style.type = 'text/css';
    
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    this.props.onSaveBill();
    window.print();
  }

  render(){
    return (
      <div id="bill">
        <Title level={1} className="text-center pt-3">ЧЕК</Title>
        <Divider></Divider>
        <div>
          <List
            locale={
              {
                emptyText: 'Ничего не выбрано'
              }
            }
            dataSource={this.props.bill}
            renderItem={(item,i) => (
              <List.Item key={i}>
                <div className="d-flex">
                  <Title level={4}><Text code>{i + 1}.</Text>  {item.name} - {item.price} р</Title>
                  <Button 
                    style={{ 'flex': 2,'minWidth':'35px'}}
                    className="ml-2"
                    size="large" 
                    type="primary" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => this.props.onDelete(item, i)}
                  />
                </div>
              </List.Item>
            )}
          />
        </div>
        <Divider></Divider>
        <div>
          <Title level={3} className="text-center" >ИТОГО: {(this.props.total - (this.props.total * this.state.discount / 100)).toFixed(2)} р</Title>
        </div>
        <Divider></Divider>
        <div className="d-flex">
          <Title level={4}>Скидка: 
            
          </Title>
          <div className="ml-2 d-flex">
            {
              discounts.map(discount => <Button key={discount} type={this.state.discount === discount ? 'primary' : ''} className="ml-2" block onClick={() => {
                this.setDiscount(discount)
              }}>{discount}%</Button>)
            }
          </div>
        </div> 
        
        <Button icon={<PrinterOutlined />} disabled={!this.props.bill.length} onClick={() => this.print()} className="my-3" block type="primary" size="large">
          Печать
        </Button>

        
      </div>
    )
  }
}