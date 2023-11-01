describe('Blog app', () => {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('URL')}/testing/reset`);
        cy.visit('');
    });

    it('Login form is showing', function() {
        cy.contains('Log in to the Bloglist Application');
        cy.get('#username');
        cy.get('#password');
        cy.get('#btn-login');
    });
});
