import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = (props) => {
    const { setBlogs, showNotification } = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBlog = {
            title,
            author,
            url,
        };
        try {
            const blog = await blogService.create(newBlog);
            setTitle('');
            setAuthor('');
            setUrl('');
            setBlogs((blogs) => [...blogs, blog]);
            showNotification(
                `Added a new blog item: ${blog.title} by ${blog.author}`
            );
        } catch (error) {
            showNotification('error creating a bloglist item', true);
        }
    };
    return (
        <div className='blogForm'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Create a Blog item</legend>
                    <div className='formGroup'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            required
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='author'>Author:</label>
                        <input
                            type='text'
                            name='author'
                            id='author'
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='url'>Url:</label>
                        <input
                            type='text'
                            name='url'
                            id='url'
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input type='submit' value='Create' />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default BlogForm;
