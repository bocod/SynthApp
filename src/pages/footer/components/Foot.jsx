import { useTranslation } from 'react-i18next';

export default function Foot(){
    
    const { t } = useTranslation();

    return (
        <footer className='mt-3'>
                <div className="bg-light text-muted text-center" id='disclosure'>
                    {t("disclosure")}
                </div>
            <div className="ps-3 bg-dark">
                <a className="text-decoration-none text-light" href="https://github.com/bocod" target="_blank" rel="noreferrer"><i className="bi bi-github"></i> BOCOD</a>
            </div>
        </footer>
    )
}