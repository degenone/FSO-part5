describe('Blog app', () => {
    const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'passworD|123',
    };
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('URL')}/testing/reset`);
        cy.visit('');
    });

    it('Login form is showing', function () {
        cy.contains('Log in to the Bloglist Application');
        cy.get('#username');
        cy.get('#password');
        cy.get('#btn-login');
    });

    describe('Login', function () {
        beforeEach(function () {
            cy.request('POST', `${Cypress.env('URL')}/users`, user);
        });

        it('succeed logging in', function () {
            cy.get('#username').type(user.username);
            cy.get('#password').type(user.password);
            cy.get('#btn-login').click();
            cy.contains(user.name);
        });

        it('fail logging in', function () {
            cy.get('#username').type(user.username);
            cy.get('#password').type('badpass1');
            cy.get('#btn-login').click();
            cy.get('.error').as('error');
            cy.get('@error').should('contain', 'Check your credentials.');
            cy.get('@error').should('have.css', 'color', 'rgb(178, 34, 34)');
        });
    });

    describe('When logged in', () => {
        beforeEach(function () {
            cy.request('POST', `${Cypress.env('URL')}/users`, user);
            cy.login(user.username, user.password);
        });

        it.only('a blog list item can be created', function () {
            cy.get('.btn-show').click();
            cy.contains('Cancel');
            cy.get('#title').type('Test Blog');
            cy.get('#author').type('Jane Doe');
            cy.get('#url').type('https://example.com/blogs/101');
            cy.get('#btn-create').click();
            cy.contains('Test Blog');
            cy.contains('Jane Doe');
        });
    });
});
