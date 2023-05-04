import {useState} from "react";
import {Tabs} from 'antd';
import UserPage from "./pages/UserPage";
import UserDetail from "./pages/UserDetail";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = (props) => {
  return  (
      <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/user/:id" element={<UserDetail />}/>
      </Routes>
      </Router>
  )
}

export default App;