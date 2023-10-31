import { useState } from 'react';

const Blog = (props) => {
    const { blog, likeBlog, deleteBlog, username } = props;
    const [visible, setVisible] = useState(false);
    const blogStyle = {
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
        paddingLeft: '0.5rem',
        border: 'dashed',
        borderWidth: '2px',
        marginBottom: 5,
    };
    const handleLike = async () => {
        await likeBlog(blog.id, {
            likes: blog.likes + 1,
        });
    };
    const handleDelete = async () => {
        await deleteBlog(blog.id);
    };
    return (
        <div style={blogStyle}>
            <strong>{blog.title}</strong> by <i>{blog.author}</i>{' '}
            <button type='button' onClick={() => setVisible(!visible)}>
                {visible ? 'Hide' : 'View'}
            </button>
            <div className={visible ? '' : 'hidden'}>
                <p>
                    <a href={blog.url} target='_blank' rel='noreferrer'>
                        {blog.url}
                    </a>
                </p>
                <p>
                    Likes: {blog.likes}{' '}
                    <button type='button' onClick={handleLike}>
                        Like
                    </button>
                </p>
                <p>{blog.user.name}</p>
                <button type='button' onClick={handleDelete} disabled={blog.user.username !== username}>
                    Delete This
                </button>
            </div>
        </div>
    );
};

export default Blog;
