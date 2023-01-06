import React, { Component } from "react";
import Header from "../Header/Header";
// import Greeting from "../../containers/greeting/Greeting";
// import Skills from "../../containers/skills/Skills";
import Footer from "../Footer/Footer";
// import TopButton from "../../components/topButton/TopButton";

class Home extends Component {
  render() {
    return (
      <div>
        <Header theme={this.props.theme} />
        {/* <Greeting theme={this.props.theme} /> */}
        {/* <Skills theme={this.props.theme} /> */}
        <Footer theme={this.props.theme} />
        {/* <TopButton theme={this.props.theme} /> */}
      </div>
    );
  }
}

export default Home;
