import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import FileUploadPage from './fileUpload.jsx';
import Home from './pages/home/HomeComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, HashRouter } from "react-router-dom";
class App extends React.Component {

  componentDidMount() {
    axios.get("/api/test").then(data => {
      console.log("Api Response", data);
    });
  }

  render() {
    // const materialDarkTheme = {
    //   body: "#263238",
    //   text: "#aeaeae",
    //   expTxtColor: "#000a12",
    //   highlight: "#4f5b62",
    //   dark: "#000a12",
    //   secondaryText: "#aeaeae",
    //   imageHighlight: "#607d8b",
    //   compImgHighlight: "#E6E6E6",
    //   jacketColor: "#8eacbb",
    //   headerColor: "#34515e",
    //   splashBg: "#4f5b62",
    // };
    // const violetTheme = {
      const materialDarkTheme = {
      body: "#fce4de",
      text: "#430A58",
      expTxtColor: "#000a12",
      highlight: "#D6BEF4",
      dark: "#21052C",
      secondaryText: "#875599",
      imageHighlight: "#9b5de5",
      compImgHighlight: "#E6E6E6",
      jacketColor: "#763D8B",
      headerColor: "#9b5de577",
      splashBg: "#430A58",
    };
    console.log("Rendering App.js")
    return (
      <div className='baseclass'> 
          <HashRouter basename="/">
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <Home {...props} theme={materialDarkTheme} />}
              />
              <Route
                path="/fileupload"
                render={(props) => <FileUploadPage {...props} theme={materialDarkTheme} />}
              />
              
              {/* <Route
                path="/contact"
                render={(props) => (
                  <About_Us {...props} theme={this.props.theme} />
                )}
              /> */}
              
              {/* <Route
                path="/projects"
                render={(props) => (
                  <Projects {...props} theme={this.props.theme} />
                )}
              /> */}
            </Switch>
          </HashRouter>
        </div>
      
    );
  } 
}

export default App;
