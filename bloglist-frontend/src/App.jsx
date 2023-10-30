import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBloglistUser');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedInBloglistUser');
    };

    return (
        <div>
            {user === null ? (
                <LoginForm setUser={setUser} />
            ) : (
                <>
                    <div className='titlePanel'>
                        <h2>My Blogs List</h2>
                        <p>User: {user.username}</p>
                        <button type='button' onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            )}
        </div>
    );
};

export default App;
