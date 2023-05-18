import './HomePage.css'
import React from 'react';
import { useState , useEffect , useRef} from 'react';

    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    function Room({user , unread , handleRoomClick}){
        return(
            <div className={`room ${unread ? 'unread' : ''}`} onClick={handleRoomClick}>
                <p>{user}</p>
                {unread ? <span className='unread'>O</span> : <span></span>}
            </div>
        );
    }


    var roomName = '';
    var message = '';

    const socket = new WebSocket('ws://localhost:8000/ws/'+ storedToken +'/');
    console.log(socket);

function HomePage() {

    if(!storedToken){
        window.location.href = "/login";
    }

    const [rooms , setRooms] = useState([]);
    const [messages , setMessages] = useState([]);
    const [roomNo , setRoomNo] = useState('roomvalue');

    const overlayRef = useRef(null);
    const popUpRef = useRef(null);
    const inputRef = useRef(null);
    const inboxRef = useRef(null);
    const messageContainerRef = useRef(null);

    let userNameCapitalized ;
    try {
        userNameCapitalized = storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
    } catch (error) {
        userNameCapitalized = 'TestUser';
    }
    
    socket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendmessage(message , roomNo);
        }
      };

    function sendmessage(message , room){
      
        if(message === ''){
            return;
        };
        
        socket.send(JSON.stringify({
          'message': message ,
          "room" : room ,
          "sender" : storedUsername
        }));
        
        const updatedMessages = [...messages, { "text" : message , "sender" : storedUsername , "roomName" : room}];
        setMessages(updatedMessages);
        inputRef.current.value = '';
    };



    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
            
            if(data.roomName === roomNo){
                setMessages((messages)=> [...messages , data])
            }
            else if(data.roomName !== roomNo){

                rooms.forEach(room => {
                    if(room.name === data.roomName){
                        room.unread = true;
                    }
                }
                );
                const updatedRooms = [...rooms];
                updatedRooms.sort((a, b) => (a.unread === b.unread ? 0 : a.unread ? -1 : 1));
                setRooms(updatedRooms);
            }            
    }       

    //to get rooms
    useEffect(() => {
        let isMounted = true;
        console.log(storedToken);
        console.log(storedUsername);
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/home/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json' , //add token
                Authorization: `Token ${storedToken}`
              }
            });
      
            const responseData = await response.json();
            if (isMounted) {
              console.log(responseData);
            
              try {
                    responseData.rooms.forEach(room => {
                        room.unread = false;
                    }
                );
              } catch (error) {
                 console.log("no rooms");
              }
              
             

              if(responseData.rooms){
                  setRooms(responseData.rooms);
              }
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      
        return () => {
          isMounted = false;
        };
      }, []);


    //to create room
    function createRoom(roomName){
        const createRoom = async () => {
                try {
                const response = await fetch('http://localhost:8000/create_room/?name='+roomName , {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json' , //add token
                    Authorization: `Token ${storedToken}`
                    }  
                });

                if(response.status === 200){
                    const data = await response.json();
                    console.log(data);
                    if(data.details){
                        console.log("heyy");
                    }else{
                       
                        // store data room wise
                        try {
                            const modifiedData = data.messages.map(({ text, sender, room }) => ({
                                text,
                                sender,
                                roomName: room.name
                            }));
                            setMessages(modifiedData);
                        } catch (error) {
                            setMessages([]);
                        }
                       

                          
                        
                        // const updatedMessages = [...modifiedData];
                    }
                }

                }catch (error) {
                    console.error(error);
            }

           

        }
        createRoom();
    }

    // room popup
    function openRoomPopup(){
        overlayRef.current.style.display = 'block';
        popUpRef.current.style.display = 'flex';
    }
    
    function closeRoomPopup(){
        overlayRef.current.style.display = 'none';
        popUpRef.current.style.display = 'none';
        roomName = '';
    }

    function getroomname(e){
        roomName = e.target.value;
    }

    // message
    function getMessage(e){
        message = e.target.value;
    }

    //set room no
    const handleRoomClick = (roomname) => {

        setRoomNo(roomname);
        createRoom(roomname);

        rooms.forEach((room) => {
            if(room.name === roomname){
                room.unread = false ;
            }
            setRooms(rooms);
        });

        inboxRef.current.style.display = 'flex';

        console.log("set" + roomNo);
    };


    //logout
    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    };


    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }, [handleRoomClick]);



    return(
    <div className='home-container'>
        <div className='top-container'>

    
            <div className='username-container'>
                <h2 className='username-welcome'>Welcome</h2> 
                <h2>{userNameCapitalized}</h2>
            </div>

            <div className='top-right-container'>
                <div className='username-display'>
                    <p>{roomNo}</p>
                </div>

                <div className='buttons-container'>
                    <button onClick={openRoomPopup}>Create Room</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>

        </div>

        {/* overlay */}
        <div className='overlay' ref={overlayRef} ></div>

        {/* pop up */}
        <div className='pop-up' ref={popUpRef }>
            <div className='pop-up-container'>
                <div className='pop-up-body'>
                    <input type='text' placeholder='Enter Room Name' onChange={getroomname} ></input>
                </div>
                <div className='pop-up-footer'>
                    <button onClick={() => createRoom(roomName)}>Create</button>
                    <button onClick={closeRoomPopup} >Cancel</button>
                </div>
            </div>
        </div>

        <div className='main-container'>
                <div className='rooms-container'>
                    {rooms.map((room, index) => 
                        (  <Room user={room.name}  
                                 unread={room.unread} 
                                 key={index} handleRoomClick={()=>handleRoomClick(room.name)}>
                            </Room>)) }    
                    {/* unique key : user id ?  */}
                </div>
                <div className='inbox-container'>
                
                    <div className='inbox' ref={inboxRef}>
                 
                        <div className='messages-container' ref={messageContainerRef}>
                            {messages
                                // .filter((message) => message.roomName === roomNo)
                                .map((message , index) => (
                                    <div key={index}>
                                        {
                                            message.sender === storedUsername ?
                                            <div className='message-container'> 
                                                <p className="messages">{message.text}</p>
                                            </div>:
                                            <div className='sending-message-conatiner'>
                                                <p className="messages">{message.text}</p>
                                            </div>       
                                        }
                                    </div>
                                
                                ))}
                        </div>
                            
                        <div className='sendbox'>
                            <input type='text' placeholder='Type here' ref={inputRef} 
                                   onChange={getMessage}  onKeyDown={handleKeyDown}>
                            </input>
                            {/* on click send and one key eneter send */}
                            <button onClick={() => {sendmessage(message,roomNo)} }>Send</button>
                        </div>
                        
                    </div>

                </div>
        </div>
    </div>
       
    );

}

export default HomePage;