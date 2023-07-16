import axios from 'axios'

const API_URL = '/api/jobs/'

const createJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, jobData, config)

  return response.data
}

const getJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + jobId, config)

  return response.data
}

const updateJob = async (jobId, jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + jobId, jobData, config)

  return response.data
}

const completeJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'completed/' + jobId, config)

  return response.data
}

const recommendJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'recommend', config)

  return response.data
}

const assignedJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'assigned', config)

  return response.data
}

const jobService = { createJob, getJobs, updateJob, deleteJob, completeJob, recommendJobs, assignedJobs }
export default jobService