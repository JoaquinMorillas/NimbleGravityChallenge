import React, { useContext, useState } from 'react'
import { LoadingContext } from '../context/LoadingContext'
import Swal from 'sweetalert2'
import axios from 'axios'

export const TableComponent = ({ jobs }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const ENDPOINT = BASE_URL + import.meta.env.VITE_APPLY_ENDPOINT
    const {startLoading, stopLoading} = useContext(LoadingContext)
    const myUuid = import.meta.env.VITE_UUID
    const myCandidateId = import.meta.env.VITE_CANDIDATE_ID
    const myAplicationId = import.meta.env.VITE_APPLICATION_ID
    const [repoInputs, setRepoInputs] = useState({})

    const handleSubmit = async (job) => {
        if(!repoInputs[job.id]){
            Swal.fire({
                title: "Error",
                text: "El campo de Url es obligatorio",
                icon: "error"
            })
            return
        }

        try{
            startLoading()
            const request = await axios.post(ENDPOINT, 
                {
                    "uuid": myUuid,
                    "jobId": job.id,
                    "candidateId": myCandidateId,
                    "repoUrl": repoInputs[job.id],
                    applicationId: myAplicationId
                })
            if(request.status == 200){
                Swal.fire({
                    title:"Exito",
                    text:"¡Su aplicacion ha sido enviada!",
                    icon:"success"
                })
            }
        }catch(error){
             if (error.response?.status === 400) {
                Swal.fire("Error", "Datos inválidos", "error");
            } else if (error.response?.status === 404) {
                Swal.fire("Error", "Job no encontrado", "error");
            } else {
                Swal.fire("Error", "Error del servidor", "error");
            }
        }finally{
            stopLoading()
        }
    }
  return (
    <>  
        <div style={{maxWidth:'80%',margin:'auto'}}>
            <div className='d-flex justify-content-center'>

                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                        <th scope="col" className='text-center'>Título</th>
                        <th scope="col" className='text-center'>Url del repositorio</th>
                        <th scope="col" className='text-center'>Postulación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                                <tr key={job.id}>
                                    <td className='text-center'>{job.title}</td>
                                    <td className='text-center'>
                                        <input type="text" 
                                        placeholder='Tu Repositorio de Github'
                                        value={repoInputs[job.id] || ""}
                                        onChange={(e) => 
                                            setRepoInputs(prev => ({
                                                ...prev,
                                                [job.id]: e.target.value
                                            }))
                                        }
                                        />
                                    </td>
                                    <td className='text-center'>
                                        <button className='btn btn-primary'
                                        onClick={() => handleSubmit(job)}>
                                            Postularse
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}
