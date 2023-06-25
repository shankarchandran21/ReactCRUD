
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './Components/Detail/Detail';
import DetailList from  './Components/DetailList/DetailList'
import ChildList from './Components/ChildList/ChildList';
import ChildForm from './Components/ChildForm/ChildForm';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Detail/>}/>
      <Route path='/list' element={<DetailList/>}/>
       <Route path='list/child/:id' element={<ChildList/>}/>
       <Route path='/childForm/:parent/:child' element={<ChildForm/>} />
    </Routes>
  );
}

export default App;
