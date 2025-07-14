import { useEffect, useState } from 'react'
import SocketIoClient from "socket.io-client";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom'
import Peer from 'peerjs'
import {v4 as UUIDv4} from 'uuid'

const WS_Server = "http://localhost:5500";

export const SocketContext = createContext<null | any>(null)

const socket = SocketIoClient(WS_Server, {
    withCredentials: false,
    transports: ["polling", "websocket"]
})

interface Props {
    children: React.ReactNode
}


export const SocketProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>()

    const navigate = useNavigate();

    const fetchParticipant = ({roomId, participants}: {roomId:string, participants:string[]}) => {
        console.log("fetched room participant");
        console.log(roomId, participants)
    }

    const fetchUserFeed = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
    setStream(stream)
}

    useEffect(() => {
        const userId = UUIDv4();
        const newPeer = new Peer(userId)

        setUser(newPeer);
        fetchUserFeed()

    const enterRoom = ({ roomId } : {roomId: string}) => {
        navigate(`/room/${roomId}`)
    } 

    socket.on("room-created", enterRoom);
    socket.on("get-users", fetchParticipant)
},[]);

    return(
        <SocketContext.Provider value={{ socket, user, stream }}>
            {children}
        </SocketContext.Provider>
    )
}