import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Provider, useSelector } from 'react-redux'
import { store, persistor } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { loadToken } from "../services/api";


function Wrapper(props) {
    const user = useSelector((state) => state.user)
    const router = useRouter()

    useEffect(() => {
        if (!user.logged && router.pathname != '/login') {
            router.push('/login')
        }
        
    }, [])
    loadToken()

    return <>{props.children}</>
}

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider attribute="class">
                    <Wrapper>
                        {loading ? (
                            <div className="flex h-screen items-center justify-center bg-black">
                                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                            </div>
                        ) : (<Component {...pageProps} />)}
                    </Wrapper>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;