import { Auth } from '../src/components/Auth'; 
import Cookies from 'universal-cookie';
import { useRef, useState } from 'react'; 
import './style.css'; 
import { Chat } from './components/Chat';
import { AppWrapper } from './components/AppWrapper';

const cookies = new Cookies();

function App() { 
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token')); 
  const [room, setRoom] = useState(""); 

  const roomInputRef = useRef(null);  

  if (!isAuth) { 
    return (
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
      <div className='room-box'> 
        {room ? (
          <Chat room={room} />
        ) : (
          <div className='room-box-2'>
            <label className='room-label'>Enter Room Name</label> <br />
            <input type='text' ref={roomInputRef} 
            placeholder='Type your room name...'
            /> <br />
            <button
              className='room-enter-btn'
              onClick={() => setRoom(roomInputRef.current.value)}
            >
              Enter chat
            </button>
          </div>
        )}
      </div>
    </AppWrapper>
  );
}

export default App;
