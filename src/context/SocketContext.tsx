import SocketIoClient from "socket.io-client";
import { createContext } from "react";

const WS_Server = "https://localhost:5500";

const SocketContext = createContext(null)

const socket = SocketIoClient(WS_Server)

interface Props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    return(
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}