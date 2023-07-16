import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteJob, updateJob } from '../features/jobs/jobSlice'
import { toast } from 'react-toastify'
import {marked }from 'marked'
import 'react-toastify/dist/ReactToastify.css'

function Job({ job }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [jobData, setUpdatedJob] = useState(job)
  const dispatch = useDispatch()

  const handleActions = () => {
    setShowConfirmation(!showConfirmation)
    setUpdatedJob(job)
  }

  const handleUpdate = () => {
    const jobId = job._id
    dispatch(updateJob(jobId, jobData))
      .unwrap()
      .then(() => {
        setShowConfirmation(false)
        toast.success('Job updated successfully!')
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to update job')
      })
  }

  const handleConfirmDelete = () => {
    dispatch(deleteJob(job._id))
      .unwrap()
      .then(() => {
        setShowConfirmation(false)
        toast.success('Job deleted successfully!')
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to delete job')
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedJob((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const renderDescription = () => {
    return { __html: marked(jobData.description) }
  }

  return (
    <div className='item'>
      <div>{new Date(job.createdAt).toLocaleString('en-US')}</div>
      {showConfirmation ? (
        <form>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={jobData.name}
            onChange={handleChange}
          />
          <br />
          <label>Description:</label>
          <textarea
            name='description'
            value={jobData.description}
            onChange={handleChange}
          />
          <br />
          <label>Stipend:</label>
          <input
            type='text'
            name='stipend'
            value={jobData.stipend}
            onChange={handleChange}
          />
          <br />
          <label>Skills:</label>
          <input
            type='text'
            name='skills'
            value={jobData.skills}
            onChange={handleChange}
          />
        </form>
      ) : (
        <>
          <h2>{job.name}</h2>
          <div className='form-group' dangerouslySetInnerHTML={renderDescription()}
          />
          <p>Stipend: {job.stipend}</p>
          <p>Skills: {job.skills.join(', ')}</p>
        </>
      )}
      <button onClick={handleActions} className='close'>
        {showConfirmation ? 'Cancel' : 'Edit/Delete'}
      </button>

      {showConfirmation && (
        <div className=''>
          <p>Are you sure you want to modify this job?</p>
          <button className='btn' onClick={handleUpdate}>
            Update
          </button>
          <button className='btn' onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Job