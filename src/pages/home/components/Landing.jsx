import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Landing() {
    const { t } = useTranslation();

    function useAccItem( id , title , description , destination, collapsed, expanded, show ) {
        const accItem = (
            <div className="accordion-item">
                <h2 className="accordion-header" id={"heading" + id}>
                    <button
                        className={"accordion-button "+collapsed}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + id}
                        aria-expanded={expanded}
                        aria-controls={"collapse" + id}
                    >
                        {t(title)}
                    </button>
                </h2>
                <div
                    id={"collapse" + id}
                    className={"accordion-collapse collapse "+show}
                    aria-labelledby={"heading" + id}
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body">
                        {description?.map((e, index) => {
                            return (
                                <p key={index} className="card-text">
                                    {t(e)}
                                </p>
                            );
                        })}
                    </div>
                    <div className="mt-3 mb-3 text-center">
                        <NavLink to={destination} className="btn btn-primary">{t("calc-btn")} {t(title)}</NavLink>
                    </div>
                </div>
            </div>
        );
        return accItem;
    }

    const acuerdoItem = useAccItem(
        "One",
        "Overdraft",
        [
            "over-desc-1",
            "over-desc-2",
        ],
        "/",
        "collapsed",
        false,
        ""
    );
    const syntheticItem = useAccItem(
        "Two",
        "Synth-appHeader",
        [
            "Synth-description-1",
            "Synth-description-2",
            "Synth-description-3",
        ],
        "/calculate-synthetic",
        "",
        true,
        "show"
    );
    const dCPDItem = useAccItem(
        "Three",
        "DCPD Loan",
        [
            "DCPD-description-1",
            "DCPD-description-2",
            "DCPD-description-3",
        ],
        "/calculate-postdated-cheques-discount",
        "collapsed",
        false,
        ""
    );
    const cautionItem = useAccItem(
        "Four",
        "Stock Caution",
        [
            "Caution-description-1",
            "Caution-description-2",
            "Caution-description-3",
            "Caution-description-4",
            "Caution-description-5",
        ],
        "/calculate-stock-caution",
        "collapsed",
        false,
        ""
    );
    
    return (
        <div className="container mt-3">
            <section>
                <h1>{t("appTitle")}</h1>
                <h3>{t("appSubtitle")}</h3>
                <article className="mt-3">
                    <h2>{t("How it works")}</h2>
                    <p>{t("HIW-1")}</p>
                    <p>{t("HIW-2")}</p>
                    <p>{t("HIW-3")}</p>
                </article>
            </section>
            <div className="accordion" id="accordionSynthetic">
                {/* {acuerdoItem} */}
                {syntheticItem}
                {dCPDItem}
                {cautionItem}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingN">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseN"
                            aria-expanded="false"
                            aria-controls="collapseN"
                        >
                            {t("More calculators")}
                        </button>
                    </h2>
                    <div
                        id="collapseN"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingN"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <p>
                                <strong>{t("Upcoming next")}</strong>
                            </p>
                            <p>{t("New features to be")}</p>
                            <p>
                                <strong>{t("Stay tuned!")}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
