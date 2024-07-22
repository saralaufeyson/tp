import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  Container, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  ToggleButton, 
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import PageviewIcon from '@mui/icons-material/Pageview';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monthly'];

const SearchComponent = ({ onSearch, onDaySelect, selectedDay }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter stratergy name"
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '1rem' }}>
          Search
        </Button>
      </div>
      <ToggleButtonGroup
        value={selectedDay}
        exclusive
        onChange={(event, newDay) => onDaySelect(newDay)}
        aria-label="day filter"
        style={{ marginBottom: '1rem', flexWrap: 'wrap' }}
      >
        {days.map((day) => (
          <ToggleButton key={day} value={day} aria-label={day}>
            {day}
          </ToggleButton>
        ))}
        <ToggleButton value={null} aria-label="all days">
          All Stratergies
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

const ViewComponent = ({ students }) => {
    const[student,setStudents]=useState([])
   
    const [data, setData] = useState([]);
    const {id}=useParams()
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    
  React.useEffect(() => {
    loadUsers();
      },[]);
      const loadUsers=async()=>{
        const result=await axios.get(`${API_URL}/trades/getAll`)
        setStudents(result.data)
      }
      const deletestratergy=async(id)=>{
        await axios.delete(`${API_URL}/trades/${id}`)
        console.log('deleted')
        loadUsers()
        alert('Page will be refreshed.');
        window.location.reload();

      }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.day}</TableCell>
              <TableCell>
                <Link to={`/docview/${student.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="small" startIcon={<PageviewIcon />} style={{ marginRight: '0.5rem' }}>
                    View
                  </Button>
                </Link>
                <Link to={`/edit/${student.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="small" startIcon={<SendIcon />} style={{ marginRight: '0.5rem', color: '#ee6520', borderColor: '#ee6520' }}>
                    Edit
                  </Button>
                </Link>
                <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />} onClick={() => deletestratergy(student.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DSea = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, selectedDay, searchTerm]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/trades/getAll`);
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const filterStudents = () => {
    let filtered = students;
    
    if (selectedDay) {
      filtered = filtered.filter(student => student.day === selectedDay);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStudents(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Search Stratergy
      </Typography>
      <SearchComponent 
        onSearch={handleSearch} 
        onDaySelect={handleDaySelect}
        selectedDay={selectedDay}
      />
      <ViewComponent students={filteredStudents} />
    </Container>
  );
};

export default DSea;