import React, { useContext, useEffect, useState } from 'react'
import { TableComponent } from '../component/TableComponent'
import { LoadingContext } from '../context/LoadingContext'
import axios from 'axios'
import Swal from 'sweetalert2'

export const HomePage = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const ENDPOINT = BASE_URL +  import.meta.env.VITE_GET_JOBS_ENDPOINT
    const {startLoading, stopLoading} = useContext(LoadingContext)
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        
        const fetchData = async () => {

            try{
                startLoading()
                const response = await axios.get(ENDPOINT)
                const gettedJobs = response.data
                setJobs(gettedJobs)
                
            }catch(error){
                Swal.fire({
                   title: "Error",
                   text: error.response?.data?.message || error.response?.data || error.message,
                   icon: "error"
                   }); 
    
            }finally{
                stopLoading()
            }
        }
        fetchData()
    },[])
  return (
    <>
    <div  style={{backgroundColor:"#F8F9FA"}}>
     <h1 className='text-center mb-3 mt-3'>Bienvenido al Challenge de Nimble Gravity</h1>
     <h3 className='text-center mb-3'>Por favor Selecciona agrega el repositorio para el trabajo al que deseas postular</h3>
        <div>
            <TableComponent jobs={jobs}/>
        </div>
    </div>
    </>
  )
}
