import React, { Component } from 'react';

import { Modal, Input, Typography } from 'antd';
import api from '../../api';

const { Title } = Typography;

class UpdatePricesDefaultModal extends Component {
  state = {
    _id: '',
    title: '',
    price: '',
  };

  componentWillReceiveProps() {
    this.setState({
      ...this.props.product
    })
  }


  render() {
    const { visible, onCancel, onOk } = this.props;
    const { _id, title, price } = this.state;

    return (
      <Modal visible={visible} onCancel={onCancel} onOk={() => {
        onOk(
          _id,
          {
            title,
            price: parseFloat(price),
          });
      }}>
        <div className="pt-3">
          <Title level={3}>{title}</Title>
          <div className="pt-3">
            <span>Цена</span>
            <Input className="mt-3" value={price} onChange={e => this.setState({ price: e.target.value })} />
          </div>
        </div>
      </Modal>
    );
  }
}

export default UpdatePricesDefaultModal;