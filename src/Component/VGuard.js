import React from 'react';
// import { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './Util';
import CssBaseline from '@mui/material/CssBaseline';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

export default function VGuard() {
    // const [validator, setValidator] = useState(4);

    return (
        // <Box sx={{ '& > :not(style)': { m: 1 } }}>
          
        //   <Fab size="medium" color="secondary" aria-label="add">
        //     <AddIcon onClick={() => {
        //         if (validator < 10) {
        //             setValidator(validator + 1)
        //         }
        //         }}/>
        //   </Fab>
        //   <Fab size="medium" color="secondary" aria-label="add">
        //     <RemoveIcon onClick={() => {
        //         if (validator > 1) {
        //             setValidator(validator - 1)
        //         }
        //         }}/>
        //   </Fab>
        //   <p>Validators: {validator}</p>
        // </Box>
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
                    VGuard Visualization
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    This is visualization system for VGuard. You can observe the message passing and consensus progress through
                    this webpage. More features are coming soon!
                    </Typography>
                    <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                        <Button variant="contained" >Next Step</Button>
                        <Button variant="outlined" >Restart</Button>
                    </Stack>
                </Container>
            </Box>
            <Container maxWidth="sm">
                <Stack
                sx={{ pt: 4 }}
                direction="column"
                spacing={8}
                justifyContent="center"
                >
                    <img class="vehicle" alt="vehicle" src="car.png" />
                    <img class="vehicle" alt="vehicle" src="car.png" />
                    <img class="vehicle" alt="vehicle" src="car.png" />
                    <img class="vehicle" alt="vehicle" src="car.png" />
                </Stack>
            </Container>
        </ThemeProvider>
        
      );
}