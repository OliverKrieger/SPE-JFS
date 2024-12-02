const SignUp: React.FC = () => {
    return (
        <div className='sign-up-container'>
            <h1>Sign Up</h1>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="callsign"></input>
            <select>
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
            <input type="password" placeholder="password"></input>
        </div>
    );
};

export default SignUp;