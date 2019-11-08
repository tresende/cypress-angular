context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    })



    it('Get App bar title', () => {
        cy.get('[data-cy="app-title"]').contains('e2e Project')
    });

    it('Disable Button', () => {
        cy.get('[data-cy="first-button"]').should('be.disabled')
    });

    it('Enable Button', () => {
        cy.get('[data-cy="name"]').type('Thiago Resende');
        cy.get('[data-cy="first-button"]').should('be.enabled');
    });

    it('Change Tab', () => {
        cy.clock()
        cy.get('#mat-tab-label-0-1').click();
        cy.tick(1000);
        cy.get('#mat-tab-content-0-1 > div').contains('Content 2');
    });

    it('Get Data', () => {
        cy.server();
        cy.route("GET", "https://api.github.com/users/tresende/repos/").as("getData");
        cy.visit('http://localhost:4200/')
        cy.get('[data-cy="button-get-data"]').click();
        // cy.wait("@getData");
        cy.get('@getData');
        const totalTableRows = cy.get("[data-cy='table-data'] > tbody > tr").length; 
    });
   
})
