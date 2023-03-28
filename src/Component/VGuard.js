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
import EmailIcon from '@mui/icons-material/Email';

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
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center" 
                    className="msgDisplay"
                    spacing={2}>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                        <EmailIcon className="msg1" opacity={level === 1 || level === 5 ? 1 : 0} />
                        <EmailIcon className="msg2" opacity={level === 1 || level === 5 ? 1 : 0} />
                        <EmailIcon className="msg3" opacity={level === 1 || level === 5 ? 1 : 0} />
                    </Grid>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                        <EmailIcon className="msg4" 
                            opacity={level === 3 ? 1 : 0} 
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                        <EmailIcon className="msg5" 
                            opacity={level === 3 ? 1 : 0} 
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <img className="vehicle" alt="vehicle" src="car.png" />
                        <EmailIcon className="msg6" 
                            opacity={level === 3 ? 1 : 0} 
                        />
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
                    <Grid item xs={3} 
                        // display = {level > 1 ? "none" : "block"} 
                        className={level >= 1 ? "showmsg" : "hiddenmsg"}>
                        <Message>Send PreOrder Messages to all Validators <br />
                            (Pre-Order, Bi, hBi, Vo, hVo, i, σVp)</Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 1 ? "none" : "block"} 
                        className={level >= 1 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 1 ? "none" : "block"} 
                        className={level >= 1 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 1 ? "none" : "block"} 
                        className={level >= 1 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    {/* Message level 2 */}
                    <Grid item xs={3} 
                        // display = {level > 2 ? "none" : "block"} 
                        className={level >= 2 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 2 ? "none" : "block"} 
                        className={level >= 2 ? "showmsg" : "hiddenmsg"}>
                        <Message>Receive PreOrder Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 2 ? "none" : "block"} 
                        className={level >= 2 ? "showmsg" : "hiddenmsg"}>
                        <Message>Receive PreOrder Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 2 ? "none" : "block"} 
                        className={level >= 2 ? "showmsg" : "hiddenmsg"}>
                        <Message>Receive PreOrder Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    {/* Message level 3 */}
                    <Grid item xs={3} 
                        // display = {level > 3 ? "none" : "block"} 
                        className={level >= 3 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 3 ? "none" : "block"} 
                        className={level >= 3 ? "showmsg" : "hiddenmsg"}>
                        <Message>If verified, reply to the proposer <br />
                            (PO-Reply, i, σVi)
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 3 ? "none" : "block"} 
                        className={level >= 3 ? "showmsg" : "hiddenmsg"}>
                        <Message>If verified, reply to the proposer <br />
                            (PO-Reply, i, σVi)
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 3 ? "none" : "block"} 
                        className={level >= 3 ? "showmsg" : "hiddenmsg"}>
                        <Message>If verified, reply to the proposer <br />
                            (PO-Reply, i, σVi)
                        </Message>
                    </Grid>
                    {/* Message level 4 */}
                    <Grid item xs={3} 
                        // display = {level > 4 ? "none" : "block"} 
                        className={level >= 4 ? "showmsg" : "hiddenmsg"}>
                        <Message>Collect at least 2f PO-Reply <br />
                            Convert σVi to (t, n)-threshold signatures σoi</Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 4 ? "none" : "block"}
                        className={level >= 4 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 4 ? "none" : "block"}
                        className={level >= 4 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 4 ? "none" : "block"}
                        className={level >= 4 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    {/* Message level 5 */}
                    <Grid item xs={3} 
                        // display = {level > 5 ? "none" : "block"}
                        className={level >= 5 ? "showmsg" : "hiddenmsg"}>
                        <Message>Send Order Messages to all Validators <br />
                            (Order, i, Qoi, σoi)</Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 5 ? "none" : "block"}
                        className={level >= 5 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 5 ? "none" : "block"}
                        className={level >= 5 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 5 ? "none" : "block"}
                        className={level >= 5 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    {/* Message level 6 */}
                    <Grid item xs={3} 
                        // display = {level > 6 ? "none" : "block"}
                        className={level >= 6 ? "showmsg" : "hiddenmsg"}>
                        <Message>Append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 6 ? "none" : "block"}
                        className={level >= 6 ? "showmsg" : "hiddenmsg"}>
                        <Message>Receive Order Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 6 ? "none" : "block"}
                        className={level >= 6 ? "showmsg" : "hiddenmsg"}>
                        <Message>Receive Order Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    <Grid item xs={3} 
                        // display = {level > 6 ? "none" : "block"}
                        className={level >= 6 ? "showmsg" : "hiddenmsg"}>
                        <Message>Receive Order Message <br />
                            Start to verify
                        </Message>
                    </Grid>
                    {/* Message level 7 */}
                    <Grid item xs={3} className={level >= 7 ? "showmsg" : "hiddenmsg"}>
                    </Grid>
                    <Grid item xs={3} className={level >= 7 ? "showmsg" : "hiddenmsg"}>
                        <Message>If verified, append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                    <Grid item xs={3} className={level >= 7 ? "showmsg" : "hiddenmsg"}>
                        <Message>If verified, append an order log entry <br />
                            [Oi, Bi, Qoi, Vo, σoi]
                        </Message>
                    </Grid>
                    <Grid item xs={3} className={level >= 7 ? "showmsg" : "hiddenmsg"}>
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