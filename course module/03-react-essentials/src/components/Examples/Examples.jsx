import React,{useState} from 'react';
import TabMenu from "./TabMenu.jsx";
import TabContent from "./TabContent.jsx";

function Examples(props) {
    const [selectedTopic, setSelectedTopic] = useState();
    function handleSelect(val){
        setSelectedTopic(val);
    }
    return (
        <section id="examples" className="examples">
            <h2>Examples</h2>
            <menu>
                <TabMenu text="Components" isActive={selectedTopic === "components"} onSelectFun={()=>handleSelect("components")}/>
                <TabMenu text="Jsx" isActive={selectedTopic === "jsx"} onSelectFun={()=>handleSelect("jsx")}/>
                <TabMenu text="Props" isActive={selectedTopic === "props"} onSelectFun={()=>handleSelect("props")}/>
                <TabMenu text="State" isActive={selectedTopic === "state"} onSelectFun={()=>handleSelect("state")}/>
            </menu>
            {selectedTopic ? <TabContent {...props.data[selectedTopic]}/> : <p className="selectItem">Select a item</p>}
        </section>
    );
}

export default Examples;