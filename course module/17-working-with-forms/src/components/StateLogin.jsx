import {useRef, useState} from "react";
import Input from "./Input.jsx";
import useInput from "../hooks/useInput.jsx";
import {hasMinLength, isEmail, isNotEmpty} from "../util/validation.js";

export default function StateLogin() {
    const {
        value:emailValue,
        handleInputChange:handleEmailChange,
        handleInputBlur:handleEmailBlur,
        hasError:emailHasError,
    } = useInput("",(val)=> isEmail(val) && isNotEmpty(val))

    const {
        value:passwordValue,
        handleInputChange:handlePasswordChange,
        handleInputBlur:handlePasswordBlur,
        hasError:passwordHasError,
    } = useInput("",(val)=> hasMinLength(val,6))

    function handleSubmit(event) {
        event.preventDefault()
        if (emailHasError || passwordHasError) {
            return
        }
        console.log(emailValue,passwordValue)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    onBlur={handleEmailBlur}
                    value={emailValue}
                    onChange={handleEmailChange}
                    error={emailHasError && "Please enter a valid email"}
                />
                <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    onBlur={handlePasswordBlur}
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    error={passwordHasError && "Please enter a valid password"}
                />

            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
