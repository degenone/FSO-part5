import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm/>', () => {
    test('should submit a blog list item', async () => {
        const submitHandler = jest.fn();
        const { container } = render(<BlogForm addBlog={submitHandler} />);
        const user = userEvent.setup();
        const titleInput = screen.getByPlaceholderText('Blog title...');
        await user.type(titleInput, 'Title test');
        const authorInput = screen.getByPlaceholderText('Blog author...');
        await user.type(authorInput, 'Author test');
        const urlInput = screen.getByPlaceholderText('Blog url...');
        await user.type(urlInput, 'Url test');
        const btn = container.querySelector('input[type="submit"]');
        await user.click(btn);
        expect(submitHandler.mock.calls).toHaveLength(1);
        expect(submitHandler.mock.calls[0][0]['title']).toBe('Title test')
        expect(submitHandler.mock.calls[0][0]['author']).toBe('Author test')
        expect(submitHandler.mock.calls[0][0]['url']).toBe('Url test')
    });
});