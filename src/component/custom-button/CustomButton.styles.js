import styled, { css } from 'styled-components';

const buttonStyles = css`
  background-color: black;
  border: none;
  outline: none;
  color: white;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background: black;
    color: white;
    border: none;
  }
`;

const googleSigninStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background: #357ae8;
    border: none;
  }
`;

const getButtonStyle = props => {
  const { inverted, isGoogleSignIn } = props;

  if (isGoogleSignIn) {
    return googleSigninStyles;
  }

  return inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getButtonStyle};
`;
