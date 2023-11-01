import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog/>', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Jane Doe',
        url: 'https://coolblogs.dev/101',
        likes: 5,
        user: {
            username: 'testuser',
            name: 'Test User',
        },
    };

    test('should render blog title and author only', () => {
        const { container } = render(
            <Blog
                blog={blog}
                likeBlog={jest.fn()}
                deleteBlog={jest.fn()}
                username={'testuser'}
            />
        );
        screen.getByText(blog.title);
        screen.getByText(blog.author);
        const details = container.querySelector('.blog-details');
        expect(details.classList).toContain('hidden');
    });
});
