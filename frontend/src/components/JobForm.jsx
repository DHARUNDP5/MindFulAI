import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createJob } from '../features/jobs/jobSlice'
import { marked } from 'marked'

function JobForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stipend: '',
  })

  const [description, setMarkdown] = useState('')
  const { name, stipend } = formData
  const [inputValue, setInputValue] = useState('')
  const [skills, setItems] = useState([])

  const handleInputChangeMarkDown = (e) => {
    setMarkdown(e.target.value)
  }

  const getMarkdownHtml = () => {
    return { __html: marked(description) }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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

  const handleCancelItem = (index) => {
    const updatedItems = [...skills]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createJob({ 
      name,
      description,
      stipend,
      skills
     }))
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
        <label htmlFor='description'>Description</label>
      <textarea
        rows={10}
        value={description}
        type='text'
        name='description'
        id='description'
        onChange={handleInputChangeMarkDown}
        placeholder="Enter Markdown text..."
      />
      <div className="content" dangerouslySetInnerHTML={getMarkdownHtml()} />
    </div>
        <div className='form-group'>
          <label htmlFor='stipend'>Stipend</label>
          <input
            type='number'
            name='stipend'
            id='stipend'
            value={stipend}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
        <label htmlFor='skills'>Skills</label>
          <input 
          type="text" 
          name="skills"
          value={inputValue} 
          onChange={handleInputChange} />
          <button className='btn' type='button' onClick={handleAddItem}>Add</button>
              <ul>
                {skills.map((item, index) => (
                  <li key={index}>
                    {item}{' '}
                    <button className='btn' type='button'  onClick={() => handleCancelItem(index)}>Cancel</button>
                  </li>
                ))}
              </ul>
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Submit Job
          </button>
        </div>
      </form>
    </section>
  )
}

export default JobForm