import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Loader from './pages/UI/loader';
// import Home from './components/home/home';
const Home = React.lazy(() => import("./pages/home/index"));


function App() {

    const { i18n } = useTranslation();
    // const navigator = useNavigate();
    // const history = useNavigate();

    useEffect(() => {
        const param = new URLSearchParams(window.location.search);
        i18n.changeLanguage(
          param.get("lang") ?? localStorage.getItem("lang") ?? "en"
        );
        localStorage.setItem("lang", i18n.language);
    
        // const regex = /^\?\//gm;
        // const m = regex.exec(window.location.search);
        // if (m != null) {
        //   const reconstruct = window.location.search.replace(regex, "").replace("&", "?");
        //   history.replaceState(null, "", `${window.location.pathname}${reconstruct}`);
        //   navigator(window.location.pathname);
        // }
      }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={
                    <Suspense fallback={<Loader/>}>
                        <Home/>
                    </Suspense>} />
                {/* <Route path="/calculate" element={<Calculate/>} /> */}
                {/* <Route path="/contact" element={<Contact/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
