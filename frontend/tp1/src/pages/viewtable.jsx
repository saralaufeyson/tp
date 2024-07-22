import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import * as React from 'react';
import { useState } from 'react';
import { Link, useParams } from "react-router-dom";



 

export default function BasicTable() {
  const [day, setDay] = React.useState('');
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [search,setSearch]=React.useState('')
  const[students,setStudents]=useState([])
  const trade={address,name,image,day,description}
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';



  const {id}=useParams()
      console.log(trade)
    React.useEffect(() => {
      loadUsers();
        },[]);
        const loadUsers=async()=>{
          const result=await axios.get(`${API_URL}/trades/getAll`)
          setStudents(result.data)
        }
        const deletestratergy=async(id)=>{
          await axios.delete(`${API_URL}/trades/${id}`)
          loadUsers()

        }
        
  return (
    
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Stratergy name</TableCell>
            
            <TableCell align="center">day</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {students.map(student=>(
            <TableRow
            key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
              {student.id}
              </TableCell>
              <TableCell align="center">{student.name}</TableCell>
             
              <TableCell align="center">{student.day}</TableCell>
              <TableCell> <Link to ={`/docview/${student.id}`} > <Button size="small" endIcon={<PageviewIcon/>}>View</Button></Link>
          <Link to ={`/edit/${student.id}`} > <Button size="small" endIcon={<SendIcon />} sx={{color: '#ee6520', // Text color
      }}>Edit</Button></Link> 
              <Button size="small" color="error"endIcon={<DeleteIcon />} onClick={()=>deletestratergy(student.id)} >delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
