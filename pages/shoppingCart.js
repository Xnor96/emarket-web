import { useState, useEffect } from 'react'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { showFlag } from "../components/modalAndFlags";
import api from '../services/api';

const User = () => {
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
            let { data: result } = await api.get('/carts/', filter)
            let maxPages = Math.ceil(result.count / 25)
            let x = []

            for (let i = 0; i < maxPages; i++) x.push(i + 1)
            setPages(x)

            let array = result.cart
            array = array.map((cart) => ({ ...cart, isHover: false }))
            setSkus(array)
        } catch (err) {
            console.log(err)
        }
    }

    const minusSku = async (idCarts) => {
        try {
            let { data: result } = await api.post('/carts/minus', {idCarts : idCarts})
            showFlag({
                intent: 'success',
                message: result,
            })
            getSkus(currentPage)
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

    const plusSku = async (idSku) => {
        try {
            let { data: result } = await api.post('/carts/', {Sku: idSku})
            showFlag({
                intent: 'success',
                message: result,
            })
            getSkus(currentPage)
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
    const TABLE_HEAD = ["Articulo", "Cantidad", "Total", ""];
    return (
        <>
            <Navbar />
            { }
            <div className="py-20 px-10 max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto">
                <Card color="transparent" className="h-full w-full shadow-none">
                    <CardHeader color="transparent" floated={false} shadow={false} className="rounded-none">
                        <div className=" flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" className='text-gray-900 bg-transparent appearance-none dark:text-white'>
                                    Carrito de compras
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-900 bg-transparent appearance-none dark:text-white">
                                    Informacion general
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0 ">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="cursor-pointer  bg-transparent p-4 transition-colors hover:bg-blue-gray-500"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-gray-900 bg-transparent appearance-none dark:text-white flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                {head}{" "}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {skus.map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"

                                                        className="text-gray-900 bg-transparent appearance-none dark:text-white font-normal"
                                                    >
                                                        {row.Sku.name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"

                                                        className="text-gray-900 bg-transparent appearance-none dark:text-white font-normal"
                                                    >
                                                        {row.quantity}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"

                                                        className="text-gray-900 bg-transparent appearance-none dark:text-white font-normal"
                                                    >
                                                        ${(row.quantity * row.Sku.price).toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="">
                                            <Tooltip content="Restar Producto">
                                                <IconButton variant="text" onClick={() => minusSku(row._id)}>
                                                    <MinusIcon className="h-4 w-4 dark:text-white" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Aumentar producto">
                                                <IconButton variant="text" onClick={() => plusSku(row.Sku._id)} >
                                                    <PlusIcon className="h-4 w-4 dark:text-white" />
                                                </IconButton>
                                            </Tooltip>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
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
                </Card>
            </div>
            <Footer />
        </>
    );
}

export default User;