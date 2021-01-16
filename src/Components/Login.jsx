import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../Redux/Actions'
import CircularProgress from '@material-ui/core/CircularProgress';


const Login = () => {


    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const responseGoogle = (response) => {
        console.log(response)
        setIsLoading(true)
        dispatch(userLoggedIn(response, history, setIsLoading))

        // history.push('/Home')
    }

    return (
        <div style={{ textAlign: 'center', marginTop: "200px" }}>
            {
                (isLoading) ? <CircularProgress />
                    :

                    <>
                    <GoogleLogin
                        clientId="1060947681639-l44puqvv2mbnn4ojg5pejmlj1rs6it9c.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                   <a href="https://api.whatsapp.com/send?phone=917975563127&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." class="floats" target="_blank">helloo</a>
                 </>
            }
        </div>
    )
}

export default Login