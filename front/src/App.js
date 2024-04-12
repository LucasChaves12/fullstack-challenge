import { Routes, Route } from 'react-router-dom';
import FilesContainer from './components/filesContainer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FilesContainer />} />
    </Routes>
  );
}


export default App;
