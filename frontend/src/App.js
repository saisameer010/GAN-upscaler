import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import FileUploadPage from './fileUpload.jsx';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    axios.get("/api/test").then(data => {
      console.log("Api Response", data);
    });
  }

  render() {
    return (
      <div className="App">

        <div><FileUploadPage/></div>
      </div>
      
    );
  } 
}

export default App;
