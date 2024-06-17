import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, styled} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled} from '@mui/icons-material';

import { SocketContext } from '../SocketContext';

const Root = styled('form')({
    display: 'flex',
    flexDirection: 'column',
});

const GridContainer = styled(Grid)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  }));
  
const StyledContainer = styled(Container)(({ theme }) => ({
    width: '1000px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
        width: '80%',
    },
}));

const StyledCopytoClipboard = styled(CopyToClipboard)({
    marginTop: 20,
});

const StyledGrid = styled(Grid)({
    padding: 20,
});

const StyledButton = styled(Button)({
    marginTop: 20,
});

const StyledPaper = styled(Paper)({
    padding: '10px 20px',
    border: '2px solid black',
});

const Options= ( {children}) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <StyledContainer>
            <StyledPaper elevation={10}>
                <Root noValidate autoComplete="off">
                    <GridContainer container>
                        <StyledGrid item xs={12} md={6}>
                            <Typography gutterBottom variant="h6">Account Info</Typography>
                            <TextField id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                            <StyledCopytoClipboard text={me}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                                 Copy Your ID
                                </Button>
                            </StyledCopytoClipboard>
                        </StyledGrid>
                        <StyledGrid item xs={12} md={6}>
                            <Typography gutterBottom variant="h6">Make a call</Typography>
                            <TextField id="name" label="ID to Call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth/>
                            {callAccepted && !callEnded ? (
                                <StyledButton variant="contained" color="secondary" fullWidth startIcon={<PhoneDisabled fontSize="large"/>} onClick={leaveCall} >
                                    Hang up
                                </StyledButton>
                            ) : (
                                <StyledButton variant="contained" color="primary" fullWidth startIcon={<Phone fontSize="large"/>} onClick={() => callUser(idToCall)} >
                                    Call
                                </StyledButton>
                            )}
                        </StyledGrid>
                    </GridContainer>
                </Root>
                { children }
            </StyledPaper>
        </StyledContainer>
    )
}

export default Options;