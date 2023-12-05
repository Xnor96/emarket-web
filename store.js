import { createStore } from 'redux'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
import { Base64 } from 'js-base64'
import app from './reducers'
import { setUpInterceptors } from './services/api'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined" ? createNoopStorage() : createWebStorage('local');

const encrypt = createTransform(
    (inboundState) => {
        return Base64.encode(JSON.stringify(inboundState))
    },
    (outboundState) => {
        return JSON.parse(Base64.decode(outboundState))
    },
    {
        whitelist: ['user'],
    }
)

const persistConfig = {
    key: 'root',
    storage: storage,
    transforms: [encrypt]
}


const persistedReducer = persistReducer(persistConfig, app)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store, {})

setUpInterceptors(store)