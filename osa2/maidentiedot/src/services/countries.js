import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const allUrl = `${baseUrl}/all`
const nameBaseUrl = `${baseUrl}/name`

const mapData = response => response.data

const getAll = () => axios.get(allUrl)
  .then(mapData)

const getCountry = name => axios.get(`${nameBaseUrl}/${name}`)
  .then(mapData)

export default {
  getAll,
  getCountry
}
