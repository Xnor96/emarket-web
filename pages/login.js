'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import api, { saveToken } from '../services/api'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setLogged } from '../actions/user'
import {
    Input,
    Button,
    Typography
} from '@material-tailwind/react'
import { showFlag } from '../components/modalAndFlags'

const Div = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  box-sizing: content-box;
  color: #333;
  width: 100%;
  min-height: 60px;
  padding: 20px;
`

function Login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [awaitLogin, SetAwaitLogin] = useState(false)

    const login = async () => {
        if (password.length == 0) {
            return showFlag({
                message: 'Todos los campos deben ser llenados',
                intent: 'warning'
            })
        }

        try {
            SetAwaitLogin(true)
            const { data: loginData } = await api.post('/users/login', {
                email: username,
                password
            })
            dispatch(setLogged(true))
            saveToken(loginData.token)
            router.push('/')

            SetAwaitLogin(false)
            showFlag({
                intent: 'success',
                message: 'Bienvenido',
            })
        } catch (error) {
            console.log(error.response)
            SetAwaitLogin(false)
            if (error.code == "ERR_NETWORK") {
                showFlag({
                    intent: 'danger',
                    message: error.message
                })
            }
            if (error.response && error.response.data) {
                showFlag({
                    intent: 'danger',
                    message: error.response.data.message,
                })
            }
        }
    }

    const usernameChange = (e) => setUsername(e.target.value)
    const passwordChange = (e) => setPassword(e.target.value)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') login()
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '8%' }}>
                <Div style={{ width: 385 }}>
                    <div className='text-sm font-bold tracking-wider text-black-500 uppercase' style={{ textAlign: 'center' }}>Carrito de compras</div>
                    <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="black" className="-mb-3">
                                Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                value={username}
                                onChange={usernameChange}
                                className=" !border-t-red-300 focus:!border-t-blac-500"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                value={password}
                                onChange={passwordChange}
                                onKeyDown={handleKeyDown}
                                className=" !border-t-red-300 focus:!border-t-blac-500"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        {awaitLogin ? (
                            <Button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-light rounded-lg text-sm py-2.5 text-center mt-3" disabled fullWidth>
                                <svg aria-hidden="true" role="status" className="inline w-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </Button>

                        ) : (
                            <Button onClick={login} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-light rounded-lg text-sm py-2.5 text-center mt-3" fullWidth>
                                Ingresar
                            </Button>
                        )}
                    </div>
                </Div >
            </div >
        </>
    )
}

export default Login