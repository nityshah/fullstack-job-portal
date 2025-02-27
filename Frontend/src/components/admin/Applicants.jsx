import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();


  const {applicants} = useSelector(store => store.application)
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
          const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
          console.log(res);
          if(res.data.success) 
          {
            // console.log("inside");
            dispatch(setAllApplicants(res.data.job.applications));
          }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  },[]);
  console.log(applicants);
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto '>
            <h1 className='font-bold text-xl my-5'> Applicants ({applicants?.length}) </h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants