import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { marked } from 'marked'
import 'react-toastify/dist/ReactToastify.css'
import { createApply, reset} from '../features/apply/applySlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Recommend({ job }) {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')

  const renderDescription = () => {
    return { __html: marked(job.description) }
  }
  const { apply, isLoading, isError, message } = useSelector(
    (state) => state.apply
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
    return () => {
      dispatch(reset())
    }
  }, [apply, isError, message, dispatch])

  const handleApply = (e) => {
    e.preventDefault()

    const applyData = {
        description,
        job:job._id
    }
    dispatch(createApply(applyData))

    setDescription('')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='item'>
      <div>{new Date(job.createdAt).toLocaleString('en-US')}</div>
      <form onSubmit={handleApply}>
        <h2>{job.name}</h2>
        <div className='form-group' dangerouslySetInnerHTML={renderDescription()} />
        <p>Stipend: {job.stipend}</p>
        <p>Skills: {job.skills.join(', ')}</p>
        <div className='form-group'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter your message to recruiter'
            required
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}

export default Recommend
