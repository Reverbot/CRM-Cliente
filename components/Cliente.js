import React from 'react';
import Swal from 'sweetalert2'
import {gql, useMutation} from '@apollo/client'
import Router from 'next/router'

const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id:ID!){
        eliminarCliente(id:$id)
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

const Cliente = ({cliente}) => {

    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,  {
        update(cache){
            //obtener clientes vendedor
            const {obtenerClientesVendedor} = cache.readQuery({query: OTENER_CLIENTES_USUARIO})

            //reescribir cache
            cache.writeQuery({
                query:OTENER_CLIENTES_USUARIO,
                data : {
                    obtenerClientesVendedor : obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
    })
    const {id, nombre, apellido, empresa, email} = cliente
    
    const confirmarEliminarCliente = () => {

        Swal.fire({
            title: 'Deseas eliminar al Cliente',
            text: "Esta Accion no se Puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) {

                try {

                    //eliminar por ID
                    const {data} = await eliminarCliente({
                        variables:{
                            id
                        }
                    })
                    console.log(data)

                    //mostrar una alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarCliente,
                        'success'
                      )
                    
                } catch (error) {
                    console.log(error)
                }

              
            }
          })

    }
    const EditarCliente = () => {
        Router.push({
            pathname : '/editarcliente/[id]',
            query: {id}
        })
    }

    return ( 
        <tr key={cliente.id}>
                        <td className="border px-4 py-2">{nombre} {apellido}</td>
                        <td className="border px-4 py-2">{empresa}</td>
                        <td className="border px-4 py-2">{email}</td>
                        <td className="border px-4 py-2">
                            <button
                                type="button"
                                className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white  rounded text-xs font-bold uppercase"
                                onClick={() => confirmarEliminarCliente(id)}
                            >Eliminar

                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                type="button"
                                className="flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white  rounded text-xs font-bold uppercase"
                                onClick={() => EditarCliente()}
                            >Editar

                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                            
                        </td>
        </tr>
     );
}
 
export default Cliente;