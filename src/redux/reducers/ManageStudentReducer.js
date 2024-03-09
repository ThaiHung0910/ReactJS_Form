import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrStudent: [
    {
      id: 1,
      name: "Nguyen Van A",
      phone: "09381111111",
      email: "nguyenvana@gmail.com",
    },
    {
      id: 2,
      name: "Nguyen Van B",
      phone: "093822232232",
      email: "nguyenvanb@gmail.com",
    },
  ],
  editStudent: {
    id: "",
    name: "",
    phone: "",
    email: "",
  },
  isEdit: false,
  searchTerm: "",
  searchResults: [],
  isSearch: false,
};

const ManageStudentReducer = createSlice({
  name: "ManageStudentReducer",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.arrStudent = [...state.arrStudent, action.payload];
      state.isSearch = false
    },

    deleteStudent: (state, action) => {
      if (window.confirm("Are you sure you want to delete this ?")) {
        state.arrStudent = state.arrStudent.filter(
          (e) => e.id !== action.payload
        );
        state.isSearch = false
      }
    },

    editStudent: (state, action) => {
      document.querySelector('input[name="id"]').readOnly = true;
      document.getElementById('searchButton').disabled = true

      document.querySelectorAll(".btnDelete").forEach((e) => {
        if (e.classList.contains(action.payload.id)) {
          e.disabled = true;
        } else {
          e.disabled = false;
        }
      });

      state.editStudent = action.payload;
      state.isEdit = true;
    },

    updateStudent: (state, action) => {
      document.querySelector('input[name="id"]').readOnly = false;
      document.getElementById('searchButton').disabled = false

      document.querySelectorAll(".btnDelete").forEach((e) => {
        if (e.classList.contains(action.payload.id)) {
          e.disabled = false;
        }
      });

      state.arrStudent = [
        ...state.arrStudent.filter((e) => e.id !== action.payload.id),
        action.payload,
      ];

      state.isEdit = false;
      state.isSearch = false
    },

    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
  

      // if(state.isSearch) {
      //   if(state.searchTerm === "") {
      //     state.isSearch = false
      //     state.searchResults = []
      //   }
      // }
    },

    setSearchResults: (state, action) => {
      state.searchResults = state.arrStudent.filter((e) =>
        e.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.isSearch = true
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  editStudent,
  updateStudent,
  updateSearchTerm,
  setSearchResults,
} = ManageStudentReducer.actions;

export default ManageStudentReducer.reducer;


