import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBloglistUser');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedInBloglistUser');
    };

    const showNotification = (message, isError = false) => {
        setNotification({
            message,
            isError,
        });
        setTimeout(() => {
            setNotification(null);
        }, 3500);
    };

    return (
        <div>
            {notification !== null && (
                <div
                    className={`notification${
                        notification.isError ? ' error' : ''
                    }`}>
                    {notification.message}
                </div>
            )}
            {user === null ? (
                <LoginForm
                    setUser={setUser}
                    showNotification={showNotification}
                />
            ) : (
                <>
                    <div className='titlePanel'>
                        <h2>My Blogs List</h2>
                        <p>User: {user.username}</p>
                        <button type='button' onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                    <BlogForm
                        setBlogs={setBlogs}
                        showNotification={showNotification}
                    />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    );
};

export default App;
