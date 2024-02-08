import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./exercise.css";
import Swal from "sweetalert2";

export default function Exercise({ element, exercises }) {
  let [repInput, setRepInput] = useState(element.goal);

  // let element = props.element
  // console.log(element)

  function SaveButton() {
    let body = {
      goal: repInput,
      userId: 1,
      exerciseId: element.exerciseId,
      scheduleId: element.scheduleId,
    };

    console.log(body);

    axios
      .post("/new-rep", body)
      .then((response) => {
        setRepInput(response.data.goal);
        Swal.fire({
          title: "New rep goal saved!",
          icon: "success",
          iconColor: "#BACDCD",
          width: 600,
          padding: "3em",
          color: "white",
          background: "#546E7A",
          showConfirmButton: false,
          timer: 1800,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //this displays the individual exercises by maping through its parent(program.jsx)and displaying all the
  //exercises with the corresponding program Id
  return (
    <div key={element.exerciseId}>
      <h3>{element.name}</h3>
      <p>Goal: {element.reps}</p>
      <label>Reps:</label>
      <input
        type="text"
        name="goal"
        value={repInput}
        className="repInput"
        onChange={(event) => setRepInput(event.target.value)}
      />
      <Button className="btn" onClick={SaveButton}>
        Save
      </Button>

      <p>Sets: {element.sets}</p>
    </div>
  );
}
