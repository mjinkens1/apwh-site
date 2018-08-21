import React, { Component } from 'react'

export class ErrorView extends Component {
  componentDidMount () {

    var errorView = document.querySelector('.error-view')
    var errorViewP = document.querySelector('.error-view p')
    var errorView404 = document.querySelector('.error-view-404')

    window.onload = () => {

      setTimeout(() => {
        errorViewP.style.opacity = '0'
      }, 1800)

      setTimeout(() => {
        errorView.style.opacity = '0'
        errorView404.style.opacity = '1'
      }, 2000)
    }

  }

  render () {
    return (
      <div className = 'error-wrapper'>
        <div className='error-view'>
          <p>I think we&#39;re lost...</p>
        </div>
        <div className='error-view-404'>
          <p>404</p>
          <p>(Page Not Found)</p>
        </div>
      </div>
    )
  }
}
