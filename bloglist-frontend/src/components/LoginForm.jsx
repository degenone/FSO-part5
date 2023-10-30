import { useState } from 'react';
import loginService from '../services/login';

const LoginForm = (props) => {
    const { setUser } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedInBloglistUser',
                JSON.stringify(user)
            );
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.log('Something went wrong... Check your credentials.');
        }
    };
    return (
        <>
            <h2>Log in to the Bloglist Application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Enter username:</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        required
                        minLength={3}
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Enter password:</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        required
                        minLength={8}
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <input type='submit' value='Login' />
                </div>
            </form>
        </>
    );
};

export default LoginForm;
