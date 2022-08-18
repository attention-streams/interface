import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHexagonVerticalNft, faCoffee } from '@fortawesome/pro-duotone-svg-icons';
import { useTopic } from 'hooks/useArena';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import { useParams } from 'react-router-dom';
import { shortenAddress } from 'utils/index';

// todo we need to find a way to use our color variables (tailwind) to set primary and secondary color of duoton icons
const style = {
  "--fa-primary-color": "#353535",
  "--fa-secondary-color": "#EF476F",
  "--fa-primary-opacity": 1,
  "--fa-secondary-opacity": 0.4
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
  const list = useMemo(
    () =>
      choices.map((_c) => ({
        thumbnail: '/sample.png',
        title: 'Dark Days and Beautiful',
        tags: [
          { subject: 'Mood', title: 'Confused' },
          { subject: 'Genre', title: 'Folk' },
        ],
        by: 'jonathan.eth',
        date: 'June 9, 2022',
        opensea: 'somelink',
      })),
    [choices],
  );

  function renderList() {
    return loaded ? (
      list.map((song, i) => {
        return (
          <div key={i} className={'bg-squircle w-[311px] h-[316px] bg-cover p-4'} data-testid={`category-list-item-${i}`}>
            {/* todo img below must be an iframe link to youtube video*/}
            <img alt="choice" src={'/sample.png'} className={'rounded-xl'} />
            <div className={'px-2 pt-1'}>
            <p className={'font-bold text-xl'}>{song.title}</p>
            {song.tags.map((tag, i) => {
              return (
                <span key={i} className={'chips mr-2'}>
                  {tag.subject}: <span className={'font-semibold'}>{tag.title}</span>
                </span>
              );
            })}
            <p className={'text-dark-gray mt-4'}>Added by <span className={'text-black font-semibold'}>{song.by}</span> at {song.date}</p>
            <a href={song.opensea} className={'flex gap-1.5 mt-2'}>
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
      <header className={'bg-gradient-light w-full h-48 rounded-3xl flex p-6 mb-4'}>
        <div>
          <h1>Songs were written in a hotel room</h1>
          <p className={'text-label'}>
            This is the description section of this category called “songs were written in a hotel room”, as the name
            suggests, Jonathan recorded all of the songs here in a hotel room.
          </p>
        </div>
        <img alt="header" src={'/category-header.png'} />
      </header>
      <main>
        <section className={'w-8/12'}>
          <header></header>
          <main className={'flex flex-wrap'}>{renderList()}</main>
        </section>
        <aside className={'w-4/12'}>
          <button className={'btn-primary btn-large'}>Vote for a Song!</button>
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
