import { FETCH_FILES_REQUEST, FETCH_FILES_SUCCESS, FETCH_FILES_LIST } from './actions';

const initialState = {
  files: [],
  fileList: []
};


const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES_REQUEST:
      return {
        ...state,
      };
    case FETCH_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload,
      };
      case FETCH_FILES_LIST:
      return {
        ...state,
        fileList: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;