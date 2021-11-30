import React from 'react';
import {data} from "../App"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Sections = () => {
const{title,date,sentiment}=data;
  return (
  
 <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      {date}
    </Card.Text>
    <Button variant="primary">Read it</Button>
  </Card.Body>
</Card>
  )
}

export default Sections;
