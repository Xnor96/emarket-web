import Head from "next/head";
import { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { showFlag } from "../components/modalAndFlags";
import api from "../services/api";


const Home = () => {
    const [awaitButton, SetAwaitButton] = useState(false)
    const [skus, setSkus] = useState([])
    const [pages, setPages] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        getSkus(1)
    }, [])


    const getSkus = async (p) => {
        let filter = { p }

        try {
            let { data: result } = await api.get('/skus', filter)
            let maxPages = Math.ceil(result.count / 25)
            setPages(maxPages)

            let array = result.sku
            array = array.map((sku) => ({ ...sku, isHover: false }))
            setSkus(array)
        } catch (error) {
            console.error(error)
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                showFlag({
                    intent: 'danger',
                    message: error.response.data.error.message,
                })
            }
        }
    }


    const addSkuToCart = async (idSku) => {
        try {
            let { data: result } = await api.post('/carts', { Sku: idSku, quantity: 1 })
            showFlag({
                intent: 'success',
                message: result,
            })
        } catch (error) {
            console.error(error)
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                showFlag({
                    intent: 'danger',
                    message: error.response.data.error.message,
                })
            }
        }
    }

    const next = () => {
        setCurrentPage(currentPage + 1)
        getSkus(currentPage + 1)
    };

    const prev = () => {
        if (currentPage === 1) return
        setCurrentPage(currentPage - 1)
        getSkus(currentPage - 1)
    };

    return (
        <>
            <Head>
                <title>Emarket</title>
                <meta
                    name="description"
                    content="Examen práctico"
                />
            </Head>
            <Navbar />
            <div className="p-10 px-10 max-w-screen-lg grid sm:grid-cols-1 xl:grid-cols-3 gap-5 mx-auto">
                {skus.map((row, i) => (
                    <Card className="w-full" key={i}>
                        <CardHeader shadow={false} floated={false} className="h-96">
                            <img
                                src={row.imgUrl}
                                alt="card-image"
                                className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                                <Typography color="blue-gray" className="font-medium">
                                    {row.name}
                                </Typography>
                                <Typography color="blue-gray" className="font-medium">
                                    ${row.price}
                                </Typography>
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal opacity-75"
                            >
                                Test
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                ripple={false}
                                fullWidth={true}
                                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                onClick={() => addSkuToCart(row._id)}
                            >
                                Agregar al carrito
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className=" px-10 max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto">
                <CardFooter className="flex items-center justify-between ">
                    <Typography variant="small" className="text-gray-900 bg-transparent appearance-none dark:text-white font-normal">
                        Pagina {currentPage} de {pages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" className='dark:text-white' onClick={prev}
                            disabled={currentPage === 1}>
                            Anterior
                        </Button>
                        <Button variant="outlined" size="sm" className='dark:text-white' onClick={next}
                            disabled={currentPage >= pages}>
                            Siguente
                        </Button>
                    </div>
                </CardFooter>
            </div>

            <Footer />
        </>
    );
}

export default Home;