import axios from 'axios'

const API_URL = '/api/job/apply/'

const createApply = async (applyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, applyData, config)

  return response.data
}

const getApply = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const applyService = { createApply, getApply }
export default applyService