import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useTopic } from 'hooks/useArena';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import { Button } from '@mui/material';

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
    return active ? <p>Wallet Connected {account}</p> : <Button onClick={connect}>connect</Button>;
  };

  const { choices } = useTopic(0);
  const list = useMemo(
    () =>
      choices.map((_c) => ({
        thumbnail: 'sample.png',
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
    return list.length ? (
      list.map((song, i) => {
        return (
          <div key={i} className={'bg-squircle p-4'}>
            <img alt="choice" src={'sample.png'} className={'rounded-xl'} />
            <p className={'font-bold text-xl'}>{song.title}</p>
            {song.tags.map((tag, i) => {
              return (
                <span key={i} className={''}>
                  {tag.subject} <span className={'font-semibold'}>{tag.title}</span>
                </span>
              );
            })}
            <a href="#">
              <FontAwesomeIcon icon={faCoffee} href={song.opensea} />
              View on Opensea
            </a>
          </div>
        );
      })
    ) : (
      <div>loading</div>
    );
  }

  return (
    <div className={'px-24 py-24'}>
      {renderConnector()}
      <header className={'bg-gradient-light w-full h-48 rounded-3xl flex p-6'}>
        <div>
          <h1>Songs were written in a hotel room</h1>
          <p className={'text-label'}>
            This is the description section of this category called “songs were written in a hotel room”, as the name
            suggests, Jonathan recorded all of the songs here in a hotel room.
          </p>
        </div>
        <img alt="header" src={'category-header.png'} />
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
