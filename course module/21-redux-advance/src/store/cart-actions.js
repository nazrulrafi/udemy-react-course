import {uiActions} from "./ui-slice";
import {cartActions} from './cart-slice';
export const fetchcartData = ()=>{
    return async (dispatch)=>{
        const fetchData = async ()=>{
            const response = await fetch("https://littlewheel-default-rtdb.firebaseio.com/cart.json");
            if (!response.ok){
                throw new Error("Failed to fetch cart");
            }
            const data = await response.json();
            return data;
        }

        try {
           const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity,
            }));
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: "Sending cart data failed"
                })
            )
        }
    }
}
export const sendCartData = (cart) =>{
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: "Sending cart data"
            })
        )
        const sendRequest = async () =>{
            const response = await fetch("https://littlewheel-default-rtdb.firebaseio.com/cart.json", {
                    method: "PUT",
                    body: JSON.stringify({
                        items:cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );
            if (!response.ok) {
                dispatch(
                    uiActions.showNotification({
                        status: 'error',
                        title: 'Error!',
                        message: "Sending cart data failed"
                    })
                )
            }
        }
        try {
            await  sendRequest()
        }catch(error){}

        dispatch(
            uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: "Sending cart data successfully"
            })
        )
    }
}