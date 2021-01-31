describe('Multipart Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should be able to submit all forms if fills all forms correctly', () => {
        const personalInfo = {
            name: 'John',
            lastName: 'due',
            cpf: '11122233344',
        };

        const deliveryInfo = {
            zipCode: '000000000',
            city: 'Mock city',
            province: 'MP',
            address: 'Mock street',
            buildingNumber: '00',
        };

        fillsLoginForm('test@test', '1234', '1234');
        fillsPersonalInfoForm(personalInfo);
        fillsDeliveryForm(deliveryInfo);
        cy.contains('Thanks for registering!');
    });
    
    describe('Login Form', () => {
        it('should be able to move to next screen if fills inputs correctly', () => {
            fillsLoginForm('test@test', '12345', '12345');
            cy.get('form').should('have.id', 'personal-info-form');
        });

        describe('should not be able to move to next screen', () => {
            it('if email input is invalid', () => {
                fillsLoginForm('testeat.com', '12345', '12345');
                cy.get('form').should('have.id', 'login-form');
            });

            it('if password is less than 4 characters', () => {
                fillsLoginForm('test@test', '123', '123');
                cy.get('form').should('have.id', 'login-form');
            });

            it('if password is more than 20 characters', () => {
                fillsLoginForm(
                'test@test',
                '123456789012345678901',
                '123456789012345678901',
                );
                cy.get('form').should('have.id', 'login-form');
            });

            it('if password didn`t match with confirm password', () => {
                fillsLoginForm('test@test', '12345', '1234');
                cy.get('form').should('have.id', 'login-form');
            });
        });
    });

    describe('Personal Info Form', () => {
        it('should be able to move to next screen if fills inputs correctly', () => {
            fillsLoginForm('test@test', '1234', '1234');

            const personalInfo = {
            name: 'John',
            lastName: 'due',
            cpf: '11122233344',
            };

            fillsPersonalInfoForm(personalInfo);
            cy.get('form').should('have.id', 'delivery-form');
        });

        it('should not be able to move to next screen if CPF is different from 11 characters', () => {
            fillsLoginForm('test@test', '1234', '1234');

            let personalInfo = {
            name: 'John',
            lastName: 'due',
            cpf: '1111',
            };

            //test for cpf less than 11 chars
            fillsPersonalInfoForm(personalInfo);
            cy.get('form').should('have.id', 'personal-info-form');

            //test for cpf more than 11 chars
            personalInfo.cpf = '111222333445';
            fillsPersonalInfoForm(personalInfo);
            cy.get('form').should('have.id', 'personal-info-form');
        });
    });
});

function fillsLoginForm(email, password, confirmPassword) {
  cy.get('form').within(() => {
    cy.get('input#email').type(email);
    cy.get('input#password').type(password);
    cy.get('input#confirmPassword').type(confirmPassword);
    cy.get('button').click();
  });
}

function fillsPersonalInfoForm(personalInfo) {
    cy.get('form').within(() => {
        cy.get('input#name').type(personalInfo.name);
        cy.get('input#lastname').type(personalInfo.lastName);
        cy.get('input#cpf').type(personalInfo.cpf);
        cy.get('button').click();
    });
}

function fillsDeliveryForm(deliveryInfo) {
    cy.get('form').within(() => {
      cy.get('input#zipCode').type(deliveryInfo.zipCode);
      cy.get('input#city').type(deliveryInfo.city);
      cy.get('input#province').type(deliveryInfo.province);
      cy.get('input#address').type(deliveryInfo.address);
      cy.get('input#buildingNumber').type(deliveryInfo.buildingNumber);
      cy.get('button').click();
    });
}
