import '../styles/style.scss'
import Router from "next/router";
import React from "react";
import { RotatingLines } from 'react-loader-spinner'
import {Provider} from "react-redux";
import {store} from "../store";



export default function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      const start = () => {
        setLoading(true);
      };
      const end = () => {
        setLoading(false);
      };
      Router.events.on("routeChangeStart", start);
      Router.events.on("routeChangeComplete", end);
      Router.events.on("routeChangeError", end);
      return () => {
        Router.events.off("routeChangeStart", start);
        Router.events.off("routeChangeComplete", end);
        Router.events.off("routeChangeError", end);
      };
    }, []);

    return <>
      {loading ? (
          <div style={{position: 'relative', width: '100%', height: '90vh'}}>
            <div className={'loader'}>
              <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="120"
                  visible={true}
              />
            </div>
          </div>

      ) : (

          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>

      )}</>
  }