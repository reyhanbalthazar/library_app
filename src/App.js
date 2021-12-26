import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    )
  }
}

export default App;