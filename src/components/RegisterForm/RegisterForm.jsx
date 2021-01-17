import React, {useState, useEffect} from 'react';
import PersonalData from './PersonalInfoForm';
import LoginData from './LoginForm';
import DeliveryData from './DeliveryForm';
import {Typography, Stepper, Step, StepLabel} from '@material-ui/core';

function RegisterForm({onSubmit}) {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});

  const forms = [
    <LoginData onSubmit={setPartialFormData} />,
    <PersonalData onSubmit={setPartialFormData} />,
    <DeliveryData onSubmit={setPartialFormData} />,
    <Typography variant="h5">Thanks for registering!</Typography>,
  ];

  useEffect(() => {
    if (_isLastForm()) {
      onSubmit(formData);
    }
  });

  function _isLastForm() {
    return formStep === forms.length - 1;
  }

  function setPartialFormData(data) {
    setFormData({...formData, ...data});
    _nextForm();
  }

  function _nextForm() {
    setFormStep(formStep + 1);
  }

  return (
    <>
      <Stepper activeStep={formStep}>
        <Step>
          <StepLabel>Login</StepLabel>
        </Step>
        <Step>
          <StepLabel>Personal</StepLabel>
        </Step>
        <Step>
          <StepLabel>Delivery</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finish</StepLabel>
        </Step>
      </Stepper>
      {forms[formStep]}
    </>
  );
}

export default RegisterForm;
