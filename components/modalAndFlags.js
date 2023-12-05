import { Fragment, useEffect, useState } from 'react'
import ReactDOM from "react-dom/client";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import { Alert, Button, Typography } from "@material-tailwind/react";
import { GoAlertFill,GoCheckCircleFill,GoFlame  } from "react-icons/go";

function ModalConfirm(props) {
    let [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false)
    }

    const confirm = () => {
        if (props && props.onConfirm) props.onConfirm()
        closeModal()
    }

    const cancel = () => {
        if (props && props.onCancel) props.onCancel()
        closeModal()
    }

    const icons = icon(props)

    return (
        isOpen && (
            <Transition.Root appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={cancel}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white-100 sm:mx-0 sm:h-10 sm:w-10">
                                                {icons.icon}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">{props.title}</Dialog.Title>
                                                <Dialog.Description>

                                                    {props.description}
                                                </Dialog.Description>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {props.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className={icons.className}
                                            onClick={confirm}>{props.messageAccept}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={cancel}>{props.messageDecline}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>)
    )
}

function icon(data) {
    let icon = {}
    if (data.intent === 'warning') {
        icon.icon = <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
        icon.className = "inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
    }

    if (data.intent === 'danger') {
        icon.icon = <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        icon.className = "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    }

    if (data.intent === 'success') {
        icon.icon = <ExclamationTriangleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        icon.className = "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
    }
    return icon
}

function flags(props) {
    const [open, setOpen] = useState(true);
    const closeModal = () => {
        setTimeout(() => {
            setOpen(false)
        }, 2500)
    }
    closeModal()

    let classname = null
    let error = null
    let icons = null

    if (props.intent === 'success') {
        error = 'Correcto'
        icons = <GoCheckCircleFill />
        classname = "border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#ffffff]"
    }
    if (props.intent === 'warning') {
        error = 'Advertencia'
        icons = <GoAlertFill />
        classname = " border-[#a69133] bg-[#a69133]/10 font-medium text-[#ffffff]"
    }
    if (props.intent === 'danger') {
        error = 'Error'
        icons = <GoFlame />
        classname = "border-l-4 border-[#9c2a2a] bg-[#9c2a2a]/10 font-medium text-[#ffffff]"
    }


    return (
        <>
            <Transition.Root appear show={open} as={Fragment}>
                <Dialog onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0">
                        <div className="flex w-full flex-col gap-2">
                            {open && (
                                <Alert
                                    open={open}
                                    icon={icons}
                                    onClose={() => setOpen(false)}
                                    className={classname}
                                >
                                    <Typography variant="h6" color="white">
                                        {error}
                                    </Typography>
                                    <Typography color="white" className="mt-2 font-normal">
                                        {props.message}
                                    </Typography>
                                </Alert>
                            )}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );

}

async function showConfirm(config) {
    return new Promise((res) => {
        renderModal(ModalConfirm, {
            onConfirm: () => res(true),
            onCancel: () => res(false),
            ...config,
        })
    })
}

async function showFlag(config) {
    return renderModal(flags, config)
}

function renderModal(Children, props) {
    const domNode = document.createElement('div');
    const root = ReactDOM.createRoot(domNode);
    root.render(<Children {...props} />)
}
export { showConfirm, showFlag, renderModal }