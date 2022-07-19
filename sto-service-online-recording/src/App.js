import React, { useState } from 'react';
import { Steps, Button, Typography, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ChooseFillial } from './components/steps/ChooseFillial';
import { ChooseDate } from './components/steps/ChooseDate';
import ContactForm from './components/steps/ContactForm';

const { Title } = Typography;

const { Step } = Steps;

const App = () => {
  const [currentStep, setStep] = useState(0);
  const [fillial, setFillial] = useState({});
  const [date, setDate] = useState({});

  const onFillalSelect = (fillial) => {
    setStep(1)
    setFillial(fillial);
  };

  const onDateSelect = (date) => {
    setStep(2);
    setDate(date);
  }

  const onStepBack = (step) => {
    setStep(currentStep - 1)
  }

  const onBookinSucceess = () => {
    setStep(0)
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row pt-5">
          <div className="col-12">
            <Title className="text-center" level={1}>ОНЛАЙН ЗАПИСЬ</Title>
            <div className="pt-3 d-flex d-md-none">
              <Steps current={currentStep} direction="horizontal" >
                <Step title={null} />
                <Step />
                <Step />
              </Steps>
            </div>
            <Divider />
            <p className="description text-center">
              Внимание! Обслуживание машин по онлайн записи производится только на 1-ой площадке.
              <span className="d-block">
                Обслуживание машин по живой очереди производится на 2-ой площадке.
              </span>
            </p>
            <Divider />
          </div>
          <div className="col-12 pt-5 d-none d-md-block">
            <Steps current={currentStep}>
              <Step title="Выберите удобный шиномонтаж" />
              <Step title="Выберите удобное время" />
              <Step title="Оставьте заявку" />
            </Steps>
          </div>
        </div>
        {
          currentStep > 0 && (
            <div className="pt-2  row">
              <div className="col-12 mt-4">
                <Button style={{ 'width': '30%' }} block onClick={onStepBack}><ArrowLeftOutlined /> Назад</Button>
              </div>
            </div>
          )
        }
        {
          currentStep === 0
          &&
          (
            <div className="py-2 py-md-5 row">
              <div className="col-12">
                <ChooseFillial onClick={onFillalSelect} />
              </div>
            </div>
          )
        }
        {
          currentStep === 1 && (
            <div className="py-5 row">
              <div className="col-12">
                <ChooseDate fillial={fillial} onDateSelect={onDateSelect} />
              </div>
            </div>
          )
        }
        {
          currentStep === 2 &&
          (
            <div className="py-5 row">
              <div className="col-12 col-md-8 offset-md-2">
                <ContactForm onBookinSucceess={onBookinSucceess} fillial={fillial} date={date} />
              </div>
            </div>
          )
        }

        <div className="row">
          <div className="col-12">
            <Divider></Divider>
            <p className="description">
              Внимание! Записаться на шиномонтаж также можно по номерам, указанным выше(смотрите адреса станций). При опоздании более чем на 5 минут площадка занимается следующим автомобилем и Вы обслуживаетесь в порядке "живой" очереди. Поэтому настоятельно просим приезжать за 5-10 минут до выбранного вами времени.
          </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
