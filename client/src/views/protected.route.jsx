import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({isAuth: isAuth, component: Component, ...rest }){
    return <Route {...rest} render={(props) => {
        console.log(props, '<<< component');
        if(isAuth){
            return <Component />
        }
        // else if(){

        // }
        
        else{
            return <Redirect to={{pathname: '/', state: {from: props.location}}} />
        }
    }}/>
}