import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const blogFormRef = useRef(null);

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

    const addBlog = async (blogOjb) => {
        try {
            const blog = await blogService.create(blogOjb);
            setBlogs((blogs) => [...blogs, blog]);
            showNotification(
                `Added a new blog item: ${blog.title} by ${blog.author}`
            );
            blogFormRef.current.toggleVisibility();
            return true;
        } catch (error) {
            showNotification('error creating a bloglist item', true);
        }
        return false;
    };

    const handleLogin = async (userObj) => {
        try {
            const user = await loginService.login(userObj);
            window.localStorage.setItem(
                'loggedInBloglistUser',
                JSON.stringify(user)
            );
            setUser(user);
            blogService.setToken(user.token);
            return true;
        } catch (error) {
            showNotification(
                'Something went wrong... Check your credentials.',
                true
            );
        }
        return false;
    };

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
                <LoginForm handleLogin={handleLogin} />
            ) : (
                <>
                    <div className='titlePanel'>
                        <h2>My Blogs List</h2>
                        <p>User: {user.username}</p>
                        <button type='button' onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                    <Togglable buttonLabel='Create New Item' ref={blogFormRef}>
                        <BlogForm addBlog={addBlog} />
                    </Togglable>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    );
};

export default App;
