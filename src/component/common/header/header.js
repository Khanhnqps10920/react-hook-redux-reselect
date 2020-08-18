import React from 'react';
//auth
import { auth } from '../../../firebase/firebase.utils';
// react router dom
import { Link } from 'react-router-dom';
//style
import './header.scss';
//svg
import { ReactComponent as Logo } from '../../../assets/crown.svg';
// redux
import { connect } from 'react-redux';
//components
import CartIcon from '../../cartIcon/CartIcon';
import CartDropdown from '../../cart-dropdown/CartDropdown';
import { selectCartHidden } from '../../../redux/reducer/cart.selector';
import { selectCurrentUser } from '../../../redux/reducer/user.selector';
import { signoutStart } from '../../../redux/action/user';
// styled cpn

import {
  OptionsContainer,
  LogoContainer,
  HeaderContainer,
  OptionsDiv,
  OptionsLink
} from './Header.styles';

const header = ({ currentUser, hidden, signoutStart }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionsLink to="/shop">Shop</OptionsLink>
        <OptionsLink to="/shop">Contact</OptionsLink>
        {currentUser ? (
          <OptionsDiv
            // as="div" => div element
            onClick={() => {
              signoutStart();
            }}
          >
            SIGN OUT
          </OptionsDiv>
        ) : (
          <OptionsLink to="/signin">SIGN IN</OptionsLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {!hidden && <CartDropdown />}
    </HeaderContainer>
  );
};

const mapStateToProps = state => ({
  hidden: selectCartHidden(state),
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = {
  signoutStart
};

export default connect(mapStateToProps, mapDispatchToProps)(header);
