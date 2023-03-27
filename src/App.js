import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './component/signIn/SignIn';
import SignUp from './component/signUp/SignUp';
import Task from './task';
import NavBar from './component/navigate';
import { createContext } from 'react';
import { getAllTask } from './services';
export const CourseContext = createContext();
function App() {

  const [task, setTask] = useState([]);

  const getAllTaskData = async () => {
    let { data } = await getAllTask();
    setTask(data);
  }
  const user = JSON.parse(localStorage.getItem('token'));
  return (
    
    <div className="App">
    <CourseContext.Provider value={{ task }}>
    <Router>
      
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path=  '/task' element={<Task getAllTask={getAllTaskData} />} />
        
      </Routes>
      { user ? <NavBar/> : <></> }
    </Router>

    </CourseContext.Provider>
      </div>
  );
}

export default App;
