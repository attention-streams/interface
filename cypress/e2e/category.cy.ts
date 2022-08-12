import RoutePath, { getRoute, RouteParam } from '../../src/routes';
import { getArenaHandler } from '../utils/ethbridge/abihandlers/Arena';
import { SupportedChainId } from '../../src/constants/chains';
import { ARENA_ADDRESS, MULTICALL2_ADDRESS } from '../../src/constants/addresses';
import { getMulticallHandler } from '../utils/ethbridge/abihandlers/Multicall';

describe('Category', () => {
  it('loads categories', () => {
    cy.setupWeb3Bridge();
    const arenaHandler = getArenaHandler();
    const multicallHandler = getMulticallHandler();
    cy.visit(
      getRoute(RoutePath.CATEGORY, {
        [RouteParam.CATEGORY_ID]: '0',
      }),
    );
    cy.window().then((win) => {
      // @ts-ignore
      const bridge = win.ethereum as CustomizedBridge;
      bridge.setHandler(ARENA_ADDRESS[SupportedChainId.GOERLI], arenaHandler);
      bridge.setHandler(MULTICALL2_ADDRESS[SupportedChainId.GOERLI], multicallHandler);
    });
    cy.get('[data-testid=category-list-item-0]').should('exist');
  });
});
