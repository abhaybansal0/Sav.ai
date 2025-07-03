import React from 'react'
import HeaderII from '@/components/HeaderII'



const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-w-screen min-h-screen bg-black-home md:w-full'>

            <div className="h-screen absolute hidden md:flex flex-col w-56 inset-y-0  border-collapse">
                {/* SideBar */}
            </div>

            <div className=''>
                {/* Navbar */}
                <HeaderII active='courses' />
            </div>

            <main>
                {children}
            </main>
        </div>
    )
}

export default layout
