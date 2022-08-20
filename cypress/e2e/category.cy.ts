import RoutePath, { getRoute, RouteParam } from '../../src/routes';
import { ArenaHandler } from '../utils/ethbridge/abihandlers/Arena';
import { SupportedChainId } from '../../src/constants/chains';
import { ARENA_ADDRESS, MULTICALL2_ADDRESS } from '../../src/constants/addresses';
import { BaseMulticallHandler } from '../utils/ethbridge/abihandlers/Multicall';
import { IPFS_SERVER_URL, songMeta } from '../utils/data';

describe('Category', () => {
  it('loads songs', () => {
    cy.intercept(
      {
        url: `${IPFS_SERVER_URL}**`,
      },
      {
        statusCode: 404,
      },
    );
    cy.intercept(
      {
        url: `${IPFS_SERVER_URL}/choice/2.json`,
      },
      {
        body: songMeta,
      },
    );
    const topicId = 0;
    cy.setupWeb3Bridge();
    cy.setAbiHandler(ARENA_ADDRESS[SupportedChainId.GOERLI], new ArenaHandler());
    cy.setAbiHandler(MULTICALL2_ADDRESS[SupportedChainId.GOERLI], new BaseMulticallHandler());

    cy.visit(
      getRoute(RoutePath.CATEGORY, {
        [RouteParam.CATEGORY_ID]: String(topicId),
      }),
    );
    cy.get('[data-testid=category-list-item-0]').should('exist');
    cy.get('[data-testid=category-list-item-1]').should('exist');
    cy.get('[data-testid=category-list-item-0-meta]').should('not.exist');
    cy.get('[data-testid=category-list-item-1-meta]').should('exist');
  });
});
