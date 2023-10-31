import { useState } from 'react';

const Blog = (props) => {
    const { blog } = props;
    const [visible, setVisible] = useState(false);

    const blogStyle = {
        paddingTop: '0.4rem',
        paddingBottom: visible ? '' : '0.4rem',
        paddingLeft: '0.5rem',
        border: 'dashed',
        borderWidth: '2px',
        marginBottom: 5,
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
                    Likes: {blog.likes} <button type='button'>Like</button>
                </p>
                <p>{blog.user.name}</p>
            </div>
        </div>
    );
};

export default Blog;
