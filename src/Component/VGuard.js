import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Item, lightTheme, Message } from './Util';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

export default function VGuard() {
    const [level, setlevel] = useState(0);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [level]);

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
                    This is visualization system for VGuard. You can observe the ordering and consensus progress through
                    this webpage. More features are coming soon!
                    </Typography>
                    <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                        <Button variant="contained" onClick={() => {
                            setlevel(level + 1)
                        }} >Next Step</Button>
                        <Button variant="outlined" onClick={() => {
                            setlevel(0)
                        }} >Restart</Button>
                    </Stack>
                </Container>
            </Box>
            <Container maxWidth="lg">
                {/* <Stack
                sx={{ pt: 4 }}
                direction="column"
                spacing={8}
                justifyContent="center"
                >
                    <img className="vehicle" alt="vehicle" src="car.png" />
                    <img className="vehicle" alt="vehicle" src="car.png" />
                    <img className="vehicle" alt="vehicle" src="car.png" />
                    <img className="vehicle" alt="vehicle" src="car.png" />
                </Stack> */}
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center" 
                    spacing={2}>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                    </Grid>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                    </Grid>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                    </Grid>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                    </Grid>
                    {/* vehicle identities */}
                    <Grid item xs={3}>
                        <Item>Proposer</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>Validator</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>Validator</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>Validator</Item>
                    </Grid>
                    {/* Message level 1 */}
                    <Grid item xs={3} display={level > 0 ? "block" : "none"}>
                        <Message>Send PreOrder Messages to all Validators <br />
                            (Pre-Order, Bi, hBi, Vo, hVo, i, σVp)</Message>
                    </Grid>
                    <Grid item xs={3} display={level > 0 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 0 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 0 ? "block" : "none"}>
                    </Grid>
                    {/* Message level 2 */}
                    <Grid item xs={3} display={level > 1 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 1 ? "block" : "none"}>
                        <Message>Receive PreOrder Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 1 ? "block" : "none"}>
                        <Message>Receive PreOrder Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 1 ? "block" : "none"}>
                        <Message>Receive PreOrder Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    {/* Message level 3 */}
                    <Grid item xs={3} display={level > 2 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 2 ? "block" : "none"}>
                        <Message>If verified, reply to the proposer <br />
                            (PO-Reply, i, σVi)
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 2 ? "block" : "none"}>
                        <Message>If verified, reply to the proposer <br />
                            (PO-Reply, i, σVi)
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 2 ? "block" : "none"}>
                        <Message>If verified, reply to the proposer <br />
                            (PO-Reply, i, σVi)
                        </Message>
                    </Grid>
                    {/* Message level 4 */}
                    <Grid item xs={3} display={level > 3 ? "block" : "none"}>
                        <Message>Collect at least 2f PO-Reply <br />
                            Convert σVi to (t, n)-threshold signatures σoi</Message>
                    </Grid>
                    <Grid item xs={3} display={level > 3 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 3 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 3 ? "block" : "none"}>
                    </Grid>
                    {/* Message level 5 */}
                    <Grid item xs={3} display={level > 4 ? "block" : "none"}>
                        <Message>Send Order Messages to all Validators <br />
                            (Order, i, Qoi, σoi)</Message>
                    </Grid>
                    <Grid item xs={3} display={level > 4 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 4 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 4 ? "block" : "none"}>
                    </Grid>
                    {/* Message level 6 */}
                    <Grid item xs={3} display={level > 5 ? "block" : "none"}>
                        <Message>Append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 5 ? "block" : "none"}>
                        <Message>Receive Order Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 5 ? "block" : "none"}>
                        <Message>Receive Order Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 5 ? "block" : "none"}>
                        <Message>Receive Order Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    {/* Message level 7 */}
                    <Grid item xs={3} display={level > 6 ? "block" : "none"}>
                    </Grid>
                    <Grid item xs={3} display={level > 6 ? "block" : "none"}>
                        <Message>If verified, append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 6 ? "block" : "none"}>
                        <Message>If verified, append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                    <Grid item xs={3} display={level > 6 ? "block" : "none"}>
                        <Message>If verified, append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                </Grid>
                <div ref={messagesEndRef}/>
                <br />
            </Container>
        </ThemeProvider>
        
      );
}