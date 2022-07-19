import React, { Component } from 'react';
import Header from '../components/global/Header';
import { Table, Typography, Button, Divider, message } from 'antd';
import UpdatePricesFittingModal from '../components/terminal/UpdatePricesFittingModal';
import UpdatePricesDefaultModal from '../components/terminal/UpdatePricesDefaultModal';

import api from '../api';

const { Title } = Typography;
const { Column } = Table;

export default class AdminTerminal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tireFittingGoods: [],
    conditioningGoods: [],
    additionalServices: [],
    tireRepair: [],

    tireFittingGoodModalVisible: false,
    fittingGoodToUpdate: {},
    fittingGoodToUpdateIsLoading: false,
    productToUpdate: {},
    productToUpdateModalVisible: false,
    url: ''
  }

  async componentDidMount() {
    const tireFittingGoods = await api.getTireFittingGoods();
    const conditioningGoods = await api.getConditioningGoods();
    const additionalServices = await api.getAdditionalServices();
    const tireRepair = await api.getTireRepair();

    this.setState({
      ...this.state,
      tireFittingGoods,
      conditioningGoods,
      additionalServices,
      tireRepair
    });
  }

  getTireFittingGoods = async () => {
    const tireFittingGoods = await api.getTireFittingGoods();

    this.setState({
      ...this.state,
      tireFittingGoods
    });
  }

  updateTireFittingGood = (id) => {
    const fittingGoodToUpdate = this.state.tireFittingGoods.filter(el => id === el._id)[0];

    this.setState({
      ...this.state,
      fittingGoodToUpdate,
    }, () => {
      this.setState({
        tireFittingGoodModalVisible: true,
      })
    });


  }

  onCancelUpdateTireFittingGood = () => {
    this.setState({
      ...this.state,
      tireFittingGoodModalVisible: false,
      fittingGoodToUpdate: {}
    });
  }

  updatePriceDefault = async (id, url) => {

    let productToUpdate = await fetch(`https://sto-service-api.herokuapp.com/api/${url}/${id}`);

    productToUpdate = await productToUpdate.json();

    console.log(productToUpdate);

    this.setState({
      url,
      productToUpdate
    }, () => {
      this.setState({
        productToUpdateModalVisible: true,
      })
    });
  }

  onUpdatePriceDefault = async (id, payload) => {

    try {
      await fetch(`https://sto-service-api.herokuapp.com/api/${this.state.url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const conditioningGoods = await api.getConditioningGoods();
      const additionalServices = await api.getAdditionalServices();
      const tireRepair = await api.getTireRepair();

      this.setState({
        productToUpdateModalVisible: false
      });

      this.setState({
        ...this.state,
        conditioningGoods,
        additionalServices,
        tireRepair
      });

      message.success('Запись успешно обновлена');
    } catch (e) {
      console.log(e);
      message.error('Произошла ошибка. Повторите пожалуйста.');
    }


  }

  onCancleUpdatePriceDefault = () => {
    this.setState({
      productToUpdateModalVisible: false
    })
  }

  onUpdateTireFittingGood = async (id, payload) => {
    try {

      await api.updateFittingGoodById(id, payload);

      this.setState({
        tireFittingGoodModalVisible: false,
      })

      message.success('Запись успешно обновлена');
    } catch (e) {
      console.log(e);
      message.error('Произошла ошибка. Повторите пожалуйста.');
    }

    await this.getTireFittingGoods();
  }

  render() {
    const props = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="сol-12 col-md-8 offset-md-2">
            <Header user={props.user} onLogout={props.onLogout} />
          </div>
          <div className="col-12">
            <Title level={3}>Цены на шиномонтаж</Title>
          </div>
          <div className="col-12 my-1">
            <Divider />
          </div>
          <div className="col-12">
            <UpdatePricesFittingModal
              fittingGoodToUpdate={this.state.fittingGoodToUpdate}
              visible={this.state.tireFittingGoodModalVisible}
              onCancel={this.onCancelUpdateTireFittingGood}
              onOk={this.onUpdateTireFittingGood}
            />
            <UpdatePricesDefaultModal
              product={this.state.productToUpdate}

              visible={this.state.productToUpdateModalVisible}
              onCancel={this.onCancleUpdatePriceDefault}
              onOk={this.onUpdatePriceDefault}
            />
          </div>
          <div className="col-12 mt-3">
            <Table rowKey="_id" dataSource={this.state.tireFittingGoods} className="prices-table">
              <Column dataIndex="title" title="Наименование работ" />
              <Column dataIndex="r1314" title="R13-14" />
              <Column dataIndex="r1516" title="R15-16" />
              <Column dataIndex="r1718" title="R17-18" />
              <Column dataIndex="r1922" title="R19-22" />
              <Column dataIndex="powered_r1322" title="Усиленные шини C, RunFlat, RSC, R13-22" />
              <Column title="Редактировать" render={(text, row) => {
                return <Button type="primary" onClick={() => this.updateTireFittingGood(row._id)}>Редактировать</Button>
              }} />
            </Table>
          </div>

          <div className="col-12">
            <Title level={3}>Цены на обслуживание кондиционеров</Title>
          </div>
          <div className="col-12 my-1">
            <Divider />
          </div>
          <div className="col-12 mt-3">
            <Table rowKey="_id" dataSource={this.state.conditioningGoods} className="prices-table">
              <Column dataIndex="title" width="80%" title="Наименование услуг" />
              <Column dataIndex="price" title="Цена" />
              <Column title="Редактировать" render={(text, row) => {
                return <Button type="primary" onClick={() => this.updatePriceDefault(row._id, 'conditioning-goods')}>Редактировать</Button>
              }} />
            </Table>
          </div>
          <div className="col-12">
            <Title level={3}>Дополнительные услуги</Title>
          </div>
          <div className="col-12 my-1">
            <Divider />
          </div>
          <div className="col-12 mt-3">
            <Table rowKey="_id" dataSource={this.state.additionalServices} className="prices-table">
              <Column dataIndex="title" width="80%" title="Наименование услуг" />
              <Column dataIndex="price" title="Цена" />
              <Column title="Редактировать" render={(text, row) => {
                return <Button type="primary" onClick={() => this.updatePriceDefault(row._id, 'additional-services')}>Редактировать</Button>
              }} />
            </Table>
          </div>
          <div className="col-12">
            <Title level={3}>Ремонт шин</Title>
          </div>
          <div className="col-12 my-1">
            <Divider />
          </div>
          <div className="col-12 mt-3">
            <Table rowKey="_id" dataSource={this.state.tireRepair} className="prices-table">
              <Column dataIndex="title" width="80%" title="Наименование услуг" />
              <Column dataIndex="price" title="Цена" />
              <Column title="Редактировать" render={(text, row) => {
                return <Button type="primary" onClick={() => this.updatePriceDefault(row._id, 'tire-repair')}>Редактировать</Button>
              }} />
            </Table>
          </div>
        </div>
      </div >
    )
  }
}