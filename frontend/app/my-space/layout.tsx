import ClientSync from '@/components/ClientSync'
import Header from '@/components/HeaderII'
import { ReduxProvider } from '@/lib/redux/provider'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-w-screen min-h-screen md:w-full'>

            <ReduxProvider>
                <ClientSync />
            </ReduxProvider>

            <div className="h-screen absolute hidden md:flex flex-col w-56 inset-y-0  border-collapse">
                {/* SideBar */}
            </div>

            <div className=''>
                {/* Navbar */}
                <Header active='profile' />
            </div>

            <main>
                {children}
            </main>
        </div>
    )
}
export default layout
