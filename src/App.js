import React from "react";
import { Routes, Route } from "react-router";
import NavbarComponent from "./component/Navbar";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </div>
    )
  }
}

export default App;