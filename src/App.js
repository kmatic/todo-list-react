import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import { Login } from './components/modal/Modal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser, clearActiveUser } from './redux/features/auth';
import { setProjects } from './redux/features/data';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from './firebase/config';

function App() {
    const dispatch = useDispatch();
    const { isLogged, userID } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const projectsRef = collection(db, `users/${userID}/projects`);
        const unsubscribe = onSnapshot(
            query(projectsRef, orderBy('timestamp')),
            (snapshot) => {
                let projects = [];
                snapshot.docs.forEach((doc) => {
                    projects.push(doc.data());
                });
                dispatch(setProjects(projects));
            },
        );

        return () => unsubscribe();
    }, [userID, dispatch]);

    useEffect(() => {
        // setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const data = {
                    email: user.email,
                    displayName: user.displayName,
                    userID: user.uid,
                };
                dispatch(setActiveUser(data));
                // setLoading(false);
            } else {
                dispatch(clearActiveUser());
                // setLoading(false);
            }
        });
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : !isLogged ? (
                <Login />
            ) : (
                <>
                    <Header />
                    <Main />
                </>
            )}
        </>
    );
}

export default App;
