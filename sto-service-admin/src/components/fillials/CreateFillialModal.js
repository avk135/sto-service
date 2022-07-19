import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import InputMask from 'react-input-mask';

const CreateFillialModal = (props) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [startBookingAt, setStartBookingAt] = useState('');
  const [endBookingAt, setEndBookingAt] = useState('');

  const { visible, onCancel, handleCreate } = props;

  return (
    <div>
      <Modal
        centered
        title="Создание филиала"
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button type="primary" key="create" onClick={() => {
            handleCreate({
              address,
              phone,
              workTime,
              email,
              password,
              startBookingAt,
              endBookingAt
            });
            setAddress('');
            setPassword('');
            setPhone('');
            setEmail('');
            setEndBookingAt('');
            setWorkTime('');
            setStartBookingAt('');
          }}>Создать филиал</Button>
        ]}
      >
        <div>
          <Input placeholder="Адрес" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        < div className="mt-3">
          <InputMask
            placeholder="Телефон"
            className="ant-input"
            mask="+375\ 99 999 99 99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Input placeholder="Рабочее время" value={workTime} onChange={e => setWorkTime(e.target.value)} />
        </div>
        <div className="mt-3">
          <Input placeholder="Е-mail" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mt-3">
          <Input placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mt-3">
          <InputMask
            placeholder="Начало онлайн записи"
            className="ant-input"
            mask="99:99"
            value={startBookingAt}
            onChange={(e) => setStartBookingAt(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <InputMask
            placeholder="Конец онлайн записи"
            className="ant-input"
            mask="99:99"
            value={endBookingAt}
            onChange={(e) => setEndBookingAt(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  )
}

export default CreateFillialModal;