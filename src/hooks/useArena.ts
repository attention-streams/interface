import { useArenaContract } from 'hooks/useContracts';
import { useEffect, useMemo, useState } from 'react';
import { useSingleContractMultipleData, useSingleContractMultipleMethods } from 'state/multicall/hooks';
import { TopicStruct } from '../types/contracts/Arena';
import { BigNumber } from 'ethers';
import { Choice } from '../types';

export function useArena() {
  const arenaContract = useArenaContract();

  const nextTopicIdCall = useMemo(() => {
    return [{ methodName: 'nextTopicId', callInputs: [] }];
  }, []);

  const [nextTopicIdResult] = useSingleContractMultipleMethods(arenaContract, nextTopicIdCall);
  const nextTopicId: BigNumber | null = nextTopicIdResult?.result?.[0];

  const getTopicsCallInputs = useMemo(() => {
    const topicIds: number[] = nextTopicId ? Array.from(Array(nextTopicId.toNumber()).keys()) : [];
    return topicIds.map((id) => [id]);
  }, [nextTopicId]);

  const getTopicsResult = useSingleContractMultipleData(arenaContract, 'topics', getTopicsCallInputs);

  const topics = useMemo(() => {
    return getTopicsResult.reduce((acc: TopicStruct[], value) => {
      if (!value.result) return acc;
      const result = value.result[0];
      acc.push({
        cycleDuration: result[0],
        startBlock: result[1],
        sharePerCyclePercentage: result[2],
        prevContributorsFeePercentage: result[3],
        topicFeePercentage: result[4],
        maxChoiceFeePercentage: result[5],
        relativeSupportThreshold: result[6],
        fundingPeriod: result[7],
        fundingPercentage: result[8],
        funds: result[9],
        metaDataUrl: result[10],
      });
      return acc;
    }, []);
  }, [getTopicsResult]);

  return { nextTopicId, topics };
}

export function useTopic(topicId: number) {
  const arenaContract = useArenaContract();

  const nextChoiceIdCall = useMemo(() => {
    return [{ methodName: 'nextChoiceId', callInputs: [topicId] }];
  }, [topicId]);

  const [nextChoiceIdResult] = useSingleContractMultipleMethods(arenaContract, nextChoiceIdCall);

  const nextChoiceId: BigNumber | null = nextChoiceIdResult?.result?.[0];

  const getChoicesCallInputs = useMemo(() => {
    const choiceIds: number[] = nextChoiceId ? Array.from(Array(nextChoiceId.toNumber()).keys()) : [];
    return choiceIds.map((id) => [topicId, id]);
  }, [nextChoiceId, topicId]);

  const getChoicesResult = useSingleContractMultipleData(arenaContract, 'topicChoices', getChoicesCallInputs);
  const choicesRaw = useMemo(() => {
    return getChoicesResult.reduce((acc: Choice[], value, i) => {
      if (!value.result) return acc;
      const result = value.result[0];
      acc.push({
        id: i,
        description: result[0],
        funds: result[1],
        feePercentage: result[2],
        fundingTarget: result[3],
        metaDataUrl: result[4],
        meta: {
          thumbnail: 'https://bafybeicp7kjqwzzyfuryefv2l5q23exl3dbd6rgmuqzxs3cy6vaa2iekka.ipfs.w3s.link/sample.png',
          title: 'Dark Days and Beautiful',
          tags: [
            { subject: 'Mood', title: 'Confused' },
            { subject: 'Genre', title: 'Folk' },
          ],
          by: 'jonathan.eth',
          date: 'June 9, 2022',
          opensea: 'somelink',
        },
      });
      return acc;
    }, []);
  }, [getChoicesResult]);

  const [choices, setChoices] = useState<Choice[]>([]);

  useEffect(() => {
    setChoices(choicesRaw);
  }, [choicesRaw]);

  const nextChoiceIdLoaded = nextChoiceIdResult && !nextChoiceIdResult.loading;
  const topicsLoaded =
    nextChoiceId?.toNumber() === 0 ||
    (getChoicesResult.length > 0 && !getChoicesResult.some((callState) => callState.loading));
  const loaded = nextChoiceIdLoaded && topicsLoaded;

  return { nextChoiceId, choicesRaw, choices, loaded };
}
