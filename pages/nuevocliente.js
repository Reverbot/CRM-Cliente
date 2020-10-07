import React, {useState} from 'react';
import Layout from '../components/Layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'

const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input : ClienteInput){
    nuevoCliente(input : $input){
        id
      nombre
      apellido
      email
      telefono
    }
  }
`
const OTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor{
    id
    nombre
    empresa
    apellido
    email
    telefono
    vendedor
  }
}
`


const NuevoCliente = () => {

    const [mensaje , guardarMensaje] = useState(null)

    const router = useRouter()

    const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data: {nuevoCliente}}){
            //obtener el objeto de cache que deseamos actualizar
            const { obtenerClientesVendedor} = cache.readQuery({query : OTENER_CLIENTES_USUARIO})

            //REESCRIBIR el cache
            cache.writeQuery({
                query: OTENER_CLIENTES_USUARIO,
                data:{
                    obtenerClientesVendedor : [...obtenerClientesVendedor, nuevoCliente]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues:{
            nombre : '',
            apellido : '',
            empresa : '',
            telefono : '',
            email : ''
        },
        validationSchema: Yup.object({
            nombre : Yup.string().required('El nombre del cliente es obligatorio'),
            apellido : Yup.string().required('El apellido del cliente es obligatorio'),
            empresa : Yup.string().required('la empresa del cliente es obligatorio'),
            email : Yup.string().required('el correo es oligatorio').email('Correo no valido')
        }),
        onSubmit :async valores => {
            
            const {nombre, apellido, empresa, email, telefono} = valores

            try {
                const {data }= await nuevoCliente({
                    variables:{
                        input:{
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                })

                router.push('/')
            } catch (error) {
                guardarMensaje(error.message)

                setTimeout(() => {
                    guardarMensaje(null)
                }, 2000 )
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
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="nombre">
                                Nombre *
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Nombre Cliente"
                                id="nombre"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>
                        {formik.errors.nombre  && formik.touched.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.nombre}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="apellido">
                                Apellido *
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Apellido Cliente"
                                id="apellido"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                            />
                        </div>
                        {formik.errors.apellido  && formik.touched.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.apellido}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="empresa">
                                Empresa *
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="empresa Cliente"
                                id="empresa"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                            />
                        </div>
                        {formik.errors.empresa  && formik.touched.empresa ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.empresa}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="email">
                                Correo *
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Email Cliente"
                                id="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        {formik.errors.email  && formik.touched.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.email}</p>
                            </div>

                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold m-2" htmlFor="telefono">
                                Telefono
                            </label>
                            <input
                                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                placeholder="Telefono Cliente"
                                id="telefono"
                                type="tel"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                        </div>
                        {formik.errors.telefono  && formik.touched.telefono ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.telefono}</p>
                            </div>

                        ) : null}

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Cliente"
                        />
                    </form>
                </div>
            </div>

        </Layout>
     );
}
 
export default NuevoCliente;