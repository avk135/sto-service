import React, { Component } from 'react';
import { Input, Button, Typography, Modal, Select, Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';

import api from '../../api';
let carBrands = require('../../brands.json').car_brands;

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      comment: '',
      modalVisible: false,
      errorModalVisible: false,
      isSubmitButtonDisabled: false,
      carBrands: [
        ...carBrands
      ],
      selectedCarBrand: ''
    }
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator(
      {
        messages: {
          email: 'Введите имейл',
          required: 'Заполните поле',
          default: 'Заполните все поля',
          min: 'Введено слишком короткое значение'
        },
        element: message => <div className="error-message">{message}</div>
      }
    );
  }

  componentDidCatch(e) {
    console.log('component did catch', e);
  }

  handleCancel = () => {
    this.setState({
      ...this.state,
      modalVisible: false,
    });
    this.props.onBookinSucceess();
  }



  onSubmit = async () => {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return;
    }

    try {
      this.setState({
        ...this.state,
        isSubmitButtonDisabled: true
      })


      const data = {
        bookedAt: moment(this.props.date).seconds(0).milliseconds(0).format('YYYY-MM-DD HH:mm:ss'),
        name: this.state.name,
        phone: this.state.phone,
        comment: this.state.comment,
        fillial: this.props.fillial._id,
        carBrand: this.state.selectedCarBrand
      }

      let response = await fetch(`${api.API_ENDPOINT}/booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      response = await response.json();

      if (response.status === 500) {
        this.setState({
          ...this.state,
          modalVisible: false,
          errorModalVisible: true,
        });

        return;
      } else {
        this.setState({
          ...this.state,
          modalVisible: true,
          errorModalVisible: false,
        });
      }
    } catch (e) {
      this.setState({
        ...this.state,
        errorModalVisible: true,
      })
      console.log('Catched', e);
    }
  }

  render() {
    return (
      <div>
        <Modal
          centered
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
          footer={[
            null
          ]}>
          <Title className="text-center pb-5" level={3}>
            Вы упешно записались в наш автосервис!
          </Title>
          <div className="contact-modal">
            <p>
              <span>Ждем вас по адресу:</span>   {this.props.fillial.address}
            </p>
            <p>
              <span>Дата:</span> {moment(this.props.date).format('DD.MM.YYYY')}
            </p>
            <p>
              <span>Время:</span> {moment(this.props.date).format('HH:mm')}
            </p>
            <p>
              <span>Имя:</span> {this.state.name}
            </p>
            <p>
              <span>Телефон:</span> {this.state.phone}
            </p>
          </div>
        </Modal>

        <Modal
          centered
          visible={this.state.errorModalVisible}
          onCancel={this.handleCancel}
          footer={
            null
          }>
          <Title className="text-center pb-5" level={3}>
            <div className="custom-error-icon">
              <CloseCircleOutlined width={'200px'} height={'200px'} />
            </div>
            <br />
            Произошла ошибка!
            <br />
            Попробуйте пожалуйста снова.
          </Title>
        </Modal>
        <Title level={2} className="text-center">Пожалуйста, введите ваши данные</Title>
        <Title level={4}>Ваше имя</Title>
        <Input value={this.state.name} onChange={(e) => {
          this.setState({
            ...this.state,
            name: e.target.value
          })
        }}></Input>

        {this.validator.message('name', this.state.name, 'required|min:3')}
        <br />
        <br />
        <Title level={4}>Ваш телефон</Title>
        <InputMask
          value={this.state.phone} onChange={(e) => {
            this.setState({
              ...this.state,
              phone: e.target.value
            })
          }}
          className="ant-input"
          mask="+375\ 99 999 99 99"
          maskChar="_"
        />
        {this.validator.message('phone', this.state.phone, 'required')}
        <br />
        <div className="mt-3">
          <Title level={4}>Выберите марку автомобиля</Title>
          <Select defaultValue="Не Указано" style={{ width: 200 }} onChange={(selectedCarBrand) => {
            this.setState({
              ...this.state,
              selectedCarBrand
            }, () => {
              console.log(selectedCarBrand);
            })
          }}>
            {
              this.state.carBrands.map(brand => (
                <Option value={brand} key={brand}>{brand}</Option>
              ))
            }
          </Select>
        </div>
        <Title level={4} className="mt-4">Коментарий</Title>
        <TextArea
          value={this.state.comment}
          onChange={(e) => this.setState({
            ...this.state,
            comment: e.target.value
          })}
          autoSize={{ minRows: 6, maxRows: 6 }}></TextArea>

        <Button onClick={this.onSubmit} disabled={this.state.isSubmitButtonDisabled} className="mt-5" size="large" type="primary" block>Оставить заявку</Button>
      </div>
    )
  }
}

export default ContactForm;