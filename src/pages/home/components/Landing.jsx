import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Landing(){
    const { t } = useTranslation();

    return (
        <div className='container mt-3'>
            <section>
                <h1>{t("appTitle")}</h1>
                <h3>{t("appSubtitle")}</h3>
                <article className='mt-3'>
                    <h2>{t("How it works")}</h2>
                    <p>{t("HIW-1")}</p>
                    <p>{t("HIW-2")}</p>
                    <p>{t("HIW-3")}</p>
                </article>
            </section>
            <div className="accordion" id="accordionSynthetic">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {t("Synth-appHeader")} - {t("Synth-descTitle")}
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionSynthetic">
                        <div className="accordion-body">
                            <p className="card-text">{t("Synth-description-1")}</p>
                            <p className="card-text">{t("Synth-description-2")}</p>
                            <p className="card-text">{t("Synth-description-3")}</p>
                        </div>
                        <div className='mt-3 mb-3 text-center'>
                            <NavLink to={"/calculate-synthetic"} className="btn btn-primary">{t("calc-btn")} {t("Synthetic")}</NavLink>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        {t("DCPD Loan")}
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                            <p className="card-text">{t("DCPD-description-1")}</p>
                            <p className="card-text">{t("DCPD-description-2")}</p>
                            <p className="card-text">{t("DCPD-description-3")}</p>
                        </div>
                        <div className='mt-3 mb-3 text-center'>
                            <NavLink to={"/calculate-postdated-cheques-discount"} className="btn btn-primary">{t("calc-btn")} {t("DCPD Loan")}</NavLink>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        {t("Stock Caution")}
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                            <p className="card-text">{t("Caution-description-1")}</p>
                            <p className="card-text">{t("Caution-description-2")}</p>
                            <p className="card-text">{t("Caution-description-3")}</p>
                            <p className="card-text">{t("Caution-description-4")}</p>
                            <p className="card-text">{t("Caution-description-5")}</p>
                        </div>
                        <div className='mt-3 mb-3 text-center'>
                            <NavLink to={"/calculate-stock-caution"} className="btn btn-primary">{t("calc-btn")} {t("Stock Caution")}</NavLink>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingN">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseN" aria-expanded="false" aria-controls="collapseN">
                        More calculators...
                    </button>
                    </h2>
                    <div id="collapseN" className="accordion-collapse collapse" aria-labelledby="headingN" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p><strong>Upcoming next...</strong></p>
                        <p>New features are being developed to make your financial calculations easier!</p>
                        <p><strong>Stay tuned!</strong></p>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}