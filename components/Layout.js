import React from 'react';
import Head from 'next/head'
import Sidebar from './Sidebar'
import {useRouter} from 'next/router'

const Layout = ({children}) => {

     //routing
     const router = useRouter()

    return ( 
        <>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
            <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
            <title>CRM - Administracion de Clientes</title>
        </Head>
        {router.pathname === "/login" || router.pathname === "/nuevacuenta"? (
            <div className="bg-gray-800 min-h-screen flex flex-col  justify-center">
                {children}
            </div>
        ) : (
            <div className="bg-gray-200 min-h-screen">
            
            <div className="flex min-h-screen">
                <Sidebar />

                <main className="sm:w-2/4 lg:w-4/5 sm:min-h-screen p-5">
                    {children}
                </main>
            </div>   
        </div>
        )}
        
        </>
     );
}
    
export default Layout;