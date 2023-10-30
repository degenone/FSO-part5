import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = (props) => {
    const { setUser, showNotification } = props;
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
            blogService.setToken(user.token);
            setUsername('');
            setPassword('');
        } catch (error) {
            showNotification(
                'Something went wrong... Check your credentials.',
                true
            );
        }
    };
    return (
        <>
            <form onSubmit={handleLogin}>
                <fieldset>
                    <legend>Log in to the Bloglist Application</legend>
                    <div className='formGroup'>
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
                    <div className='formGroup'>
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
                </fieldset>
            </form>
        </>
    );
};

export default LoginForm;
