import React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './Util';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

    async function testLog(key) {
        const response = await fetch("http://localhost:8000/get_order_log/" + key, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
        });

        const data = await response.json();
        console.log(data);

    }

    const [orderTarget, setOrderTarget] = useState("");

    const clearOrderTarget = () => {
        setOrderTarget("");
    }

    const limitChar = 50;

    function handleOrderTarget(e) {
        setOrderTarget(e.target.value.toString());
    };

    function handleOrder() {
        const strLen = orderTarget.length;
        if (strLen > 0 && strLen <= limitChar) {
            console.log(orderTarget);
        } else {
            console.log("invalid order target");
        }
    };

    const [open, setOpen] = useState([false, false]);
    const handleClose = () => {
        setOpen([false, false]);
        clearOrderTarget();
    };
    const handleToggle = (key) => {
        if (key === 0) {
            setOpen([true, false]);
            clearOrderTarget();
        }
        else {
            setOpen([false, true]);
        }
    };

    let carlist = []
    for (let i = 0; i < 10; i++) {
        carlist.push({
            name: "Car" + i,
            key: i
        })
    }

    const [booth, setBooth] = useState([]);

    let temp = {};
    for (let i = 0; i < carlist.length; i++) {
        temp[i] = false;
    }
    const [isSelected, setIsSelected] = useState(temp);
    const [isProposer, setIsProposer] = useState(temp);

    useEffect(() => {
        testGET();
        testPOST();
        testLog(0);
    }, []);

    const selectCar = (key) => {
        const Boothcopy = [...booth];
        Boothcopy.push(key);
        setBooth(Boothcopy);
        setIsSelected({...isSelected, [key]: true});
        if (Boothcopy.length === 1) {
            setIsProposer({...isProposer, [key]: true});
        }
    }

    const deselectCar = (key) => {
        const Boothcopy = [];
        for (let i = 0; i < booth.length; i++) {
            if (booth[i] === key) {
                continue;
            }
            Boothcopy.push(booth[i]);
        }
        setBooth(Boothcopy);
        setIsSelected({...isSelected, [key]: false});
        if (isProposer[key]) {
            if (Boothcopy.length > 0) {
                setIsProposer({...isProposer, [key]: false, [Boothcopy[0]]: true});
            }
            else {
                setIsProposer({...isProposer, [key]: false});
            }
        }
    }

    const setProposer = (key) => {
        // only works for selected and non-proposer car
        const Boothcopy = [key];
        let previous = booth[0];
        for (let i = 0; i < booth.length; i++) {
            if (booth[i] === key) {
                continue;
            }
            Boothcopy.push(booth[i]);
        }
        setBooth(Boothcopy);
        setIsProposer({...isProposer, [key]: true, [previous]: false});
    }

    const handleSelect = (key) => {
        if (booth.includes(key)) {
            deselectCar(key);
        }
        else if (booth.length <= 4){
            selectCar(key);
        }
    }

    // useEffect(() => {
    //     console.log(isSelected)
    //     console.log(isProposer)
    // }, [isSelected, isProposer])


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
                    <Typography variant="body1" align="center" color="text.secondary" paragraph>
                        Booth: {booth}
                    </Typography>
                    <Backdrop
                        sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1
                        }}
                        open={open[0]}
                    >
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                width: '90vw',
                                height: '90vh',
                                border: 8,
                                borderColor: 'text.primary',
                                borderRadius: '5%'
                            }}
                        >
                            <Ordering
                                initialTarget={orderTarget}
                                onTargetChange={handleOrderTarget}
                                onTargetApply={handleOrder}
                                booth={booth}
                            />
                            <Button
                                sx={{
                                    bottom: 0,
                                    left: "83vw"
                                }}
                                onClick={() => handleClose()}>
                                Back
                            </Button>
                        </Box>
                    </Backdrop>
                    <Backdrop
                        sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1
                        }}
                        open={open[1]}
                    >
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                width: '90vw',
                                height: '90vh',
                                border: 8,
                                borderColor: 'text.primary',
                                borderRadius: '5%'
                            }}
                        >
                            <Consensus />
                            <Button
                                sx={{
                                    bottom: 0,
                                    left: "83vw"
                                }}
                                onClick={() => handleClose()}>
                                Back
                            </Button>
                        </Box>
                    </Backdrop>
                </Container>
            </Box>

            <Container maxWidth="100vw">
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center" 
                    className="msgDisplay"
                    spacing={2}>
                    {carlist.map((car) => (
                        <Grid item key={car.key} xs={2.4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardActionArea>
                                    <CardMedia 
                                        component="div"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img 
                                            src="car.png"
                                            alt="car"
                                            style={{
                                                maxWidth: '25%'
                                            }}
                                        />
                                    </CardMedia>
                                </CardActionArea>
                                <CardContent
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 20
                                    }}
                                >
                                    <Typography variant="body2">{car.name}</Typography>
                                </CardContent>
                                <CardActions style={{justifyContent: 'center'}}>
                                <Button size="small" color="primary" onClick={() => handleSelect(car.key)} disabled={booth.length === 4 && !isSelected[car.key]}>
                                    {isSelected[car.key] ? "Deselect" : "Select"}
                                </Button>
                                <Button size="small" color="primary" onClick={() => setProposer(car.key)} 
                                        disabled={!isSelected[car.key] || isProposer[car.key]}>
                                    Set proposer
                                </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>

    );
}