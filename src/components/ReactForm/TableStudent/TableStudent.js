import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteStudent,
  editStudent,
  updateSearchTerm,
  setSearchResults,
} from "../../../redux/reducers/ManageStudentReducer";

class TableStudent extends Component {
  renderStudent = () => {
    let { arrStudent, searchResults, isSearch,  dispatch } =
      this.props, sortArrStudent = [...arrStudent], sortSearchResults = [...searchResults]


    if (sortArrStudent.length) {
      sortArrStudent.sort((a, b) => a.id - b.id);
    }

    if (sortSearchResults.length) {
      sortSearchResults.sort((a, b) => a.id - b.id);
    }

    let searchResultsArr = sortSearchResults.map((e) => {
        let { id, name, phone, email } = e;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>
              <button
                onClick={() => {
                  const action = editStudent(e);
                  dispatch(action);
                }}
                className="btn btn-success"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const action = deleteStudent(id);
                  dispatch(action);
                }}
                className={`btn btn-danger btnDelete mx-1 ${id}`}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }),
      studentArr = sortArrStudent.map((e) => {
        let { id, name, phone, email } = e;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>
              <button
                onClick={() => {
                  const action = editStudent(e);
                  dispatch(action);
                }}
                className="btn btn-success"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const action = deleteStudent(id);
                  dispatch(action);
                }}
                className={`btn btn-danger btnDelete mx-1 ${id}`}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });

    if(isSearch) {
      if(sortSearchResults.length > 0) {
        return searchResultsArr
      } else {
        return <tr><td><h3>Nothing Found. Try Again</h3></td></tr>
      }
    } else { 
      return studentArr
    }

  };

  render() {
    let { dispatch } = this.props;
    return (
      <div>
        <div className="d-flex mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            id="searchInput"
            style={{ width: "40%" }}
            onChange={(e) => {
              const action = updateSearchTerm(e.target.value);
              dispatch(action);
            }}
          />
          <button
            onClick={() => {
              const action = setSearchResults(this.props.searchTerm);
              dispatch(action);
              document.getElementById('searchInput').value = ''
            }}
            style={{ width: "10%" }}
            className="btn btn-primary"
            id="searchButton"
          >
            Search
          </button>
        </div>

        <table className="table container mt-4">
          <thead>
            <tr className="table-dark">
              <th>Mã SV</th>
              <th>Họ Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderStudent()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrStudent: state.form.arrStudent,
    searchTerm: state.form.searchTerm,
    searchResults: state.form.searchResults,
    isSearch: state.form.isSearch,
  };
};

const ComponentWithRedux = connect(mapStateToProps)(TableStudent);

export default ComponentWithRedux;
