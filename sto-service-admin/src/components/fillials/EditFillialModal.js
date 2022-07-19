import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import InputMask from 'react-input-mask';

class EditFillialModal extends Component {
  state = {
    address: '',
    phone: '',
    workTime: '',
    email: '',
    password: '',
    startBookingAt: '',
    endBookingAt: ''
  }

  componentWillReceiveProps() {
    this.setState({
      ...this.props.fillialToEdit
    })
  }

  render() {
    const { address, phone, workTime, email, password, startBookingAt, endBookingAt, _id } = this.state;
    const { visible, onCancel, onUpdateFillial } = this.props;

    return (
      <div>
        <Modal
          centered
          title="Редактирование филиала"
          visible={visible}
          onCancel={onCancel}
          footer={[
            <Button type="primary" key="create" onClick={() => {
              onUpdateFillial({
                address,
                phone,
                workTime,
                email,
                password,
                startBookingAt,
                endBookingAt,
                _id
              })
            }}>Обновить данные филлиала</Button>
          ]}
        >
          <div>
            <Input placeholder="Адрес" value={this.state.address} onChange={e => this.setState({
              ...this.state,
              address: e.target.value
            })} />
          </div>
          < div className="mt-3">
            <InputMask
              placeholder="Телефон"
              className="ant-input"
              mask="+375\ 99 999 99 99"
              value={this.state.phone}
              onChange={(e) => this.setState({
                ...this.state,
                phone: e.target.value
              })}
            />
          </div>
          <div className="mt-3">
            <Input placeholder="Рабочее время" value={this.state.workTime} onChange={e => this.setState({
              ...this.state,
              workTime: e.target.value
            })} />
          </div>
          <div className="mt-3">
            <Input placeholder="Е-mail" value={this.state.email} onChange={e =>
              this.setState({
                ...this.state,
                email: e.target.value
              })
            } />
          </div>
          <div className="mt-3">
            <Input placeholder="Пароль" value={this.state.password} onChange={e => this.setState({
              ...this.state,
              password: e.target.value
            })} />
          </div>
          <div className="mt-3">
            <InputMask
              placeholder="Начало онлайн записи"
              className="ant-input"
              mask="99:99"
              value={this.state.startBookingAt}
              onChange={(e) => this.setState(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <InputMask
              placeholder="Конец онлайн записи"
              className="ant-input"
              mask="99:99"
              value={this.state.endBookingAt}
              onChange={e => this.setState({
                ...this.state,
                endBookingAt: e.target.value
              })}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default EditFillialModal;