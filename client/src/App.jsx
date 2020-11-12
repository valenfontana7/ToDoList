import React, { Fragment } from "react";
import ListTodos from "./components/ListTodos";
import "./App.css";

export default function App() {
  return (
    <Fragment>
      <div className="container">
        <ListTodos />
      </div>
    </Fragment>
  );
}
