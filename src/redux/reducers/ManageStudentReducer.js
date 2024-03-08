

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
  searchTerm: '',
  searchResults: [],
  isSearch: false
};


export const ManageStudentReducer = (state = initialState, action) => {
  let cloneArr = [...state.arrStudent]
  switch (action.type) {
    case "ADD_STUDENT":
      console.log(1);
      return {
        ...state,
        arrStudent: [...state.arrStudent, action.payload],
        isEdit: false,
        isSearch: false
      };
    case "DELETE_STUDENT":
      console.log(2);
      let newArr = cloneArr.filter((e) => e.id !== action.payload)

      return {
        ...state,
        arrStudent: newArr,
        isEdit: false
      };
    case "EDIT_STUDENT":
      console.log(3);
      document.querySelector('input[name="id"]').readOnly = true;

      document.querySelectorAll('.btnDelete').forEach(e => {
        if(e.classList.contains(action.payload.id)) {
          e.disabled = true;
        } else {
          e.disabled = false
        }
      })
      return {
        ...state,
        editStudent: action.payload,
        isEdit: true,
      };

    case "UPDATE_STUDENT":
      document.querySelector('input[name="id"]').readOnly = false
      
      document.querySelectorAll('.btnDelete').forEach(e => {
        if(e.classList.contains(action.payload.id)) {
          e.disabled = false;
        }
      })

      console.log(4);
      let newArr1 = cloneArr.filter((e) => e.id !== action.payload.id)
      return {
        ...state,
        arrStudent: [...newArr1, action.payload],
        isEdit: false,
        // isSearch: false,
      };

    case "UPDATE_SEARCH_TERM":
      // let temp = true
      if(state.isSearch) {
        if(action.payload === "") {
          return {
            ...state,
            searchTerm: action.payload,
            isSearch: false
          };
        }
      }
      return {
        ...state,
        searchTerm: action.payload
      };
    case "SET_SEARCH_RESULTS":
      // let resultSearch = state.arrStudent.filter(student => student.name.toLowerCase().includes(action.payload.toLowerCase()))
      let newArr2 = state.arrStudent.filter(student => student.name.toLowerCase().includes(action.payload.toLowerCase()))
      return {
        ...state,
        searchResults: newArr2,
        isSearch: true, isEdit: false
      };
    default:
      return { ...state };
  }
};
