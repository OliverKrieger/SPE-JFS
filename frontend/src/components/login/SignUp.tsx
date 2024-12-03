const SignUp: React.FC = () => {
    return (
        <div className='sign-up-container'>
            <h1>Sign Up</h1>
            <form className="my-6 space-y-6 flex flex-col">
                <input type="text" placeholder="username" className="p-2"></input>
                <input type="password" placeholder="password" className="p-2"></input>
                <input type="text" placeholder="callsign" className="p-2"></input>
                <select className="p-2">
                    <option>COSMIC</option>
                    <option>GALACTIC</option>
                    <option>QUANTUM</option>
                    <option>DOMINION</option>
                    <option>ASTRO</option>
                    <option>CORSAIRS</option>
                    <option>VOID</option>
                    <option>OBSIDIAN</option>
                    <option>AEGIS</option>
                    <option>UNITED</option>
                </select>
            </form>
        </div>
    );
};

export default SignUp;