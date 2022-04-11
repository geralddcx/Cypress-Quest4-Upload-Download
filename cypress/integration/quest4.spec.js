/// <reference types="cypress" />

describe('File upload and download tests', () => {

    beforeEach(() => {
        cy.visit('https://filebin.net/')
    })

    it('Upload file and download it in Zip format', () => {
        cy.get('#fileField').attachFile('shadok.jpg')
        cy.contains('It contains 1 uploaded file',).should('be.visible')
        cy.get('[data-bs-target="#modalArchive"]').click()
        cy.contains('Zip').invoke('attr', 'href').then(downloadLink => {
            let monLien = Cypress.config().baseUrl;
            monLien = monLien + downloadLink;
            cy.log(monLien)
            cy.downloadFile(monLien, 'cypress/downloads/zipFiles', 'downloadedFromCypress.zip')
            cy.wait(8000)
            cy.readFile('cypress/downloads/zipFiles/downloadedFromCypress.zip')
        })
    })

    it('Upload file and download it in Tar format', () => {
        cy.get('#fileField').attachFile('shadok.jpg')
        cy.contains('It contains 1 uploaded file',).should('be.visible')
        cy.get('[data-bs-target="#modalArchive"]').click()
        cy.contains('Tar').invoke('attr', 'href').then(downloadLink => {
            let monLien = Cypress.config().baseUrl;
            monLien = monLien + downloadLink;
            cy.log(monLien)
            cy.downloadFile(monLien, 'cypress/downloads/tarFiles', 'downloadedFromCypress.tar')
            cy.readFile('cypress/downloads/tarFiles/downloadedFromCypress.tar')
        })
    })

})