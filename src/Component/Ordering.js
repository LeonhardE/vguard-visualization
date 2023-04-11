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


export default function Ordering({
    booth,
    initialTarget, onTargetChange,
    onTargetApply, isApplyDisabled,
    handleNextStep, isNextDisabled,
    handleExit, isExitDisabled,
    currMsgLst
}) {

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
                <Box
                    sx={{
                        wordWrap: 'break-word',
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        maxWidth: "12vw"
                    }}
                >
                    {isReadMore ? text.slice(0, 20).concat("...") : text}
                </Box>
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
                            disabled={isApplyDisabled}
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
                        <Button
                            variant="contained"
                            onClick={() => {
                                setlevel(level + 1);
                                handleNextStep();
                            }}
                            disabled={isNextDisabled}
                        >
                            Next Step
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setlevel(0);
                                handleExit();
                            }}
                            disabled={isExitDisabled}
                        >
                            Exit
                        </Button>
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
                    height: "37vh",
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
                        className={
                            level >= 1 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 1 && currMsgLst[0][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[0][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 1 ? "none" : "block"}
                        className={
                            level >= 1 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 1 && currMsgLst[0][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[0][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 1 ? "none" : "block"}
                        className={
                            level >= 1 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 1 && currMsgLst[0][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[0][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 1 ? "none" : "block"}
                        className={
                            level >= 1 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 1 && currMsgLst[0][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[0][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    {/* Message level 2 */}
                    <Grid item xs={3}
                        // display = {level > 2 ? "none" : "block"}
                        className={
                            level >= 2 ? "showmsg" : "hiddenmsg"
                        }>

                        {currMsgLst.length >= 2 && currMsgLst[1][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[1][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 2 ? "none" : "block"}
                        className={
                            level >= 2 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 2 && currMsgLst[1][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[1][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 2 ? "none" : "block"}
                        className={
                            level >= 2 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 2 && currMsgLst[1][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[1][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 2 ? "none" : "block"}
                        className={
                            level >= 2 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 2 && currMsgLst[1][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[1][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    {/* Message level 3 */}
                    <Grid item xs={3}
                        // display = {level > 3 ? "none" : "block"}
                        className={
                            level >= 3 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 3 && currMsgLst[2][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[2][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 3 ? "none" : "block"}
                        className={
                            level >= 3 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 3 && currMsgLst[2][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[2][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 3 ? "none" : "block"}
                        className={
                            level >= 3 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 3 && currMsgLst[2][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[2][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 3 ? "none" : "block"}
                        className={
                            level >= 3 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 3 && currMsgLst[2][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[2][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    {/* Message level 4 */}
                    <Grid item xs={3}
                        // display = {level > 4 ? "none" : "block"}
                        className={
                            level >= 4 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 4 && currMsgLst[3][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[3][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 4 ? "none" : "block"}
                        className={
                            level >= 4 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 4 && currMsgLst[3][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[3][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 4 ? "none" : "block"}
                        className={
                            level >= 4 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 4 && currMsgLst[3][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[3][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 4 ? "none" : "block"}
                        className={
                            level >= 4 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 4 && currMsgLst[3][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[3][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    {/* Message level 5 */}
                    <Grid item xs={3}
                        // display = {level > 5 ? "none" : "block"}
                        className={
                            level >= 5 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 5 && currMsgLst[4][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[4][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 5 ? "none" : "block"}
                        className={
                            level >= 5 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 5 && currMsgLst[4][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[4][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 5 ? "none" : "block"}
                        className={
                            level >= 5 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 5 && currMsgLst[4][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[4][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 5 ? "none" : "block"}
                        className={
                            level >= 5 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 5 && currMsgLst[4][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[4][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    {/* Message level 6 */}
                    <Grid item xs={3}
                        // display = {level > 6 ? "none" : "block"}
                        className={
                            level >= 6 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 6 && currMsgLst[5][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[5][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 6 ? "none" : "block"}
                        className={
                            level >= 6 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 6 && currMsgLst[5][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[5][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 6 ? "none" : "block"}
                        className={
                            level >= 6 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 6 && currMsgLst[5][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[5][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        // display = {level > 6 ? "none" : "block"}
                        className={
                            level >= 6 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 6 && currMsgLst[5][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[5][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    {/* Message level 7 */}
                    <Grid item xs={3}
                        className={
                            level >= 7 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 7 && currMsgLst[6][0] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[6][0]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        className={
                            level >= 7 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 7 && currMsgLst[6][1] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[6][1]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        className={
                            level >= 7 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 7 && currMsgLst[6][2] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[6][2]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                    <Grid item xs={3}
                        className={
                            level >= 7 ? "showmsg" : "hiddenmsg"
                        }>
                        {currMsgLst.length >= 7 && currMsgLst[6][3] ?
                            <Message>
                                <ReadMore>
                                    {currMsgLst[6][3]}
                                </ReadMore>
                            </Message>
                            : ""
                        }
                    </Grid>
                </Grid>
                <div ref={messagesEndRef} />
                <br />
            </Container>
        </ThemeProvider>
    );
}