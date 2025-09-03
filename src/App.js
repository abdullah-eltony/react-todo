// components
import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";

// styles
import styles from "./styles/modules/app.module.scss";
import React from "react";
import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
function App() {
  return (
    <React.Fragment>
      <div className="container">
        <PageTitle>TODO LIST</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent/>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize:'1.4rem'
          }
        }
          
        }
      />
    </React.Fragment>
  );
}

export default App;
