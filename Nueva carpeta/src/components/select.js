import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilesByFileName, fetchFileList, fetchFiles } from '../redux/actions';
import Form from 'react-bootstrap/Form';


const Select = () => {
  const dispatch = useDispatch();
  const { fileList } = useSelector((state) => state);
  const [selectedOption, setSelectedOption] = useState('Select');

  useEffect(() => {
    dispatch(fetchFileList());
  }, [dispatch]);


  const handleSearch = (e) => {
    const selectedName = e.target.value
    if(selectedName === "All") {
      dispatch(fetchFiles())
    }
    dispatch(fetchFilesByFileName(selectedName));
    setSelectedOption(selectedName)
  };

  return (
    <Form.Select aria-label="Default select example" value={selectedOption} onChange={(e) => handleSearch(e)}>
      <option disabled={true} value="Select" >Select a file</option>
      {fileList ? (
        fileList.map((file, index) => (
            <option key={index} value={file}>{file}</option>

      ))) : (
        <div>No files available</div>
      )}
      <option value="All">All</option>
    </Form.Select>
  );
};

export default Select;