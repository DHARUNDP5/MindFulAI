import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserCircle } from 'react-icons/fa'
import { createProfile, getProfile, updateProfile, reset } from '../features/profile/profileSlice'
import Spinner from '../components/Spinner'

function Profile() {
  const [formData, setFormData] = useState({
    mobile: '',
    email: ''
  })

  const { mobile, email } = formData
  const [skills, setItems] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [links, setLinks] = useState([])
  const [linkValue, setLinkValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )

  const { profile, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.profile
  )

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
       //dispatch(getProfile())

    //     if (profile) {
    //       const { mobile, email, skills, links } = profile
    //       setFormData({ mobile, email })
    //       setItems(skills)
    //       setLinks(links)
    //    }
    
    

    if (isError) {
      toast.error(message)
    }

    return () => {
        dispatch(reset())
      }

  }, [ isError, message, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...skills, inputValue])
      setInputValue('')
    }
  }

  const handleCancelLink = (index) => {
    const updatedLinks = [...links]
    updatedLinks.splice(index, 1)
    setLinks(updatedLinks)
  }

  const handleLinkChange = (e) => {
    setLinkValue(e.target.value)
  }

  const handleAddLink = () => {
    if (linkValue.trim() !== '') {
      setLinks([...links, linkValue])
      setLinkValue('')
    }
  }

  const handleCancelItem = (index) => {
    const updatedItems = [...skills]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const profileData = {
      mobile,
      email,
      skills,
      links
    }

    if (!profile) {
    const profileId = profile._id
      dispatch(updateProfile(profileId, profileData))
    } else {
      dispatch(createProfile(profileData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
     {user ? (
  user.type === 'student' ? (
    <>
      <section className='heading'>
        <h1>
          <FaUserCircle /> Profile
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='mobile'
              name='mobile'
              value={mobile}
              placeholder='Enter your mobile'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='skills'>Skills</label>
            <input
              type="text"
              name="skills"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className='btn' type='button' onClick={handleAddItem}>Add</button>
            <ul>
              {skills.map((item, index) => (
                <li key={index}>
                  {item}{' '}
                  <button className='btn' type='button' onClick={() => handleCancelItem(index)}>Cancel</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='form-group'>
            <label htmlFor='skills'>Links</label>
            <input
              type="text"
              name="links"
              value={linkValue}
              onChange={handleLinkChange}
            />
            <button className='btn' type='button' onClick={handleAddLink}>Add</button>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  {link}{' '}
                  <button className='btn' type='button' onClick={() => handleCancelLink(index)}>Cancel</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
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

export default Profile