import { useArenaContract } from 'hooks/useContracts';
import { useMemo } from 'react';
import { useSingleContractMultipleData, useSingleContractMultipleMethods } from 'state/multicall/hooks';
import { ChoiceStruct, TopicStruct } from '../types/contracts/Arena';
import { BigNumber } from 'ethers';

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
    console.log(getTopicsResult);
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

  const nextChoiceId = nextChoiceIdResult?.result?.[0];

  const getChoicesCallInputs = useMemo(() => {
    const choiceIds: number[] = nextChoiceId ? Array.from(Array(nextChoiceId.toNumber()).keys()) : [];
    return choiceIds.map((id) => [topicId, id]);
  }, [nextChoiceId, topicId]);

  const getChoicesResult = useSingleContractMultipleData(arenaContract, 'topicChoices', getChoicesCallInputs);

  const choices = useMemo(() => {
    console.log(getChoicesResult);
    return getChoicesResult.reduce((acc: ChoiceStruct[], value) => {
      if (!value.result) return acc;
      const result = value.result[0];
      acc.push({
        description: result[0],
        funds: result[1],
        feePercentage: result[2],
        fundingTarget: result[3],
        metaDataUrl: result[4],
      });
      return acc;
    }, []);
  }, [getChoicesResult]);

  return { nextChoiceId, choices };
}
