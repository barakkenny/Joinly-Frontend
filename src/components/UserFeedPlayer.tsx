import { useRef, useEffect } from 'react'


const UserFeedPlayer: React.FC<{ stream? : MediaStream}> = ({stream}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])

  return (
    <div>
      <video 
      ref={videoRef}
      style={{ width: '1000px', height: '500px'}}
      muted={true}
      autoPlay
      />
    </div>
  )
}

export default UserFeedPlayer
