
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import axios from "axios";
import CardGroup from "./components/CardGroup";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './components/Login';
import Swal from 'sweetalert2'


export default function App() {

  const [programObjs, setProgramObjs] = useState([]);

  let [favoriteObj, setFavoriteObj] = useState([]);

  let [show, setShow] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const body = document.querySelector("body")


  // console.log(programObjs)

  useEffect(() => {
    axios
      .get("/this-weeks-program")
      .then((response) => {
        setProgramObjs(response.data);
        // if(response.data) 
        body.style.backgroundImage = "unset"
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

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

  function logoutButton(event){
    event.preventDefault()
    
    Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "question",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#BACDCD",
      cancelButtonColor: "#cd5c5c",
      confirmButtonText: "Logout",
      iconColor: "#DCE0D9",
      background: "#546E7A",
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.post('/logout')
        setProgramObjs([])
        body.style.backgroundImage = 'url("./images/wavebackground.png")'
      }
    })
    
  

}

// console.log(programObjs)
  return (
    <>
    {!programObjs[0] ? <Login setRefresh ={setRefresh} refresh= {refresh}/>:
  
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs='2'>
          <img style={{maxHeight: "90px"}} src={`../images/workoutlogo.png`} alt="workoutlogo"/>
        </Col>
        <Col xs='7'>  
          <h1 className="heading-title">Train. Tone. Transform.</h1>
        </Col>
        <Col>
          <Button xs='2'className="see-all-favorited-button" onClick={getFavoritedPrograms}>
            Favorited
          </Button>
        </Col>
        <Col>
        <Button xs='2' onClick={logoutButton}>Logout</Button></Col>
      </Row>
      <br></br>
      <Row>
        <Col xs="2"></Col>
        <Col className="center-homepage-image">
              <img
                className="homepage-image"
                src="https://static.vecteezy.com/system/resources/thumbnails/026/781/389/small_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg"
                alt="Gym Image"
              />
        </Col>
      </Row>
      <br></br>
      <Row className="card-row">
        <CardGroup
          programObjs={programObjs}
          setProgramObjs={setProgramObjs}
        />

          <div>
            <Modal
              size="lg"
              show= {show}
              // aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton onHide={() => setShow(false)}>
              <Modal.Title>Favorite Programs</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <CardGroup
                  programObjs={favoriteObj}
                  setProgramObjs={setFavoriteObj}
                  show= {show}
              />
                </div>
              </Modal.Body> 
            </Modal>  
          </div>
        </Row>
    </Container>
    }
    </>
  );
}
