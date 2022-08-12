import RoutePath, { getRoute, RouteParam } from '../../src/routes';

describe('Category', () => {
  it('eager connects wallet', () => {
    cy.visit(
      getRoute(RoutePath.CATEGORY, {
        [RouteParam.CATEGORY_ID]: '0',
      }),
    );
    cy.get('[data-testid=category-list-item-0]').should('exist');
  });
});
