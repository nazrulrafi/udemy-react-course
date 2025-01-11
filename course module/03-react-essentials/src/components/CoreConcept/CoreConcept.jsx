import React from 'react';
import CoreConceptItem from "./CoreConceptItem.jsx";

function CoreConcept(props) {
    return (
        <section id="core-concepts">
            <h2>{props.data.title}</h2>
            <ul>
                {props.data.coreConceptItemData.map((item, index) => (
                    <CoreConceptItem {...item} key={index} />
                    )
                )}
            </ul>
        </section>
    );
}

export default CoreConcept;