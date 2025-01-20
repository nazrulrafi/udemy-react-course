import {useContext} from "react";
import CartContext from "../store/CartContext.jsx"
import Modal from "../store/Modal.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart(props) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    function handleCloseCart(){
        userProgressCtx.hideCart();
    }
    function handleGotoCheckout(){
        userProgressCtx.showCheckout();
    }
    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === "cart"}
            onClose={userProgressCtx.progress === "cart" ? handleCloseCart:null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item, index) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 &&(
                    <Button onClick={handleGotoCheckout}>Checkout</Button>
                )}

            </p>
        </Modal>
    )

}