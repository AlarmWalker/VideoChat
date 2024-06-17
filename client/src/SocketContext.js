import React, { createContext, useState, useRef, useEffect } from'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, Setme] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
           .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });
            socket.on('me', (id) => Setme(id));

            socket.on('callUser', ({ from, name: callUserName, signal }) => {
                console.log('hi');
                setCall({ isReceivingCall: true, from, name: callUserName, signal });
            });
    }, []);


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {

            })
    });
    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
        
            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const leaveCall = () => {

        setCallEnded(true);
        connectionRef.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            stream,
            call,
            callAccepted,
            callEnded,
            myVideo,
            userVideo,
            callUser,
            answerCall,
            leaveCall,
            me,
            name,
            setName,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };