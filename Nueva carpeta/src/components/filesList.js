import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../redux/actions';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from './select';


const FilesList = () => {
  const dispatch = useDispatch();
  const {files} = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);


  return (
    <div>
      <h2>Files List</h2>
      <Select/>
      <Table striped bordered hover variant="dark">
        <thead>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </thead>
        
      {files ? (
        files.map((file, index) => (
          <tbody key={index}>
          {file.lines.map((lines, i) => (
          <tr key={i}>
            <td>{file?.file || file}</td>
            <td>{lines?.text}</td>
            <td>{lines?.number}</td>
            <td>{lines?.hex}</td>
          </tr>
          ))}
          </tbody>
        ))
      ) : (
        <div>No files available</div>
      )}
        
      </Table>
    </div>
  );
};



export default FilesList