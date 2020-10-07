import React, { useState } from 'react';
import Layout from '../components/Layout'
import {useRouter} from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql }  from '@apollo/client'

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input : UsuarioInput){
        nuevoUsuario(input : $input){
        id
        nombre
        apellido
        email
        }
    }
`


const NuevaCuenta = () => {

    //state para el mensaje
    const [mensaje, guardarMensaje] = useState(null)

    //mutation para crear nuevos usuarios
    const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA)   
    
    //routing
    const router = useRouter()

    //validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre : '',
            apellido : '',
            email : '',
            password : ''
        },
        validationSchema: Yup.object({
            nombre : Yup.string().required('El nombre es Obligatorio'),
            apellido : Yup.string().required('El apellido es Obligatorio'),
            email : Yup.string().email('El email no es valido').required('El email es Obligatorio'),
            password : Yup.string().required('El password es Obligatorio').min(6, 'El password debe ser mayor a 6 caracteres')
        }),
        onSubmit: async valores => {
            
            const {nombre, apellido, email, password} = valores

            try {
               const data = await nuevoUsuario({
                   variables : {
                       input : {
                           nombre,
                           apellido,
                           email,
                           password
                       }
                   }
               })
              
            
            
               //usuario creado correctamente
               guardarMensaje(`Se creo correctamente el usuario: ${data.data.nuevoUsuario.nombre}`)

               setTimeout(() => {
                guardarMensaje(null)
                router.push('/login')
            }, 3000);
            

            } catch (error) {
                guardarMensaje(error.message.replace('Graphql error: ', ''))

                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000);
                
            }
        }
    })

    const mostrarMensaje = () =>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        <Layout>
            {mensaje && mostrarMensaje()}
            <h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Nombre Usuario"
                                id="nombre"
                                type="text"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.nombre  && formik.touched.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.nombre}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="apellido">
                                Apellido
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Apellido Usuario"
                                id="apellido"
                                type="text"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.apellido  && formik.touched.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.apellido}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Email Usuario"
                                id="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.email  && formik.touched.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.email}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="password">
                                Pasword
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Email Password"
                                id="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.password  && formik.touched.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.password}</p>
                            </div>

                        ) : null}
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Crear Cuenta"
                        />
                    </form>

                </div>
            </div>
        </Layout>
     );
}
 
export default NuevaCuenta;