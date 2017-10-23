import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import InitialScreen from "./components/InitialScreen";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import ListComponent from "./components/list/ListComponent";
import { Actions } from 'react-native-router-flux';
import CreateItem from './components/list/CreateItem';




const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Stack key="auth" >
                    <Scene key="initialScreen" component={InitialScreen} title="Welcome to ToDo list" initial/>
                    <Scene key="registrationForm" component={RegistrationForm} title="Registration" backTitle="Home"/>
                    <Scene key="loginForm" component={LoginForm} title="Login" backTitle="Home"/>
                </Stack>
                <Stack key="todo">
                    <Scene
                        key="list"
                        component={ListComponent}
                        title="ToDo list"
                        onLeft={()=>console.log("logout pressed")}
                        leftTitle="Logout"
                        onRight={()=> Actions.createItem()}
                        rightTitle="Add"
                        initial
                    />
                    <Scene
                        key="createItem"
                        component={CreateItem}
                        title="New Item"
                    />
                </Stack>
            </Stack>
        </Router>
    );
};
export default RouterComponent;