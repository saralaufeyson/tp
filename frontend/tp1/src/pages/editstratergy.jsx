import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function EditStrategy() {
  const [day, setDay] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate(); 
  const { id } = useParams();

  useEffect(() => {
    loadStrategy();
  }, []);

  const loadStrategy = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/trades/${id}`);
      const strategy = result.data;
      setDay(strategy.day);
      setName(strategy.name);
      setAddress(strategy.address);
      setDescription(strategy.description);
      setImage(strategy.image);
    } catch (error) {
      console.error("Error loading strategy:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStrategy = { address, name, image, day, description };
    try {
      await axios.put(`http://localhost:8080/trades/${id}`, updatedStrategy);
      navigate("/view");
    } catch (error) {
      console.error("Error updating strategy:", error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ width: '100%', left: 0, maxWidth: 'none' }}>
      <Paper elevation={4} sx={{ padding: 3 }}>
        <h3>Edit Strategy</h3>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
            flexGrow: 1,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Strategy name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="YouTube link"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="day-select-label">Day/Month</InputLabel>
            <Select
              labelId="day-select-label"
              value={day}
              label="Day/Month"
              onChange={(e) => setDay(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Monthly">Monthly Strategy</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Image URL"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <p>Kindly copy the path of the image and paste it here. Preferably use a Google image URL; try to avoid local images.</p>
          <TextareaAutosize
            minRows={10}
            placeholder="Describe your findings"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ced4da',
              fontFamily: 'inherit',
              fontSize: '1rem',
              resize: 'vertical',
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                backgroundColor: 'darkblue',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              Go back
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                backgroundColor: '#EE6520',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#883A12',
                },
              }}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}