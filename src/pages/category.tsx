import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Category = () => {
    return (
        <div>
            <button className={'btn-primary-inverted'}>Hello Songdust!</button>
          <FontAwesomeIcon icon={faCoffee} />
        </div>
    );
};

export default Category;
