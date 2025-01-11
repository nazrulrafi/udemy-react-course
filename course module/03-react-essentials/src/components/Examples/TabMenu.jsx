import React from 'react';

function TabMenu({text,isActive,onSelectFun}) {
    return (
            <li>
                <button className={isActive ? "active" : undefined} onClick={onSelectFun}>{text}</button>
            </li>

    );
}

export default TabMenu;