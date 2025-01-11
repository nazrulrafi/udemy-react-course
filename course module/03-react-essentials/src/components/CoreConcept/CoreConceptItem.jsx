import React from 'react';

function CoreConceptItem({image,title,description}) {
    return (
        <li>
            <img src={image} alt="Components"/>
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    );
}

export default CoreConceptItem;