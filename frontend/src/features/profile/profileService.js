import axios from 'axios'

const API_URL = '/api/user/profile/'

const createProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, profileData, config)

  return response.data
}

const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  console.log(response.data)
  return response.data
}

const updateProfile = async (profileId, profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + profileId, profileData, config)

  return response.data
}

const profileService = { createProfile, getProfile, updateProfile }
export default profileService