import React from 'react';
import {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import {gql, useQuery} from '@apollo/client'
import {Formik} from 'formik'
import * as Yup from 'yup'

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id : ID!){
        obtenerCliente(id:$id){
            nombre
            email
            apeliido
            telefono        
            empresa
        }
    }
`


const EditarCliente = () => {

    const router = useRouter()
    const {query : {id}} = router
    console.log(id)

    //consultar para obtener el cliente
    const {data, loading, error} = useQuery(OBTENER_CLIENTE, {
        variables:{
            id
        }
    })
   

    //schema de validacion
    const  schemaValidation = Yup.object({
        nombre : Yup.string().required('El nombre del cliente es obligatorio'),
        apellido : Yup.string().required('El apellido del cliente es obligatorio'),
        empresa : Yup.string().required('la empresa del cliente es obligatorio'),
        email : Yup.string().required('el correo es oligatorio').email('Correo no valido')
    })

if(loading) return "Cargando..."

console.log(data)
console.log(error)

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema = {schemaValidation}
                        enableReinitialize
                        // initialValues={
                        //     obtenerCliente
                        // }
                    >
                        {props => {
                            

                            return(

                         
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}
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
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                // value={props.values.nombre}
                            />
                        </div>
                        {props.errors.nombre  && props.touched.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{props.errors.nombre}</p>
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
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                // value={props.values.apellido}
                            />
                        </div>
                        {props.errors.apellido  && props.touched.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{props.errors.apellido}</p>
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
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                // value={formik.values.empresa}
                            />
                        </div>
                        {props.errors.empresa  && props.touched.empresa ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{props.errors.empresa}</p>
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
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                // value={formik.values.email}
                            />
                        </div>
                        {props.errors.email  && props.touched.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{props.errors.email}</p>
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
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                // value={formik.values.telefono}
                            />
                        </div>
                        {props.errors.telefono  && props.touched.telefono ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{props.errors.telefono}</p>
                            </div>

                        ) : null}

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Cliente"
                        />
                    </form>
                       )
                    }}
                    </Formik>
                </div>
            </div>

        </Layout>
     );
}
 
export default EditarCliente;