import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Calc(){

    const { t } = useTranslation();

    function useInput({ type }, { label }) {
        const [value, setValue] = useState("");
        const input = <input className="form-control" aria-label={label} value={value} onChange={e => setValue(e.target.value)} type={type} required />;
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

    const printHandler = () => {
        const content = document.getElementById("printable");
        const disclosure = document.getElementById("disclosure")
        const printable = document.getElementById("contentToPrint").contentWindow;
        printable.document.open();
        printable.document.write(content.innerHTML);
        printable.document.write(disclosure.innerHTML);
        printable.document.close();
        printable.focus();
        printable.print();
    }

    return (
        <>
            <div className="container mt-3">
                <h2>{t("how to use")}</h2>
                <p className='text-danger'><strong>{t("calc-use-1")}</strong></p>
                <p>{t("calc-use-2")}</p>
                <p>{t("calc-use-3")}</p>
                <p>{t("calc-use-4")} <strong className='text-danger'>{t("calc-use-5")}</strong></p>
            </div>

            <form className="container mt-3" style={{"maxWidth": "500px"}} id="printable">

                {/* Loan stage user input */}

                <h2>{t("LC Loan")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan Capital")}</span>
                    <span className="input-group-text">$</span>
                    {capitalInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan Rate")}</span>
                    {rateInput}
                    <span className="input-group-text">%</span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Due date")}</span>
                    {dueDateInput}
                </div>

                {/* Auto calculate */}
                
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Term")}</span>
                    <input value={!isNaN(loanTerm) ? loanTerm : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                    <span className="input-group-text">{t("days")}</span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Interest")}</span>
                    <span className="input-group-text">$</span>
                    <input value={loanInterest} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Total")}</span>
                    <span className="input-group-text">$</span>
                    <input value={loanTotal} type="number" className="form-control" aria-label="Total amount of capital plus interest" disabled />
                </div>

                {/* Spot stage */}

                <h2>{t("Spot")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Spot price")}</span>
                    <span className="input-group-text">$</span>
                    {spotRateInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Loan Capital")} {t("in FC")}</span>
                    <input value={spotAmount} type="number" className="form-control" aria-label="Total amount of capital plus interest" disabled />
                </div>

                {/* NDF stage */}

                <h2>{t("Future selling")} - {t("NDF")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("NDF price")}</span>
                    <span className="input-group-text">$</span>
                    {ndfRateInput}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("NDF implied rate")}</span>
                    <input value={!isNaN(impliedNdfRate) ? impliedNdfRate.toFixed(2) : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                    <span className="input-group-text">%</span>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Implied interest")} {t("in FC")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(impliedInts) ? impliedInts.toFixed(2) : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Total")} {t("in FC")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(ndfAmount) ? ndfAmount.toFixed(2) : ""} type="number" className="form-control" aria-label="Total in foreign currency" disabled />
                </div>

                <h2 className={impliedRate <= 0 ? "text-success" : "text-danger"}>{t("Implied synthetic rate")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Implied Rate")}</span>
                    <input value={!isNaN(impliedRate) ? impliedRate.toFixed(2) : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                    <span className="input-group-text">%</span>
                </div>

                <div className="mb-3">
                    <button type="button" className="btn btn-secondary" onClick={printHandler}><i className="bi bi-printer"></i> Print</button>
                    <i className="bi bi-tree text-black-50 fw-light ms-3"> Remember "Save as PDF"</i>
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
            </form>
            <iframe title="Synthetic loan detail" id="contentToPrint" style={{"height": "0px", "width": "0px", "position": "absolute"}}></iframe>
            
        </>
    )
}