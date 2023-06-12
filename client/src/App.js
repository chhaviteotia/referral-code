import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Referral from './components/Referral/Referral';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
          <Route path='/register' element={<Register />} />
          <Route path="referral" element={<Referral />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
