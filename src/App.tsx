
import './App.css'
import CreateContract from './components/CreateContract'
import axios from 'axios'
import CreateItem from './components/CreateItem';
import Dashboard from './components/dashboard';

function App() {
 const fetchAllItems = async () => {
   const itemddata = await axios.get("http://localhost:8081/api/v1/items");
   const data = itemddata.data;
   console.log(data, "data");
 };
  return (
    <>
      
     <div>Hello PMS</div>
     <Dashboard/>
     {/* <CreateContract/> */}
     {/* <CreateItem/> */}
    </>
  )
}

export default App
