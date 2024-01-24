import { useState } from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Program from "./Program";

const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function CardGroup({programObjs, setProgramObjs}) {

  let [displayedProgramId, setDisplayedProgramId] = useState(-1);

  return (
    <div className="workout-cards">
      {programObjs.map((element, index) => {
        return (
          <Card
            className="card"
            style={{ width: "18rem" }}
            key={element.programId +""+index}
          >
            <Card.Img
              variant="top"
              className="program-image"
              src={element.image}
            />
            <Card.Body>
              <Card.Title className="card-content">{weeks[index]}</Card.Title>
              <Card.Text className="card-content">
                {element.name}
                <Button
                  className="card-content"
                  variant="primary"
                  onClick={() => setDisplayedProgramId(element.programId)}
                >
                  Exercises
                </Button>
                {displayedProgramId === element.programId && (
                  <Program
                    displayedProgramId={displayedProgramId}
                    setDisplayedProgramId={setDisplayedProgramId}
                    date={element.date}
                    isFav={element.isFav}
                    setProgramObjs={setProgramObjs}
                  />
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  )
}