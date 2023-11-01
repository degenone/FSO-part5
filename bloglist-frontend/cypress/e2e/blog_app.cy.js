describe('Blog app', () => {
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

    describe('Login', function() {
        const user = {
            username: 'testuser',
            name: 'Test User',
            password: 'passworD|123',
        };
        beforeEach(function() {
            cy.request('POST', `${Cypress.env('URL')}/users`, user);
        });

        it('succeed logging in', function() {
            cy.get('#username').type(user.username);
            cy.get('#password').type(user.password);
            cy.get('#btn-login').click();
            cy.contains(user.name);
        });

        it('fail logging in', function() {
            cy.get('#username').type(user.username);
            cy.get('#password').type('badpass1');
            cy.get('#btn-login').click();
            cy.get('.error').as('error');
            cy.get('@error').should('contain', 'Check your credentials.');
            cy.get('@error').should('have.css', 'color', 'rgb(178, 34, 34)');
        });
    });
});
