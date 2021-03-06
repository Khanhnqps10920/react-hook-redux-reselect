import React from 'react';
// style
// import './CustomButton.scss';

import { CustomButtonContainer } from './CustomButton.styles';

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
  );
};

export default CustomButton;
