import './HomePage.css'
import React from 'react';

const users = ["user1" , "user2" , "user3" , "user4" , "user5" , "user6" , "user7" , "user8" , "user9" ,
               "user1" , "user2" , "user3" , "user4" , "user5" , "user6" , "user7" , "user8" , "user9"] ;

function Room({user}){
    return(
        <div className='room'>
            <p>{user}</p>
        </div>
    );
}


function HomePage() {

    return(
       <div className='home-container'>
        <div className='rooms-container'>
            {users.map((user)=><Room user={user}></Room>)}      
            {/* unique key : user id ?  */}
        </div>
        <div className='messages-container'>
            <p>hello</p>
        </div>
       </div>
    );

}

export default HomePage;