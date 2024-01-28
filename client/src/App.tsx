import React, {useState} from 'react';
import logo from './logo.svg';
import { TECollapse, TERipple } from "tw-elements-react";
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <>
      <LoginForm/>
    </>
  );
}

export default App;
