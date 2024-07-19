import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams ,useNavigate,} from "react-router-dom";
import Card from 'react-bootstrap/Card';import Button from 'react-bootstrap/Button';

export default function Viewdoc() {
   
    const navigate = useNavigate(); 
      const { id } = useParams();
      const [student, setStudents] = useState([]);
    
      useEffect(() => {
        loadUser();
      }, []);
    
      const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/trades/${id}`);
        setStudents(result.data);
      };
  return (
    <div className="container">
   
    <Card style={{  border: '2px solid orange' ,boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)'}}>
      <Card.Body>
        <Card.Title><b>Stratergy:</b>{student.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><b>Day:</b> {student.day}</Card.Subtitle>
        <Card.Text>
     <b>Description:</b> {student.description}
        </Card.Text>
        <iframe align="right" width="560" height="315" src={student.address} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe align="left" width="560" height="315" src={student.address} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{
      backgroundColor: '#EE6520',
      color: 'white', // Text color
      '&:hover': {
        backgroundColor: '#883A12', // Hover state color
      },}}>
        Go back
      </Button>
      </Card.Body>
       </Card>  
  </div>
);
}

