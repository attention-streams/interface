import { shortenAddress } from '../../src/utils';
import { Wallet } from '@ethersproject/wallet';
import { ChoiceStruct, TopicStruct } from '../../src/types/contracts/Arena';
import { SongMeta } from '../../src/types';

export const TEST_PRIVATE_KEY = '0xe580410d7c37d26c6ad1a837bbae46bc27f9066a466fb3a66e770523b4666d19';
// address of the above key
export const TEST_ADDRESS_NEVER_USE = new Wallet(TEST_PRIVATE_KEY).address;
export const TEST_ADDRESS_NEVER_USE_SHORTENED = shortenAddress(TEST_ADDRESS_NEVER_USE);

export const SAMPLE_ERROR_MESSAGE = 'An error occurred';

export const IPFS_SERVER_URL = 'https://some.ipfs.server';

export const topics: {
  [topicId: number]: TopicStruct;
} = {
  0: {
    cycleDuration: 2,
    startBlock: 0,
    sharePerCyclePercentage: 10000,
    prevContributorsFeePercentage: 1200,
    topicFeePercentage: 500,
    maxChoiceFeePercentage: 2500,
    relativeSupportThreshold: 0,
    fundingPeriod: 0,
    fundingPercentage: 0,
    funds: '0x211eEBa0ebe516744614C35572555BdFDD13424d',
    metaDataUrl: IPFS_SERVER_URL + '/topic/topic1.json',
  },
};

export const choices: {
  [topicId: number]: {
    [choiceId: number]: ChoiceStruct;
  };
} = {
  0: {
    ...Object.assign({}, [
      ...[1, 2, 3, 4, 5, 6].map((i) => ({
        description: i + ' Song',
        funds: '0x211eEBa0ebe516744614C35572555BdFDD13424d',
        feePercentage: 1000,
        fundingTarget: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        metaDataUrl: IPFS_SERVER_URL + `/choice/${i}.json`,
      })),
    ]),
  },
};

export const songMeta: SongMeta = {
  thumbnail: 'https://bafybeicp7kjqwzzyfuryefv2l5q23exl3dbd6rgmuqzxs3cy6vaa2iekka.ipfs.w3s.link/sample.png',
  title: 'Dark Days and Beautiful',
  tags: [
    { subject: 'Mood', title: 'Confused' },
    { subject: 'Genre', title: 'Folk' },
  ],
  by: 'jonathan.eth',
  date: 'June 9, 2022',
  opensea: 'somelink',
};
