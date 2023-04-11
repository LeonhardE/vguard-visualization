import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { Item, lightTheme, Message } from './Util';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Consensus({
    booth,
    consenTarget,
    setOpen,
    clearSelection
}) {

    const [level, setlevel] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [isExitDisabled, setIsExitDisabled] = useState(false);
    const [currMsgLst, setCurrMsgLst] = useState([]);
    const [isStartDisabled, setIsStartDisabled] = useState(false);
    const [crashDisabled, setCrashDisabled] = useState([false, false, false, false])

    const proposer = "Car".concat(booth[0]);
    const validator1 = "Car".concat(booth[1]);
    const validator2 = "Car".concat(booth[2]);
    const validator3 = "Car".concat(booth[3]);

    async function crash(key) {
        const response = await fetch("http://localhost:8000/terminate/" + key, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
        });
        const data = await response.json();
        console.log(data);
        let index = 0;
        for (let i = 0; i < booth.length; i++) {
            if (booth[i] === key) {
                index = i;
                break;
            }
        }
        let temp = [];
        for (let i = 0; i < crashDisabled.length; i++) {
            if (i === index) {
                temp[i] = true;
            }
            else {
                temp[i] = crashDisabled[i];
            }
        }
        setCrashDisabled(temp)
        return data
    }

    async function startConsensusPhase() {
        setCurrMsgLst([]);
        if (!booth) {
            setIsStartDisabled(true);
            setIsNextDisabled(true);
            setIsExitDisabled(false);
            return {
                'error': 'undefined booth',
                'success': 'false'
            };
        } 
        else {
            const postData = {
                'booth': [...booth]
            }
            console.log(postData);

            const response = await fetch("http://localhost:8000/start_consensus_phase", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);

            if (data['success'] === 'true') {
                setIsStartDisabled(true);
                setIsNextDisabled(false);
                setIsExitDisabled(true);
                console.log(data['msg']);
            } else {
                setIsStartDisabled(false);
                setIsNextDisabled(true);
                setIsExitDisabled(false);
                console.log(data['error']);
            }

            return data;
        }
    }

    async function handleNextStep() {
        const postData = {}

        const response = await fetch("http://localhost:8000/next_step", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log(data);

        if (data['success'] === 'true') {
            setIsStartDisabled(true);
            setIsNextDisabled(false);
            setIsExitDisabled(true);
            console.log(data['msg']);
            const msgLst = []
            for (let i = 0; i < booth.length; i++) {
                msgLst.push("");
            }
            for (let i = 0; i < data['msg'].length; i++) {
                const idx = booth.indexOf(data['msg'][i]['id']);
                if (idx >= 0) {
                    const temp = []
                    for (let [key, value] of Object.entries(data['msg'][i])) {
                        if (key !== 'id') {
                            temp.push(key.toString().concat(": ").concat(value));
                        }
                    }
                    msgLst[idx] = temp.join('\n');
                }
            }
            currMsgLst.push(msgLst)
            setCurrMsgLst([...currMsgLst]);
            console.log(currMsgLst);
        } else {
            // 'error': 'VGUARD_STOPPED'
            setIsStartDisabled(true);
            setIsNextDisabled(true);
            setIsExitDisabled(false);
            console.log(data['error']);
        }

        return data;
    }

    const handleExit = () => {
        setOpen([false, false]);
        setIsStartDisabled(false);
        setIsNextDisabled(true);
        setIsExitDisabled(false);
        setCurrMsgLst([]);
        setCrashDisabled([false, false, false, false]);
        // clear seletion
        clearSelection();
    };

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
                    Consensus Phase
                </Typography>
                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: "2vh" }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Typography variant="body1" align="center" color="text.secondary" paragraph>
                            <b>Consensus Target</b> <br />
                            BlockId: {consenTarget.blockId} <br />
                            Booth: Car{consenTarget.booth[0]} Car{consenTarget.booth[1]} Car{consenTarget.booth[2]} Car{consenTarget.booth[3]} <br />
                            Timestamp: {consenTarget.timestamp} <br />
                            Transaction: {consenTarget.tx}
                        </Typography>
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
                            variant="outlined"
                            onClick={() => startConsensusPhase()}
                            disabled={isStartDisabled}
                        >
                            Start
                        </Button>
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
                    {/* vehicle identities */}
                    <Grid item xs={3}>
                        <Item 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: crashDisabled[0] ? 'red' : '#A0D4CD'
                        }}>{proposer} (Proposer)</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: crashDisabled[1] ? 'red' : '#A0D4CD'
                        }}>{validator1} (Validator)</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: crashDisabled[2] ? 'red' : '#A0D4CD'
                        }}>{validator2} (Validator)</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: crashDisabled[3] ? 'red' : '#A0D4CD'
                        }}>{validator3} (Validator)</Item>
                    </Grid>
                    <Grid item xs={3} >
                        <Stack
                            direction="row"
                            spacing={0}
                            justifyContent="center"
                        >
                            <Button variant='outlined' size="small" onClick={() => crash(booth[0])} disabled={crashDisabled[0]}>
                                Click to Crash
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} >
                        <Stack
                            direction="row"
                            spacing={0}
                            justifyContent="center"
                        >
                            <Button variant='outlined' size="small" onClick={() => crash(booth[1])} disabled={crashDisabled[1]}>
                                Click to Crash
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} >
                        <Stack
                            direction="row"
                            spacing={0}
                            justifyContent="center"
                        >
                            <Button variant='outlined' size="small" onClick={() => crash(booth[2])} disabled={crashDisabled[2]}>
                                Click to Crash
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} >
                        <Stack
                            direction="row"
                            spacing={0}
                            justifyContent="center"
                        >
                            <Button variant='outlined' size="small" onClick={() => crash(booth[3])} disabled={crashDisabled[3]}>
                                Click to Crash
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <Container
                sx={{
                    maxWidth: "100vw",
                    height: "22vh",
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