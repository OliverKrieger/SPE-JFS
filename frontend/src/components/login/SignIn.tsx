const SignIn: React.FC = () => {
    return (
        <div className='sign-in-container'>
            <h1>Sign In</h1>
            <form className="my-6 space-y-6 flex flex-col">
                <input type="text" placeholder="username" className="p-2"></input>
                <input type="password" placeholder="password" className="p-2"></input>
            </form>
        </div>
    );
};

export default SignIn;