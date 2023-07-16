import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import JobForm from '../components/JobForm'
import Job from '../components/Job'
import Spinner from '../components/Spinner'
import { getJobs, reset } from '../features/jobs/jobSlice'
import { recommendJobs } from '../features/jobs/jobSlice'
import Recommend from '../components/Recommend'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

   const { user } = useSelector((state) => state.auth)
  const { recommend, jobs, isLoading, isError, message } = useSelector(
    (state) => state.jobs
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }

    if(user.type === 'student'){
      dispatch(recommendJobs())
      console.log(recommend)
    }

    if(user.type === 'recruiter'){dispatch(getJobs())}
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Jobs Dashboard</p>
      </section>

      {user ? (
  user.type === 'recruiter' ? (
    <>
      <JobForm />

      <section className='heading'>
        <p>Created Jobs</p>
      </section>
      <section className='content'>
        {jobs.length > 0 ? (
          <div className='items'>
            {jobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <h3>No Previous Jobs Found</h3>
        )}
      </section>
    </>
  ) : (
    <>
      <section className='heading'>
      <p>Recommended Jobs</p>
      </section>
      <section className='content'>
        {recommend.length > 0 ? (
          <div className='items'>
            {recommend.map((job) => (
              <Recommend key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <h3>No Recommended Jobs Found</h3>
        )}
      </section>
    </>
  )
) : (
  window.location.href = '/'
)}



    </>
  )
}

export default Dashboard