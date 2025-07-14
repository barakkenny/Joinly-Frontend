import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

const CreateRoom: React.FC = () => {

    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log('initialising a request to create room', socket)
        socket.emit("create-room");
    }

  return (
    <button className='bg-teal-500 py-3 px-5 rounded cursor-pointer' onClick={initRoom}>
      Start a new meeting in a new room
    </button>
  )
}

export default CreateRoom;
