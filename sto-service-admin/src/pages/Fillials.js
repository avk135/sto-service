import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Table, Button, Divider, message, Popconfirm } from 'antd';
import CreateFillialModal from '../components/fillials/CreateFillialModal';
import EditFillialModal from '../components/fillials/EditFillialModal';
import api from '../api';

const { Column } = Table;


const Fillials = (props) => {
  const [fillials, setFillials] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fillialToEdit, setFillialToEdit] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);


  const handleEdit = async (fillialId) => {
    const fillial = await api.getFillialById(fillialId);
    setFillialToEdit(fillial);
    setEditModalVisible(true);
  }

  const getFillials = async () => {
    const fillials = await api.getFillials();
    setFillials(fillials);
  }

  const hideEditModal = () => {
    setFillialToEdit({});
    setEditModalVisible(false);
  }

  const deleteFillial = async (fillialId) => {
    let response = await api.deleteFillialById(fillialId);
    message.success(`Филиал удален ${response.address}`);
    getFillials();
  }

  const updateFillial = async (payload) => {
    try {
      await api.updateFillialById(fillialToEdit._id, payload);
      await getFillials();
      setEditModalVisible(false);
      message.success('Данные филила успешно обновлены.');
    } catch (e) {
      message.error(e.message);
    }
  }


  const handleCreate = async (payload) => {
    try {
      await api.createFillial(payload);
      await getFillials();
      message.success('Филиал создан');
      handleToggleModal();
    } catch (e) {
      console.log(e);
      message.error('Произошла ошибка! Проверьте данные и попробуйте снова.');
    }
  }

  const handleToggleModal = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    getFillials();
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="сol-12 col-md-8 offset-md-2">
          <Header user={props.user} onLogout={props.onLogout} />
        </div>
      </div>
      <div className="row">
        <div className="col-8 col-md-4 my-3">
          <Button type="primary" block onClick={handleToggleModal}>
            <UserAddOutlined /> Создать Филиал
          </Button>
        </div>
        <Divider />
        <div className="col-12">
          <CreateFillialModal visible={visible} onCancel={handleToggleModal} handleCreate={handleCreate} />
          <EditFillialModal onUpdateFillial={updateFillial} fillialToEdit={fillialToEdit} visible={editModalVisible} onCancel={hideEditModal} />
          <Table dataSource={fillials} rowKey="_id" scroll={{ x: 1000 }} >
            <Column
              title='Адрес'
              dataIndex='address'
              render={(text, row) => {
                return <Link to={`fillial-info/${row._id}`}>{text}</Link>
              }}
            />
            <Column
              title='Телефон'
              dataIndex='phone'
            />
            <Column
              title='Режим работы'
              dataIndex='workTime'
            />
            <Column
              title='E-mail(Логин)'
              dataIndex='email'
            />
            <Column
              title='Пароль'
              dataIndex='password'
            />
            <Column
              title='Начало записи'
              dataIndex='startBookingAt'
            />
            <Column
              title='Конец'
              dataIndex='endBookingAt'
            />
            <Column
              title="Редактировать"
              key="edit"
              render={(text, record) => (
                <span className="d-flex justify-content-center" >
                  <Button type="primary" onClick={() => {
                    handleEdit(record._id)
                  }}><EditOutlined /></Button>
                </span>
              )}
            />

            <Column
              title="Удалить"
              key="delete"
              render={(text, record) => (
                <span className="d-flex justify-content-center" >
                  <Popconfirm
                    title="Действительно удалить филлиал?"
                    onConfirm={() => {
                      deleteFillial(record._id)
                    }}
                    okText="Удалить"
                    cancelText="Отмена"
                  >
                    <Button type="danger"><DeleteOutlined /></Button>
                  </Popconfirm>

                </span>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Fillials;