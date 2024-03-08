import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent, updateStudent} from "../../redux/reducers/ManageStudentReducer";



class FormStudent extends Component {
  state = {
    value: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    errValue: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    defaultValue: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
  };

  handleChangeInput = (e) => {
    let input = e.target,
      { name, value } = input,
      currentValue = { ...this.state.value },
      currentErrValue = { ...this.state.errValue },
      message = "",
      isDuplicate = false;

    if (name === "id") {
      for (let e of this.props.arrStudent) {
        if (Number(e.id) !== Number(value)) {
          isDuplicate = false;
        } else {
          message = "ID already exists. Try again";
          isDuplicate = true;
          break;
        }
      }
    }

    if (value.trim() === "") {
      message = `Input ${name} can't be blank`;
    } else {
      if (name) {
        switch (name) {
          case "name":
            {
              let regex = /^\s*[a-zA-Z\s]+\s*$/;
              if (!regex.test(value.trim())) {
                message = "Text only";
              } else {
                message = "";
              }
            }

            break;
          case "phone":
            {
              let regex = /^(?:\+?84|0)(\d{9,10})$/;
              if (!regex.test(value)) {
                message = "Phone number only";
              } else {
                message = "";
              }
            }
            break;
          case "id":
            {
              let regex = /^(?!0)\d{1,4}$|^[1-9]\d{1,3}$/;
              if (!isDuplicate) {
                if (!regex.test(value)) {
                  message =
                    "Number only, can't start with 0, must from 1 to 9999";
                } else {
                  message = "";
                }
              }
            }
            break;
          default: {
            let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!regex.test(value)) {
              message = "Invalid email. Try again";
            } else {
              message = "";
            }
          }
        }
      }
    }

    this.setState({
      value: { ...currentValue, [name]: input.value },
      errValue: { ...currentErrValue, [name]: message },
    });
    console.log(this.state);
  };

  renderButtonSubmit = () => {
    let isValid = true;
    let currentValue = this.state.value,
      currentErrValue = this.state.errValue,
      button = (
        <button type="submit" className="btn btn-success">
          Thêm Sinh Viên
        </button>
      ),
      buttonDisabled = (
        <button disabled type="submit" className="btn btn-success">
          Thêm Sinh Viên
        </button>
      );

    for (let key in currentValue) {
      if (currentValue[key] === "") {
        isValid = false;
        break;
      }
    }

    for (let key in currentErrValue) {
      if (currentErrValue[key] !== "") {
        isValid = false;
        break;
      }
    }


    if (isValid) {
      if (!this.props.isEdit) {
        return button;
      } else {
        return buttonDisabled;
      }
    } else {
      return buttonDisabled;
    }
  };

  renderButtonUpdate = (student) => {
    let isValid = true, {dispatch} = this.props
    let currentValue = this.state.value,
      currentErrValue = this.state.errValue,
      button = (
        <button
          onClick={() => {
            const action = updateStudent(student)
            dispatch(action)
            this.setState({ value: this.state.defaultValue });
          }}
          type="button"
          className="btn btn-primary mx-3"
        >
          Cập nhật Sinh Viên
        </button>
      ),
      buttonDisabled = (
        <button disabled type="button" className="btn btn-primary mx-3">
          Cập nhật Sinh Viên
        </button>
      );
    if (this.props.isEdit) {
      for (let key in currentValue) {
        if (currentValue[key] === "") {
          isValid = false;
          break;
        }
      }

      for (let key in currentErrValue) {
        if (currentErrValue[key] !== "") {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        return button;
      } else {
        return buttonDisabled;
      }
    } else {
      return buttonDisabled;
    }
  };

  static getDerivedStateFromProps(newProps, currentState) {
    console.log(currentState);

    console.log(newProps);

    if (newProps.isEdit) {
      if (newProps.editStudent.id !== currentState.value.id) {
        currentState.value = { ...newProps.editStudent };
      }
    }

    return currentState;
  }

  render() {
    let { id, name, phone, email } = this.state.value,
      message = this.state.errValue, {dispatch} = this.props
    return (
      <div className="container mt-5 p-0">
        <h3 className="bg-dark text-white p-3">Thông tin sinh viên</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const action = addStudent(this.state.value)
            dispatch(action)
            this.setState({ value: this.state.defaultValue });
          }}
          className="border rounded-2 p-4"
        >
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Mã SV</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={id}
                  placeholder="Nhập Mã SV"
                  onChange={this.handleChangeInput}
                />
                <p style={{ height: "50px" }} className="text-danger mt-1">
                  {message.id}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={phone}
                  placeholder="Nhập số điện thoại"
                  onChange={this.handleChangeInput}
                />
                <p style={{ height: "50px" }} className="text-danger mt-1">
                  {message.phone}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  placeholder="Nhập họ tên"
                  onChange={this.handleChangeInput}
                />
                <p style={{ height: "50px" }} className="text-danger mt-1">
                  {message.name}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Nhập email"
                  onChange={this.handleChangeInput}
                />
                <p style={{ height: "50px" }} className="text-danger mt-1">
                  {message.email}
                </p>
              </div>
            </div>
          </div>

          {this.renderButtonSubmit()}

          {this.renderButtonUpdate(this.state.value)}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrStudent: state.form.arrStudent,
    editStudent: state.form.editStudent,
    isEdit: state.form.isEdit,
  };
};


const ComponentWithRedux = connect(
  mapStateToProps
)(FormStudent);

export default ComponentWithRedux;
