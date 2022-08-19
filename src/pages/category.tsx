import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHexagonVerticalNft } from '@fortawesome/pro-duotone-svg-icons';
import { useTopic } from 'hooks/useArena';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import { useParams } from 'react-router-dom';
import { shortenAddress } from 'utils/index';

// todo we need to find a way to use our color variables (tailwind) to set primary and secondary color of duoton icons
const style = {
  '--fa-primary-color': '#353535',
  '--fa-secondary-color': '#EF476F',
  '--fa-primary-opacity': 1,
  '--fa-secondary-opacity': 0.4,
} as React.CSSProperties;

const Category = () => {
  const { active, account, activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  const renderConnector = () => {
    return active ? (
      <p data-testid="wallet-connect">Wallet Connected {shortenAddress(account)}</p>
    ) : (
      <button data-testid="wallet-connect" className={'btn-primary btn-large'} onClick={connect}>
        Connect Wallet
      </button>
    );
  };
  const { id: topicId } = useParams();
  const { choices, loaded } = useTopic(Number(topicId));

  function renderList() {
    return loaded ? (
      choices.map((song) => {
        return (
          <div
            key={song.id}
            className={'bg-squircle w-[311px] h-[316px] bg-cover p-4'}
            data-testid={`category-list-item-${song.id}`}
          >
            {/* todo img below must be an iframe link to youtube video*/}
            <img
              alt="choice"
              src={'https://bafybeicp7kjqwzzyfuryefv2l5q23exl3dbd6rgmuqzxs3cy6vaa2iekka.ipfs.w3s.link/sample.png'}
              className={'rounded-xl'}
            />
            <div className={'px-2 pt-1'}>
              <p className={'font-bold text-xl'}>{song.description}</p>
              {song.meta?.tags.map((tag, i) => {
                return (
                  <span key={i} className={'chips mr-2'}>
                    {tag.subject}: <span className={'font-semibold'}>{tag.title}</span>
                  </span>
                );
              })}
              <p className={'text-dark-gray mt-4'}>
                Added by <span className={'text-black font-semibold'}>{song.meta?.by}</span> at {song.meta?.date}
              </p>
              <a href={song.meta?.opensea} className={'flex gap-1.5 mt-2'}>
                <FontAwesomeIcon fontSize={24} icon={faHexagonVerticalNft} style={style} />
                <span className={'text-primary font-semibold text-under underline'}>View on Opensea</span>
              </a>
            </div>
          </div>
        );
      })
    ) : (
      <div>loading</div>
    );
  }

  return (
    <div className={'px-24 py-24'}>
      <div>{renderConnector()}</div>
      <header className={'bg-gradient-light w-full h-48 rounded-3xl flex p-6 mb-12'}>
        <div>
          <h1>Songs were written in a hotel room</h1>
          <p className={'text-label'}>
            This is the description section of this category called “songs were written in a hotel room”, as the name
            suggests, Jonathan recorded all of the songs here in a hotel room.
          </p>
        </div>
        <img alt="header" src={'/category-header.png'} />
      </header>
      <main className={'flex'}>
        <section className={'flex-1'}>
          <header></header>
          <main className={'flex flex-wrap gap-6'}>{renderList()}</main>
        </section>
        <aside className={'w-68'}>
          <button className={'btn-primary btn-large w-full'}>Vote for a Song!</button>
          <section>
            <div className={'time-left'}></div>
            <div className={'info-summery'}></div>
          </section>
        </aside>
      </main>
      {/*<button className={'btn-primary-inverted'}>Hello Songdust!</button>*/}
    </div>
  );
};

export default Category; /* Rectangle 18 */
