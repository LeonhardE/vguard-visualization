import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { Item, lightTheme, Message } from './Util';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Ordering({ booth, initialTarget, onTargetChange, onTargetApply }) {
    const [level, setlevel] = useState(0);

    const proposer = "Car".concat(booth[0]);
    const validator1 = "Car".concat(booth[1]);
    const validator2 = "Car".concat(booth[2]);
    const validator3 = "Car".concat(booth[3]);

    // auto scroll to bottom
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [level]);

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <p className="multiline">
                    {isReadMore ? text[0].slice(0, 20).concat("...") : text[0]}
                    {isReadMore ? "" : <br />}
                    {isReadMore ? "" : text[2]}
                </p>
                <Button
                    onClick={() => toggleReadMore()}
                    sx={{
                        top: 0,
                        right: 0
                    }}
                >
                    {isReadMore ?
                        <KeyboardArrowDownIcon /> :
                        <KeyboardArrowUpIcon />
                    }
                </Button>
            </Stack>
        );
    };


    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Box
                sx={{
                    pt: '2vh',
                    pb: '2vh'
                }}
            >
                <Typography variant="h3" align="center" color="text.primary">
                    Ordering Booth: [{proposer}, {validator1}, {validator2}, {validator3}]
                </Typography>
                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: "2vh" }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <TextField id="ordering-target"
                            label="Ordering Target"
                            value={initialTarget}
                            onChange={(e) => onTargetChange(e)}
                        />
                        <Button
                            onClick={() => onTargetApply()}
                        >
                            Apply
                        </Button>
                    </Stack>
                </Container>
                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: "2vh" }}
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
            <Container
                sx={{
                    maxWidth: "100vw"
                }}
            >
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className="msgDisplay"
                    spacing={2}
                >
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
                        <Item>{proposer} (Proposer)</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>{validator1} (Validator)</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>{validator2} (Validator)</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>{validator3} (Validator)</Item>
                    </Grid>
                </Grid>
            </Container>
            <Container
                sx={{
                    maxWidth: "100vw",
                    height: "31vh",
                    mt: "1vh",
                    mb: "1vh",
                    border: 2,
                    borderColor: '#D3D3D3',
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    overflowY: "scroll"
                }}
            >
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className="msgDisplay"
                    spacing={2}
                >
                    {/* Message level 1 */}
                    <Grid item xs={3}
                        // display = {level > 1 ? "none" : "block"}
                        className={level >= 1 ? "showmsg" : "hiddenmsg"}>
                        <Message>
                            <ReadMore>
                                Send PreOrder Messages to all Validators <br />
                                (Pre-Order, Bi, hBi, Vo, hVo, i, σVp)
                            </ReadMore>
                        </Message>
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
                <div ref={messagesEndRef} />
                <br />
            </Container>
        </ThemeProvider>
    );
}