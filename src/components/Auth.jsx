import {auth, provider} from '../firebase-config' 
import {signInWithPopup} from 'firebase/auth' ;
import setIsAuth from '../App';


import Cookies from 'universal-cookie'; 
const cookies = new Cookies() ; 



export const Auth = (props)=> {  

    const {setIsAuth} = props;

   


    const signInWithGoogle = async()=>{ 

        try{
        const result = await signInWithPopup(auth, provider) 
        console.log(result);
        
        cookies.set('auth-token' , result.user.refreshToken) ; 
        setIsAuth(true) ; 
    } 

        catch(error){ 
            console.error(error);
            
        }
    } ; 


    return( 
        <> 
        <div className='auth-page-div'>   
            <h1 className="auth-page-title"> 
                Welcome To <span style={{color: '#DDA853',fontSize:'2em'}}><em> " Chat " </em></span> App 😁
            </h1> 

            <div className="auth-signIn-box">
                 
            <h2 className='auth-page-signIntitle'>Sign In Google To Continue</h2> 
            <button 
            className='auth-btn'
            onClick={signInWithGoogle}>Sign In With Google</button>


            </div>
            
        </div>
        </>
    )
}