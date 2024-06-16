import React from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, styled} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled} from '@mui/icons-material';

import { SocketContext } from '../SocketContext';

const Options= ( {children}) => {
    return (
        <div>
            Options
            {children}
        </div>
    )
}

export default Options;