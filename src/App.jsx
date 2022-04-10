import React, { useLayoutEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";

import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import * as styles from "./css/App.module.css";
import useStore from "./Store";

function App() {
  const setIsMobile = useStore((state) => state.setIsMobile);
  const [showFooter, setShowFooter] = useState(true);

  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 765);
    setShowFooter(window.innerHeight > 750);
    // listen for resizing
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 765)
    );
    window.addEventListener("resize", () =>
      setShowFooter(window.innerHeight > 750)
    );
  }, [setIsMobile]);

  return (
    <div className={styles.body}>
      <Router>
        <Header />
        <Body />
        {showFooter ? <Footer /> : <div className={styles.footer} />}
      </Router>
    </div>
  );
}

export default App;
