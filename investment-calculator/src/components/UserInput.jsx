import {useState} from "react";
import InputField from "./InputField.jsx";

export default function UserInput({userInput,onChange}) {

    return (
        <section id="user-input">
            <div className="input-group">
                <InputField
                    label="Initial Investment"
                    value={userInput.initialInvestment}
                    onChangeHandle={onChange}
                    valTitle= "initialInvestment"
                />
                <InputField
                    label="Annual Investment"
                    value={userInput.annualInvestment}
                    onChangeHandle={onChange}
                    valTitle= "annualInvestment"
                />
            </div>
            <div className="input-group">
                <InputField
                    label="Expected Return"
                    value={userInput.expectedReturn}
                    onChangeHandle={onChange}
                    valTitle= "expectedReturn"
                />
                <InputField
                    label="Duration"
                    value={userInput.duration}
                    onChangeHandle={onChange}
                    valTitle= "duration"
                    min="0"
                />
            </div>
        </section>
    )
}