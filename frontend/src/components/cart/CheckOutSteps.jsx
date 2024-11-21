import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';
import { Step, StepLabel, Stepper, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import './CheckOutSteps.css';

// Custom styled StepConnector for line coloring
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: 'rgba(0, 0, 0, 0.349)', // Default color
    borderWidth: 2, // Adjust line thickness
  },
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: 'tomato', // Active color
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: 'tomato', // Completed color
  },
}));

function CheckOutSteps({ activeStep }) {
  const steps = [
    { label: 'Shipping Details', icon: <LocalShipping /> },
    { label: 'Confirm Order', icon: <LibraryAddCheck /> },
    { label: 'Payment', icon: <AccountBalance /> },
  ];

  const stepStyle = {
    boxSizing: 'border-box',
    marginTop: '120px',
  };

  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={stepStyle}
        connector={<CustomConnector />} // Use the custom connector
      >
        {steps.map((item, i) => (
          <Step
            key={i}
            active={activeStep === i}
            completed={activeStep >= i}
          >
            <StepLabel
              icon={item.icon}
              style={{
                color: activeStep >= i ? 'tomato' : 'rgba(0, 0, 0, 0.649)',
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default CheckOutSteps;
