import React, { Component } from 'react';
import { Divider, Spin } from 'antd';
import { ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '../../api';

export class ChooseFillial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fillials: [],
      isLoading: true
    }
  }

  async componentDidMount() {
    const fillials = await api.getFillials();
    this.setState({
      ...this.state,
      fillials,
      isLoading: false
    });
  }

  render() {
    return (
      <div className="fillials">
        {
          this.state.isLoading
            ?
            <div className="d-flex justify-content-center flex-2" style={{ minWidth: '100%' }}>
              <Spin size="large" />
            </div>
            :
            this.state.fillials.map((fillial, i) => {
              return (
                <div className="fillial" onClick={() => this.props.onClick(fillial)} key={i}>
                  <div className="fillial__heading">
                    {fillial.address}
                  </div>
                  <span>Выбрать</span>
                  <Divider className="mt-1" />
                  <div className="fillial__info">
                    <ClockCircleOutlined /> {fillial.workTime}
                  </div>
                  <div className="fillial__info">
                    <PhoneOutlined /> {fillial.phone}
                  </div>
                </div>
              )
            })
        }

      </div>
    )
  }
}