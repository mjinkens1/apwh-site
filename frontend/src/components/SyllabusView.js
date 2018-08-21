import React from 'react'


export const SyllabusView = (props) => {
  props.setViewName(props.name)
  return(
    <div className='bg-img'>
      <object className='' data='/files/syllabus.pdf#view=FitV' type='application/pdf' width='100%' height='100%'>
        <p>Syllabus<a href='/files/syllabus.pdf'></a></p>
      </object>
      <object className='' data='/files/syllabus.pdf' type='application/pdf'  width='100%' height='100%'>
        <embed src='/files/syllabus.pdf' type='application/pdf' />
      </object>
    </div>
  );
}
