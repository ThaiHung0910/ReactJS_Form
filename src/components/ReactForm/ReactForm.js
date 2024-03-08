import React, { Component } from 'react'
import FormStudent from './FormStudent'
import TableStudent from './TableStudent'

export default class ReactForm extends Component {
 

  render() {
    return (
      <div className="container">
        <h3>React Form</h3>

        <FormStudent  />
        
        <TableStudent />
      </div>
    )
  }
}




