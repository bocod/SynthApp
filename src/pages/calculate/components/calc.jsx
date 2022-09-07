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

    const loanTerm = Math.ceil((new Date(loanDueDate) - new Date())/86400000);
    const loanInterest = (loanCapital * (loanRate/100) * (loanTerm/365)).toFixed(2);
    const loanTotal = loanCapital && loanInterest ? (parseFloat(loanCapital) + parseFloat(loanInterest)).toFixed(2) : "";

    const fwdAmount = loanCapital;
    const [spotRate, spotRateInput] = useInput({ type: "number" }, {label: "Spot Rate"}); 
    const spotAmount = (fwdAmount / spotRate).toFixed(2);

    const [ndfRate, ndfRateInput] = useInput({ type: "number" }, {label: "NDF Rate"}); 
    const impliedNdfRate = (((ndfRate / spotRate) -1) * (365/loanTerm)) *100;
    const ndfAmount = loanTotal / ndfRate;
    const impliedInts = ndfAmount - spotAmount;

    const impliedRate = ((impliedInts / spotAmount) * (365/loanTerm))*100;

    return (
        <>

            <div className="container mt-3" style={{"maxWidth": "500px"}}>

                {/* Loan stage user input */}

                <h2>{t("calc-title1")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input1")}</span>
                    <span className="input-group-text">$</span>
                    {capitalInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input2")}</span>
                    {rateInput}
                    <span className="input-group-text">%</span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input3")}</span>
                    {dueDateInput}
                </div>

                {/* Auto calculate */}
                
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input4")}</span>
                    <input value={!isNaN(loanTerm) ? loanTerm : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input5")}</span>
                    <span className="input-group-text">$</span>
                    <input value={loanInterest} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input6")}</span>
                    <span className="input-group-text">$</span>
                    <input value={loanTotal} type="number" className="form-control" aria-label="Total amount of capital plus interest" disabled />
                </div>

                {/* Spot stage */}

                <h2>{t("calc-title2")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input7")}</span>
                    <span className="input-group-text">$</span>
                    {spotRateInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input8")}</span>
                    <input value={spotAmount} type="number" className="form-control" aria-label="Total amount of capital plus interest" disabled />
                </div>

                {/* NDF stage */}

                <h2>{t("calc-title3")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input9")}</span>
                    <span className="input-group-text">$</span>
                    {ndfRateInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input10")}</span>
                    <input value={!isNaN(impliedNdfRate) ? impliedNdfRate.toFixed(2) : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                    <span className="input-group-text">%</span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input11")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(impliedInts) ? impliedInts.toFixed(2) : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input12")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(ndfAmount) ? ndfAmount.toFixed(2) : ""} type="number" className="form-control" aria-label="Total in foreign currency" disabled />
                </div>

                <h2 className={impliedRate <= 0 ? "text-success" : "text-danger"}>{t("calc-title4")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("calc-input13")}</span>
                    <input value={!isNaN(impliedRate) ? impliedRate.toFixed(2) : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                    <span className="input-group-text">%</span>
                </div>


                {/* ABBR */}

                <div className="card m-auto mt-3 mb-3" style={{"width": "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{t("abbr-title")}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{t("abbr-subtitle")}</h6>
                        <p className="card-text">{t("abbr-LC")}</p>
                        <p className="card-text">{t("abbr-FC")}</p>
                        <p className="card-text">{t("abbr-NDF")}</p>
                    </div>
                </div>
            </div>
        </>
    )
}