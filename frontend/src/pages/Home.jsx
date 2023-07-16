import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Welcome from '../assets/welcome.jpg'
import Image from 'react-bootstrap/Image'
import { FaHome } from 'react-icons/fa'

function Home() {
  const navigate = useNavigate()

  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    if (user) {
      navigate('/dashboard')
    }

  }, [user, navigate ])

  return (
    <>
    <section className='heading'>
        <h1>
          <FaHome /> Welcome
        </h1>
      </section>
      <div className='content'>
        <div className='item'>
            <p>Let's Kick Start your Career with InternHub</p>
        </div>
        <div className='img'>
          <Image src={Welcome} rounded responsive/>
       </div>
       </div>
    </>
  )
}

export default Home