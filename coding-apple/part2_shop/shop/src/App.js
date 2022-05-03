import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import './App.css';
import Data from './data';

import { Link, Route, Switch} from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
      <Route exact path="/">
        <div className="background">
          <h1>20% Season Off</h1>
        </div>
        <div className="container">
          <div className="row">
            {
              shoes.map((value, index) => {
                return (
                  <Card shoes={shoes[index]} index={index} key={index} />
                )
              })
            }
          </div>
          <button className="btn btn-primary" onClick={ ()=>{ 
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then( (result)=>{
              shoes변경([...shoes, ...result.data]);
              // console.log(newShoes);
              // console.log(result.data);
            })
            .catch( () => {
              console.log('실패했어요');
            });
          } }>더보기</button>
        </div>
      </Route>
      
      <Route path="/detail/:id">
        <Detail shoes={shoes} 재고={재고} 재고변경 = {재고변경} />
      </Route>

      <Route path="/:id">
        <div>아무거나 적었을 때 이거 보여주셈</div>
      </Route>
      </Switch>

    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={ 'http://codingapple1.github.io/shop/shoes' + (props.index + 1)  + '.jpg' } width="100%" alt="" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}원</p>
    </div>
  )
}

export default App;
