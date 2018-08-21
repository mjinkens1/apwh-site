import React from 'react'
import { ContactPopup } from './ContactPopup'
import ContactForm from './ContactForm'

export const Contact = (props) => {
  return (
    <div className='contact'>
      <div className='comets-bg'/>
      <ContactPopup
        formData={props.formData}
        formStatus={props.formStatus}
        didSubmit={props.didSubmit}
        didRecieve={props.didRecieve}
        closePopup={props.closePopup}
        showPopup={props.showPopup}/>
      <div className='contact-container'>
        <div className='header-wrapper'>
          <h3>(FIRST)</h3>
          <h1>CONTACT</h1>
        </div>
        {/*<i className='fas fa-hand-spock spock'></i>*/}
        <embed className='spock' src='/images/hand-spock.svg' alt='spock'/>
      </div>
      <div className='contact-container'>
        <ContactForm
         onSubmit={props.handleSubmit}
         didRecieve={props.didRecieve}/>
        <div className='contact-links'>
          <a href='https://www.linkedin.com/in/matt-jinkens-391a8061' target='_blank' rel='noopener noreferrer' className='btn btn-lg social mx-1'><i className='fab fa-linkedin-in'></i></a>
          <a href='https://twitter.com/RB_24K' target='_blank' rel='noopener noreferrer' className='btn btn-lg social mx-1'><i className='fab fa-twitter'></i></a>
          <a href='https://codepen.io/MJ87/' target='_blank' rel='noopener noreferrer' className='btn btn-lg social mx-1'><i className='fab fa-codepen'></i></a>
          <a href='https://github.com/mjinkens1' target='_blank' rel='noopener noreferrer' className='btn btn-lg social mx-1'><i className='fab fa-github'></i></a>
        </div>
      </div>
    </div>
  );
}
