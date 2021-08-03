import { Component } from "react";
import Router from "./Router";
import Globalstyles from "Globalstyles";

class App extends Component {
  render(){
    return (
      <>
      <Router />
      <Globalstyles />
      </>
    );
  }
}

export default App;
