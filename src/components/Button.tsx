import React, { MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
    return (
        <button
            className='py-1 px-5 font-semibold text-white bg-[#04113D] rounded-xl transition duration-500 hover:duration-500 hover:opacity-80'
            onClick={onClick}
        >
            {children}
        </button>
    )
}
