import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserCircle } from 'react-icons/fa'
import { createProfile, getProfile, updateProfile, reset } from '../features/profile/profileSlice'
import Spinner from '../components/Spinner'

function Applied() {

    const { user } = useSelector((state) => state.auth)

  return (
    <>
     {user ? (
  user.type === 'recruiter' ? (
    <>
      <section className='heading'>
        <h1>
          <FaUserCircle /> Applied
        </h1>
      </section>

      <section className='form'>
      <div className='item'>
      <div>{new Date().toLocaleString('en-US')}</div>
      <form>
        <h2></h2>
        <p>Stipend:</p>
        <p>Email: </p>
        <p>Mobile: </p>
        <p>Description: </p>
        <p>Skills: </p>
        <p>Links: </p>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Assign
          </button>
        </div>
      </form>
    </div>
      </section>
    </>
  ) : (
    window.location.href = '/'
  )
) : (
  window.location.href = '/'
)}
    </>
    
  )
}

export default Applied