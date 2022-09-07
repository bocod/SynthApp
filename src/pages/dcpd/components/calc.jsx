import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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
    const [loanCommission, commissionInput] = useInput({ type: "number" }, {label: "Loan commission whitout percentage symbol"});
    const [stamp, stampInput] = useInput({ type: "number" }, {label: "Loan commission whitout percentage symbol"});
    const [cheqTax, cheqTaxInput] = useInput({ type: "number" }, {label: "Loan commission whitout percentage symbol"});
    const [IVA, IVAInput] = useInput({ type: "number" }, {label: "Loan commission whitout percentage symbol"});

    const loanTerm = Math.ceil((new Date(loanDueDate) - new Date())/86400000);
    const loanInterest = (loanCapital * (loanRate/100) * (loanTerm/365)).toFixed(2);
    const loanFee = (loanCapital * (loanCommission/100)).toFixed(2);

    const loanSubtotal = loanCapital - loanInterest - loanFee;
    const loanSubtotalCost = (loanCapital - loanSubtotal).toFixed(2);

    const grossCFT = !isNaN(loanTerm) ? ((loanSubtotalCost / (loanCapital * (loanTerm/365)))*100).toFixed(2) : "";

    const stampTax = !isNaN(stamp) ? (loanCapital * (stamp/100)).toFixed(2) : "";
    const chequesTax = (loanCapital * (cheqTax/100)).toFixed(2);
    const IVATax = (chequesTax * (IVA/100)).toFixed(2);

    const credit = (loanSubtotal - stampTax - chequesTax - IVATax).toFixed(2);

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

                <h2>{t("DCPD Loan")}</h2>

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
                    <input value={!isNaN(loanInterest) ? loanInterest : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Commission")}</span>
                    {commissionInput}<span className="input-group-text">%</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(loanFee) ? loanFee : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                </div>

                {/* Subtotals */}

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Subtotal")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(loanSubtotal) ? loanSubtotal : ""} type="number" className="form-control" aria-label="Loan Subtotal to get" disabled />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Gross cost")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(loanSubtotalCost) ? loanSubtotalCost : ""} type="number" className="form-control" aria-label="Loan gross cost" disabled />
                </div>

                <h2>{t("Discount rate before taxes")}</h2>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Cost before taxes")}</span>
                    <input value={!isNaN(grossCFT) ? grossCFT : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                    <span className="input-group-text">%</span>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Stamp tax")}</span>
                    {stampInput}<span className="input-group-text">%</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(stampTax) ? stampTax : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("Cheques tax")}</span>
                    {cheqTaxInput}<span className="input-group-text">%</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(chequesTax) ? chequesTax : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("IVA")}</span>
                    {IVAInput}<span className="input-group-text">%</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(IVATax) ? IVATax : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">{t("To be credited")}</span>
                    <span className="input-group-text">$</span>
                    <input value={!isNaN(credit) ? credit : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                </div>

                <div className="mb-3">
                    <button type="button" className="btn btn-secondary" onClick={printHandler}><i className="bi bi-printer"></i> {t("Print")}</button>
                    <i className="bi bi-tree text-black-50 fw-light ms-3"> {t("print-disclosure")}</i>
                </div>

            </form>
            <iframe title="Synthetic loan detail" id="contentToPrint" style={{"height": "0px", "width": "0px", "position": "absolute"}}></iframe>
            
        </>
    )
}