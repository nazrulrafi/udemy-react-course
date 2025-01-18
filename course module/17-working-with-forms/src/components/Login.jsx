import {useRef, useState} from "react";

export default function Login() {
    const [emailIsValid, setEmailIsValid] = useState(false);
    const email = useRef();
    const password = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;
        const validEmail = enteredEmail.includes("@");
        if (!validEmail) {
            setEmailIsValid(true);
            return;
        }
        setEmailIsValid(false);
        console.log("Sending http requesr")
    }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
          <div className="control no-margin">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" ref={email}/>
              <div className="control-error">
                  {emailIsValid && <p>Please Enter a valid email</p>}
              </div>
          </div>

          <div className="control no-margin">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
