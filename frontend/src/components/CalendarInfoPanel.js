import React from 'react'


export const CalendarInfoPanel = (props) => {

  var isExpanded = props.expand ? '' : ' collapse'
  var panelIcon = props.isExpanded ? 'fa-fw fas fa-minus' : 'fa-fw fas fa-plus'
  return(
    <React.Fragment>
      <div className='cal-info-panel-header'>
        <p>{ props.panelName }</p>
        <i className={ panelIcon } onClick={ (event) => props.togglePanel(event) }/>
      </div>
    </React.Fragment>
  );
}
