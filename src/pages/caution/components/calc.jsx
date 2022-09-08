import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Calc(){

    const { t } = useTranslation();

    function useInput({ type }, { label }, { placeholder } ) {
        const [value, setValue] = useState("");
        const input = <input className="form-control" aria-label={label} value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder} required />;
        return [value, input];
    }

    const [cautionCapital, capitalInput] = useInput({ type: "number" }, {label: "Caution Capital Amount"}, { placeholder: "123456.99" });
    const [cautionRate, rateInput] = useInput({ type: "number" }, {label: "Caution Rate whitout percentage symbol"}, { placeholder: "TNA - e.g.: '7' or '8.25'" });
    const [cautionDueDate, dueDateInput] = useInput({ type: "date" }, {label: "Caution due date"}, { placeholder: undefined });
    const [exchangeCommission, commissionInput] = useInput({ type: "number" }, {label: "Exchange commission whitout percentage symbol"}, { placeholder: "0.15" });
    const [mFee, mFeeInput] = useInput({ type: "number" }, {label: "Market fee whitout percentage symbol"}, { placeholder: "0.045" });
    const [IVA, IVAInput] = useInput({ type: "number" }, {label: "IVA or VAT whitout percentage symbol"}, { placeholder: "21" });

    const cautionTerm = Math.ceil((new Date(cautionDueDate) - new Date())/86400000);
    const grossProfit = (cautionCapital * (cautionRate/100) * (cautionTerm/365)).toFixed(2);
    const exchangeFee = (((exchangeCommission/100)/30* cautionTerm) * cautionCapital).toFixed(2);
    const IVATax = (exchangeFee * (IVA/100)).toFixed(2);
    const marketFee = (((Number(mFee)/100)/90 * cautionCapital * cautionTerm)*1.21).toFixed(2);
    
    const cautionCost = (Number(exchangeFee) + Number(IVATax) + Number(marketFee)).toFixed(2);
    const netProfit = (Number(grossProfit) - Number(cautionCost)).toFixed(2);
    const credit = (Number(cautionCapital) + Number(netProfit)).toFixed(2);

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
                <h2 className='text-center'>{t("Stock Caution")}</h2>

                <section>
                    <div>
                        <h4>{t("Capital to caution")}</h4>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            {capitalInput}
                        </div>
                    </div>
                    <div>
                        <h4>{t("Rate")}</h4>
                        <div className="input-group mb-3">
                            {rateInput}
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                    <div>
                        <h4>{t("Due date")}</h4>
                        <div className="input-group mb-3">
                            {dueDateInput}
                        </div>
                    </div>

                    {/* Auto calculate */}
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text">{t("Term")}</span>
                        <input value={!isNaN(cautionTerm) ? cautionTerm : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                        <span className="input-group-text">{t("days")}</span>
                    </div>

                    <div>
                        <h4>{t("Gross profit")}</h4>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input value={!isNaN(grossProfit) ? grossProfit : ""} type="number" className="form-control" aria-label="Loan interest" disabled />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className='text-center'>{t("Commissions, fees and taxes")}</h3>

                    <div>
                        <h4>{t("Commission")}</h4>
                        <div className="input-group mb-3">
                            {commissionInput}
                            <span className="input-group-text">%</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input value={!isNaN(exchangeFee) ? exchangeFee : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                        </div>
                    </div>

                    <div>
                        <h4>{t("IVA")} / {t("Commission")}</h4>
                        <div className="input-group mb-3">
                            {IVAInput}
                            <span className="input-group-text">%</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input value={!isNaN(IVATax) ? IVATax : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                        </div>
                    </div>

                    <div>
                        <h4>{t("Market fee")}</h4>
                        <div className="input-group mb-3">
                            {mFeeInput}
                            <span className="input-group-text">%</span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input value={!isNaN(marketFee) ? marketFee : ""} type="number" className="form-control" aria-label="Total amount of commission" disabled />
                        </div>
                    </div>
                </section>

                {/* Subtotals */}
                <section>
                    <div>
                        <h3>{t("Caution cost")}</h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input value={!isNaN(cautionCost) ? cautionCost : ""} type="number" className="form-control" aria-label="Caution cost" disabled />
                        </div>
                    </div>

                    <div>
                        <h3>{t("Net profit")}</h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input value={!isNaN(netProfit) ? netProfit : ""} type="number" className="form-control" aria-label="Net profit to earn" disabled />
                        </div>
                    </div>

                    <div>
                        <h3>{t("To be credited")}</h3>
                        <div className="input-group mb-3">
                            <span className={Number(credit) > Number(cautionCapital) ? "input-group-text text-success fw-bold" : "input-group-text"}>$</span>
                            <input value={!isNaN(credit) ? credit : ""} type="number" className={Number(credit) > Number(cautionCapital) ? "form-control text-success fw-bold" : "form-control"} aria-label="Total amount to recieve at due date" disabled />
                        </div>
                    </div>

                    <div className="mb-3">
                        <button type="button" className="btn btn-secondary" onClick={printHandler}><i className="bi bi-printer"></i> {t("Print")}</button>
                        <i className="bi bi-tree text-black-50 fw-light ms-3"> {t("print-disclosure")}</i>
                    </div>
                </section>

                {/* ABBR */}

                <div className="card m-auto mt-3 mb-3" style={{"width": "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{t("references-title")}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{t("abbr-subtitle")}</h6>
                        <p className="card-text">{t("ref-commission")}</p>
                        <p className="card-text">{t("ref-IVA")}</p>
                        <p className="card-text">{t("ref-market-fee")}</p>
                    </div>
                </div>
            </form>

            <iframe title="Synthetic loan detail" id="contentToPrint" style={{"height": "0px", "width": "0px", "position": "absolute"}}></iframe>

        </>
    )
}