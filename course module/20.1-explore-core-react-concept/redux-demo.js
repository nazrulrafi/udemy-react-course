const redux = require('redux');
const {createStore} = require("redux");

const counterReducer = (state = {counter:0},action)=>{
    if (action.type === "increment"){
        return {
            counter:state.counter + 1
        }
    }
    if (action.type === "increase"){
        return {
            counter:state.counter + action.amount
        }
    }
    if (action.type === "decrement"){
        return {
            counter:state.counter - 1
        }
    }
}
const store = createStore(counterReducer);

const counterSubscriber = ()=>{
    const latestState = store.getState();
    console.log(latestState);
}
store.subscribe(counterSubscriber);
store.dispatch({type: "increment"});
store.dispatch({type: "decrement"});








