import React, { Component } from 'react'
import FormStudent from './FormStudent'
import TableStudent from './TableStudent'
// import { connect } from 'react-redux'

export default class ReactForm extends Component {
  // state = {
  //   studentEdit : {
  //     id: "",
  //     name: "",
  //     phone: "",
  //     email: "",
  //   }, 
  //   isEdit: false,
  //   arrStudent: this.props.arrStudent
  // }

  // handleEditStudent = (student) => {
  //   this.setState({studentEdit: student, isEdit: true})
  // }


  // handleUpdateStudent = (student, arr, value) => {
  //   let index = arr.findIndex(e => e.id === student.id)
  //   console.log(index)
  //   console.log(student)
  //   arr[index] = student
  //   // console.log(this.props.arrStudent)
  //   this.setState({arrStudent: this.props.arrStudent})
  //   // this.setState({
  //   //   value: { id: "", phone: "", email: "", name: "" },
  //   // });
  // }

  render() {
    return (
      <div className="container">
        <h3>React Form</h3>
        {/* <FormStudent studentEdit={this.state.studentEdit} isEdit={this.state.isEdit} handleUpdateStudent={this.handleUpdateStudent} />
        <TableStudent handleEditStudent={this.handleEditStudent} arr={this.state.arrStudent}  /> */}

        <FormStudent  />
        <TableStudent />
      </div>
    )
  }
}




// const mapDispatchToProps = (dispatch) => {
//   return {
//     editStudent: (student) => {
//       const action = {
//         type: "EDIT_STUDENT",
//         payload: student
//       }
//       dispatch(action)
//     }
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     arrStudent: state.arrStudent.arrStudent
//   }
// }

// const ComponentWithRedux = connect(mapStateToProps, null) (ReactForm)

// export default ComponentWithRedux