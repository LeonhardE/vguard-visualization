import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function VGuard() {
    const [validator, setValidator] = useState(3);
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          
          <Fab size="medium" color="secondary" aria-label="add">
            <AddIcon onClick={() => {
                if (validator < 10) {
                    setValidator(validator + 1)
                }
                }}/>
          </Fab>
          <Fab size="medium" color="secondary" aria-label="add">
            <RemoveIcon onClick={() => {
                if (validator > 1) {
                    setValidator(validator - 1)
                }
                }}/>
          </Fab>
          <p>Validators: {validator}</p>
        </Box>
        
        
      );
}