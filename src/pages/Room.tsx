import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'

const Room: React.FC = () => {

    const { id } = useParams()
    const { socket, user } = useContext(SocketContext);

    const fetchParticipant = ({roomId, participants}: {roomId:string, participants:string[]}) => {
        console.log("fetched room participant");
        console.log(roomId, participants)
    }

    useEffect(()=> {
    if(user){
        console.log("New user with id", user._id, 'has joined room', id)
        socket.emit("joined-room", {roomId: id, peerId: user._id})
        socket.on("get-users", fetchParticipant)
        } 
    }, [id, user])

  return (
    <div>
      room: {id}
    </div>
  )
}

export default Room
