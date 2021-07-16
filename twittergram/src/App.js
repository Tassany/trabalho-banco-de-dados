import React, { Component } from "react";
import "./App.css";
import Routes from "./Routes/Routes";
import {AuthProvider, MyContext} from "./components/Provider/AuthProvider";
export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes/>
      </div>
    </AuthProvider>
  );
}
