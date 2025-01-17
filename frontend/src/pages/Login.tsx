import React, { useState } from 'react'
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';

const Login: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<'SignIn' | 'SignUp'>('SignIn');

    const toggleComponent = () => {
        setActiveComponent((prev) => (prev === 'SignIn' ? 'SignUp' : 'SignIn'));
    };

    return (
        <div className='login-container text-center flex flex-col min-h-screen items-center justify-center w-48 sm:w-96 mx-auto'>
            <div>
                {activeComponent === 'SignIn' ? <SignIn /> : <SignUp toggle={toggleComponent} />}
            </div>
            <button onClick={toggleComponent}>
                {activeComponent === 'SignIn' ? 'Switch to Sign Up' : 'Switch to Sign In'}
            </button>
        </div>
    );
};

export default Login;