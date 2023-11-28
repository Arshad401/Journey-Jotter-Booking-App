import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import List from "./Pages/list/List";
import Hotel from './Pages/hotel/Hotel';
import Signup from "./Pages/login/Signup";
import Signin from "./Pages/login/Signin";
function App() {


 return (
   <>
  <BrowserRouter>
  <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path="/hotels" element={<List/>}/>
  <Route path="/hotels/:id" element={<Hotel/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/signin" element={<Signin/>}/>

  

  </Routes>
  
  
  </BrowserRouter>
  </> 
  
  )
}

export default App
