import React, { Component } from 'react'
import FormStudent from './FormStudent/FormStudent'
import TableStudent from './TableStudent/TableStudent'

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




