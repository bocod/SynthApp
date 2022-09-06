import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function Calc(){

    const { t } = useTranslation();

    function useInput({ type }, { label }) {
        const [value, setValue] = useState("");
        const input = <input className="form-control" aria-label={label} value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
    }

    const [loanCapital, capitalInput] = useInput({ type: "number" }, {label: "Loan Capital Amount"});
    const [loanRate, rateInput] = useInput({ type: "number" }, {label: "Loan Rate whitout percentage symbol"});
    const [loanDueDate, dueDateInput] = useInput({ type: "date" }, {label: "Loan due date"});

    const loanInterest = (loanCapital * (loanRate/100) * (Math.ceil((new Date(loanDueDate) - new Date())/86400000)/365)).toFixed(2);
    const loanTotal = loanCapital && loanInterest ? (parseFloat(loanCapital) + parseFloat(loanInterest)).toFixed(2) : "";

    const fwdAmount = loanCapital;
    const [spotRate, spotRateInput] = useInput({ type: "number" }, {label: "Spot Rate Amount"}); 
    const spotAmount = (fwdAmount / spotRate).toFixed(2);

    return (
        <>
            Calculate View!

            {/* Loan stage user input */}

            <div className="container" style={{"maxWidth": "500px"}}>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan capital")}</span>
                    <span className="input-group-text">$</span>
                    {capitalInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan rate")}</span>
                    {rateInput}
                    <span className="input-group-text">%</span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan due date")}</span>
                    {dueDateInput}
                </div>

                {/* Auto calculate */}

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan interest")}</span>
                    <span className="input-group-text">$</span>
                    <input value={loanInterest} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan total")}</span>
                    <span className="input-group-text">$</span>
                    <input value={loanTotal} type="number" className="form-control" aria-label="Total amount of capital plus interest" disabled />
                </div>

                {/* Spot stage */}

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Spot Rate")}</span>
                    <span className="input-group-text">$</span>
                    {spotRateInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan capital in foreign currency")}</span>
                    <input value={spotAmount} type="number" className="form-control" aria-label="Total amount of capital plus interest" disabled />
                </div>

                
            </div>
        </>
    )
}