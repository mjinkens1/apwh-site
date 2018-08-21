import React from 'react'

export const ContactPopup = (props) => {

  var showPopup = props.showPopup ? '' : ' hidden no-opacity'

  return (
      <div className={ 'contact-popup' + showPopup }>
        <i className='fas fa-times popup-close' onClick={ () => props.closePopup() }></i>
        <h1>{ props.formStatus.header }</h1>
        <p>{ props.formStatus.message }</p>
        <embed src='/images/earth-comm.svg' alt='earth'/>
      </div>
  );
}
