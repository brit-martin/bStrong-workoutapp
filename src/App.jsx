
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import axios from "axios";
import CardGroup from "./components/CardGroup";
import Modal from "react-bootstrap/Modal";


export default function App() {

  const [programObjs, setProgramObjs] = useState([]);

  let [favoriteObj, setFavoriteObj] = useState([]);

  let [show, setShow] = useState(false);

  // console.log(programObjs)

  useEffect(() => {
    axios
      .get("/this-weeks-program")
      .then((response) => {
        setProgramObjs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getFavoritedPrograms() {
    axios.get(`/get-favorited?isFav=true`)
    .then ((response) => {
      console.log(response)
      setFavoriteObj(response.data)
      setShow(true)
      console.log(response.data)
    })
    .catch ((error) => {
      console.log(error)
    })
  }
  // console.log(setFavoriteObj)

  return (
    <div className="app">
      <h1 className="heading-title">Workouts of the Week</h1>
      <button
        className="see-all-favorited-button"
        onClick={getFavoritedPrograms}
      >
        Favorited
      </button>

      <img
        className="homepage-image"
        src="https://static.vecteezy.com/system/resources/thumbnails/026/781/389/small_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg"
        alt="Gym Image"
      />

      <CardGroup
        programObjs={programObjs}
        setProgramObjs={setProgramObjs}
      />

        <div>
          <Modal
            size="lg"
            show= {show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton onHide={() => setShow(false)}>
            <Modal.Title>Favorited Programs</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div>
                <CardGroup
                programObjs={favoriteObj}
                setProgramObjs={setFavoriteObj}
             />
              </div>
            </Modal.Body> 
          </Modal>  
        </div>
    </div>
  );
}
