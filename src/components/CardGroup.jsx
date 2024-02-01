import { useState } from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Program from "./Program";

const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function CardGroup({programObjs, setProgramObjs, show}) {

  let [displayedProgramId, setDisplayedProgramId] = useState(-1);

  return (
    <div className="workout-cards">
      {programObjs.map((element, index) => {
        return (
          <div key={element.programId}>
            <Card
              className="card"
              style={{ width: "16rem" }}
              
            >
              <Card.Img
                variant="top"
                className="program-image"
                src={element.image}
              />
              <Card.Body>
              {!show && <Card.Title className="card-content">{weeks[index]}</Card.Title>}
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
          </div>
        );
      })}
    </div>
  )
}