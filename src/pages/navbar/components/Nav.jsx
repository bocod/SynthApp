import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";




export default function Navbar(){

    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [selectedLanguage]);

  const handleLanguageSelectorChange = (lang) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    setSelectedLanguage(lang);
    window.history.pushState(null, "", url.toString());
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink to={"/home"}  className="navbar-brand" aria-current="page"><i className="bi bi-piggy-bank"></i> {t("appTitle")}</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to={"/home"}  className="nav-link active" aria-current="page">{t("Nav-Home")}</NavLink>
                        <a href="https://www.linkedin.com/in/agustinboccio/" target="_blank" rel="noreferrer" className="nav-link">{t("Nav-Contact")}</a>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {t("language")}
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                <li>
                                    <span className="dropdown-item" onClick={() => handleLanguageSelectorChange("en")}>
                                        <span class="fi fi-gb"></span>
                                        {"    "}{t("english")}
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown-item" onClick={() => handleLanguageSelectorChange("es")}>
                                        <span class="fi fi-es"></span>
                                        {"    "}{t("spanish")}
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown-item" onClick={() => handleLanguageSelectorChange("cat")}>
                                        <span class="fi fi-es-ct"></span>
                                        {"    "}{t("catalan")}
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    )
}