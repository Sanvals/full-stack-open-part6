import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnedote = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (id) => {
    const getById = await axios.get(`${baseUrl}/${id}`)
    const object = {
        content: getById.data.content,
        id: id,
        votes: getById.data.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response.data
}

export default { getAll, createAnedote, voteAnecdote }