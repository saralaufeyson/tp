import * as React from 'react';
import { useEffect ,useState,useStyles} from 'react';
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function BasicTextFields1() {
  const [day, setDay] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate(); 
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);


  const handleClick = async(e) => {
    e.preventDefault();
    const trade = { address, name, image, day, description };
    console.log(trade);
    await axios.put(`http://localhost:8080/trades/${id}`, trade);
    navigate("/view");
    };
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080//${id}`);
        setUser(result.data);
      };
  
 

    const styles = {
      position: 'absolute',
      top: 28,
      right: 0,
      left: 0,
      zIndex: 1,
      border: '1px solid',
      p: 1,
      bgcolor: 'background.paper',
    };
  
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
       if (selectedFile) {
        console.log(selectedFile)
      const image = URL.createObjectURL(selectedFile);
      console.log(image)
      setImage(image);}
      };
      const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
      };
    
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
    
      const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
      );
    

    const handleChange = (event) => {
      setDay(event.target.value);};
      
      const handleDescriptionChange = (e) => {
        e.persist();
        
        setDescription(e.target.value);
      };
     
  return (
    <Container maxWidth={false} sx={{  width:'100%',left:0, maxWidth:'none'}}>
        <Paper elevation={4}>
          <h3>Edit Stratergy</h3>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' }, flexGrow:1,}}
       
      
      noValidate
      autoComplete="on"
    >
        
      <TextField id="outlined-basic" label="Statergy name" variant="outlined" value={name}  onChange={(e)=>setName(e.target.value)} required /><br/>
      <TextField id="outlined-basic" label="youtube link" variant="outlined" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Day/Month</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={day}
          onChange={handleChange}
          autoWidth
          label="Day/Month"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Monday'}>Monday</MenuItem>
          <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
          <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
          <MenuItem value={'Thursday'}>Thursday</MenuItem>
          <MenuItem value={'Friday'}>Friday</MenuItem>
          <MenuItem value={'Monthly'}>Monthly Stratergy</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
    <TextField id="outlined-basic" label="Image" variant="outlined" value={image}  onChange={(e)=>setImage(e.target.value)}  /><br/>
    <p>Kindly copy the path of the image and paste it here</p>
    </div>
    <textarea
    required
    aria-label="minimum height"
    style={{ height: '300px' }}
    minRows={10}
    placeholder="Describe your findings"
    value={description}
    onChange={handleDescriptionChange}
  />
    
   
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => navigate(-1)}  sx={{
      backgroundColor: 'darkblue',
      color: 'white', // Text color
      
      '&:hover': {
        backgroundColor: 'black', // Hover state color
      },}}>
        Go back
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick} sx={{
      backgroundColor: '#EE6520',
      color: 'white', // Text color
      '&:hover': {
        backgroundColor: '#883A12', // Hover state color
      },}}>
        Edit
      </Button>
    </Stack>
    
    </Box>
    </Paper>
    
   




    </Container>
    
  );
}