import React from "react";
import Button from 'react-bootstrap/Button';
import "./Header.css";
import SearchForm from "./SearchForm";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col";
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({handleSearch,handleHide,handleName})=>{
  const handleAdvance=()=>{
    console.log("clicked")
    handleHide()
  
  }
  const handleNameFilter=()=>{
    console.log('clicked')
    handleName()

  }
    return (
    <header>
    <Container className="header-view">
    <div className="burger">
    <Button variant="dark" size="sm" style={{height:"75%"}} onClick={handleNameFilter}><MenuIcon fontSize="small"/></Button>
    </div>
    <Container className="h1-cont">
      <h1>E-News</h1>
      </Container>
      <Container className="search-cont">
      <SearchForm  handleSearch={handleSearch}/>
      </Container>
      <Container className="btn-cont">
      <Col xs="auto">
        <Button onClick={handleAdvance} > Filters </Button>
        </Col>
        </Container>
      </Container>
    </header>
  );

}

export default Header;

