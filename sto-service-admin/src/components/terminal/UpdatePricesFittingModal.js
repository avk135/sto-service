import React, { Component } from 'react';

import { Modal, Input, Typography } from 'antd';
import api from '../../api';

const { Title } = Typography;

class UpdatePricesFittingModal extends Component {
  state = {
    _id: '',
    title: '',
    r1314: '',
    r1516: '',
    r1718: '',
    r1922: '',
    powered_r1322: '',
  };

  componentWillReceiveProps() {
    this.setState({
      ...this.props.fittingGoodToUpdate
    })
  }


  render() {
    const { visible, onCancel, onOk } = this.props;
    const { _id, title, r1314, r1516, r1718, r1922, powered_r1322 } = this.state;

    return (
      <Modal visible={visible} onCancel={onCancel} onOk={() => {
        onOk(_id,
          {
            title,
            r1314: parseFloat(r1314),
            r1516: parseFloat(r1516),
            r1718: parseFloat(r1718),
            r1922: parseFloat(r1922),
            powered_r1322: parseFloat(powered_r1322)
          });
      }}>
        <div className="pt-3">
          <Title level={3}>{title}</Title>
          <div className="pt-3">
            <span>R13-14</span>
            <Input className="mt-3" value={r1314} onChange={e => this.setState({ r1314: e.target.value })} />
          </div>
          <div className="pt-3">
            <span>R15-16</span>
            <Input className="mt-3" value={r1516} onChange={e => this.setState({ r1516: e.target.value })} />
          </div>
          <div className="pt-3">
            <span>R17-18</span>
            <Input className="mt-3" value={r1718} onChange={e => this.setState({ r1718: e.target.value })} />
          </div>
          <div className="pt-3">
            <span>R19-22</span>
            <Input className="mt-3" value={r1922} onChange={e => this.setState({ r1922: e.target.value })} />
          </div>
          <div className="pt-3">
            <span>Усиленные шини C, RunFlat, RSC, R13-22</span>
            <Input className="mt-3" placeholder="" value={powered_r1322} onChange={e => this.setState({ powered_r1322: e.target.value })} />
          </div>
        </div>
      </Modal>
    );
  }
}

export default UpdatePricesFittingModal;