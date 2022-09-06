import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Landing(){
    const { t } = useTranslation();

    return (
        <div className="card text-center">
            <div className="card-header">
                {t("appHeader")}
            </div>
            <div className="card-body">
                <h5 className="card-title">{t("descTitle")}</h5>
                <p className="card-text">{t("description")}</p>
                <NavLink to={"/calculate"} className="btn btn-primary">{t("calc-btn")}</NavLink>
            </div>
            <div className="card-footer text-muted">
                2 days ago
            </div>
        </div>
    )
}