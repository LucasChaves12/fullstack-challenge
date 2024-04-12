export const FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST';
export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';
export const FETCH_FILES_LIST = 'FETCH_FILES_LIST';


export const fetchFiles = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/files/data')
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    dispatch(fetchFilesSuccess(data));
  } catch (error) {
    console.log(error)
  }
};
export const fetchFilesSuccess = (files) => ({
  type: FETCH_FILES_SUCCESS,
  payload: files
});

export const fetchFilesByFileName = (fileName) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/files/data?fileName=${fileName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    dispatch(fetchFilesSuccess(data));
  } catch (error) {
    console.log(error)
  }
};

export const fetchFileList = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/files/list`);
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    dispatch(fetchFileListSuccess(data));
  } catch (error) {
    console.log(error)
  }
};
export const fetchFileListSuccess = (files) => ({
  type: FETCH_FILES_LIST,
  payload: files
});
