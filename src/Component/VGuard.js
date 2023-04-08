import React from 'react';
import { useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme} from './Util';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import EmailIcon from '@mui/icons-material/Email';
import Backdrop from '@mui/material/Backdrop';
import Ordering from './Ordering';
import Consensus from './Consensus'

export default function VGuard() {

    async function testGET() {
        
        const response = await fetch("http://localhost:8000/test", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
        });
        const data = await response.json();
        console.log(data);
    }

    async function testPOST() {
        const postdata = {
            course: "ECE1770",
            project: "V-Guard"
        }

        const response = await fetch("http://localhost:8000/test", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postdata)
        });
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        testGET();
        testPOST();
    }, []);

    const [open, setOpen] = useState([false, false]);
    const handleClose = () => {
        setOpen([false, false]);
    };
    const handleToggle = (key) => {
        if (key === 0) {
            setOpen([true, false]);
        }
        else {
            setOpen([false, true]);
        }
    };


    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
                >
                <Container maxWidth="sm">
                    <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
                    V-Guard Visualization
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    This is visualization system for V-Guard. You can observe the ordering and consensus process in V-Guard through
                    this webpage. More features are coming soon!
                    </Typography>
                    <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                        <Button variant="contained" onClick={() => handleToggle(0)} >Ordering</Button>
                        <Button variant="outlined" onClick={() => handleToggle(1)} >Consensus</Button>
                    </Stack>
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={open[0]}
                    >
                        <Button onClick={ () => handleClose() }>Back</Button>
                        <Ordering />
                    </Backdrop>
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={open[1]}
                    >
                        <Button onClick={ () => handleClose() }>Back</Button>
                        <Consensus />
                    </Backdrop>
                </Container>
            </Box>
            
        </ThemeProvider>
        
      );
}