import React, { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Login } from './components/modal/Modal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useDispatch } from 'react-redux';
import { setActiveUser, clearActiveUser } from './redux/features/auth';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                const data = {
                    email: user.email,
                    displayName: user.displayName,
                    userID: user.uid,
                };
                dispatch(setActiveUser(data));
            } else {
                dispatch(clearActiveUser());
            }
        });
    }, [dispatch]);

    return (
        <>
            <Login />
            <Header />
            <Main />
        </>
    );
}

export default App;
