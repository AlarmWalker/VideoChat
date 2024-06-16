import React, { useContext } from 'react';
import { Grid, Typography, Paper, styled } from '@mui/material';

import { SocketContext } from '../SocketContext';

const GridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const StyledPaper = styled(Paper)({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
});

const StyledVideo = styled('video')(({ theme }) => ({
  width: '550px',
  height: '500px',
  [theme.breakpoints.down('xs')]: {
    width: '300px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  
  return (
    <GridContainer container>
      {stream && (
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <StyledVideo playsInline muted ref={myVideo} autoPlay />
          </StyledPaper>
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <StyledVideo playsInline ref={userVideo} autoPlay />
          </StyledPaper>
        </Grid>
      )}
    </GridContainer>
  );
}

export default VideoPlayer;
