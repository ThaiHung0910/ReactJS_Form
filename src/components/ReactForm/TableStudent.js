import React, { Component } from "react";
import { connect } from "react-redux";

class TableStudent extends Component {
  renderStudent = () => {
    let {arrStudent, searchResults, isSearch, searchTerm} = this.props
    arrStudent.sort((a, b) => a.id - b.id);
    searchResults.sort((a, b) => a.id - b.id);
    let searchResultsArr = searchResults.map((e) => {
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
                this.props.editStudent(e);
              }}
              className="btn btn-success"
            >
              Edit
            </button>
            <button
              onClick={() => {
                this.props.deleteStudent(id);
              }}
              className={`btn btn-danger btnDelete mx-1 ${id}`}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }), studentArr = arrStudent.map((e) => {
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
                // console.log(this.props)
                // this.props.handleEditStudent(e)
                this.props.editStudent(e)
              }}
              className="btn btn-success"
            >
              Edit
            </button>
            <button
              key={id}
              onClick={() => {
                this.props.deleteStudent(id)
              }}
              className={`btn btn-danger btnDelete mx-1 ${id}`}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    })

    if(isSearch) {
      if(searchResults.length) {
        if(searchTerm === "") {
          return studentArr
        } 
        return searchResultsArr
      } else {
        return <tr><td><h3>Nothing Found. Please try again</h3></td></tr>
      }
    } else {
      return studentArr
    }
  };

  render() {
    console.log(this.props.arrStudent);
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
              console.log(e.target.value);
              this.props.updateSearchTerm(e.target.value);

            }}
          />
          <button
            onClick={() => {
              this.props.setSearchResults(this.props.searchTerm);
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
            {this.renderStudent(
              this.props.searchResults,
              this.props.arrStudent,
              this.props.searchTerm
            )}
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
    isSearch: state.form.isSearch
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (id) => {
      const action = {
        type: "DELETE_STUDENT",
        payload: id,
      };
      dispatch(action);
    },

    editStudent: (student) => {
      const action = {
        type: "EDIT_STUDENT",
        payload: student,
      };
      dispatch(action);
    },

    updateSearchTerm: (term) => {
      const action = {
        type: "UPDATE_SEARCH_TERM",
        payload: term,
      };
      dispatch(action);
    },

    setSearchResults: (results) => {
      const action = {
        type: "SET_SEARCH_RESULTS",
        payload: results,
      };
      dispatch(action);
    },
  };
};

const ComponentWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableStudent);

export default ComponentWithRedux;
