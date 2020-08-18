import React, { useState } from 'react';
import FormInput from '../form-input/FormInput';
// style
import './Signin.scss';
import CustomButton from '../custom-button/CustomButton';
//firebase auth

//redux
import { connect } from 'react-redux';
import { googleSigninStart, emailSigninStart } from '../../redux/action/user';

const Signin = ({ googleSigninStart, emailSigninStart }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleFormSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;

    emailSigninStart({ email, password });
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);

    //   setFormData({ ...formData, email: '', password: '' });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          name="email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
          required
          label="email"
        />
        <FormInput
          name="password"
          type="password"
          value={formData.password}
          required
          label="password"
          handleChange={handleChange}
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={googleSigninStart} isGoogleSignIn={true}>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  googleSigninStart,
  emailSigninStart
};

export default connect(null, mapDispatchToProps)(Signin);
