describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});


describe('Swiper Gallery Navigation Test', function () {
  it('Checks if user can navigate slides using navigation buttons', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-slide-active').should('contain', 'Italy');

    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');

    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'France');
  });
});


describe('Swiper Gallery Description Test', function () {
  it('Checks if slide titles and descriptions are displayed correctly', function () {
    // Step 1
    cy.visit('http://localhost:3000');
    // Step 2
    cy.get('.swiper-slide').each(($slide) => {
      const slideIndex = $slide.attr('data-swiper-slide-index');
      cy.wrap($slide).within(() => {
        cy.get('.card-description h1').should('exist');
        cy.get('.card-description p').should('exist');
      });
    });
    // Step 3
    cy.get('.swiper-slide').each(($slide) => {
      const slideIndex = $slide.attr('data-swiper-slide-index');
      cy.wrap($slide).within(() => {
        switch (slideIndex) {
          case '0':
            cy.get('.card-description h1').should('contain', 'Rome');
            cy.get('.card-description p').should('contain', 'Italy');
            break;
          case '1':
            cy.get('.card-description h1').should('contain', 'London');
            cy.get('.card-description p').should('contain', 'United Kingdom');
            break;
          case '2':
            cy.get('.card-description h1').should('contain', 'Paris');
            cy.get('.card-description p').should('contain', 'France');
            break;
          default:
            break;
        }
      });
    });
  });
});

describe('Swiper Gallery Responsiveness Test', function () {
  it('Checks if gallery behaves correctly on different devices', function () {
    // Step 1
    cy.viewport('macbook-15');
    cy.visit('http://localhost:3000');
    cy.wait(2000);
    cy.viewport('ipad-2');
    cy.reload();
    cy.wait(2000);
    cy.viewport('iphone-8');
    cy.reload();
    cy.wait(2000);
    // Step 2
    cy.get('.swiper-wrapper').should('have.css', 'display', 'flex');
    // Step 3
    cy.get('.swiper-button-next').click();
    cy.wait(1000);
    cy.get('.swiper-button-prev').click();
    cy.wait(1000);
  });
});