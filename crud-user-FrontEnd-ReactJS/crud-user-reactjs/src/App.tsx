import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const [users, setUsers] = useState([])

  const fetchListUsers = async () => {
    const response = await axios.get("http://localhost:3000/list-users")
    setUsers(response.data)
    console.log(response.data)
  }

  const fetchCreateUser = async () => {
    await axios.post("http://localhost:3000/create-user",
      {
        name: "João do ReactJS",
        email: "joao@gmail.com"
      }
    ).catch(error => {
      console.log(error)
    })

  }

  const fetchUpdateUser = async () => {
    const response = await axios.put("http://localhost:3000/update-user/8",
      {
        name: "Atualizei João do ReactJS",
        email: "atualizei_joao@gmail.com"
      }
    )
  }

  const fetchDeleteUser = async () => {
    const response = await axios.delete(`http://localhost:3000/delete-user/${users[0].id}`)

  }

  useEffect(() => {
    fetchListUsers()

    fetchCreateUser()

    fetchUpdateUser()
  }, [])

  useEffect(() => {
    if (users) {

      // fetchDeleteUser()
    }

  }, [users])


  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {
        users.map((user: any) => {
          return (
            <div className="card" key={user.id}>
              <p>{user.name} - {user.email}</p>
            </div>
          )
        })}



      <h3>
        App de Listagem, criação, edição e deletar usuarios
      </h3>
      <div className="card">
        <button onClick={() => { }}>
          Quantidade de usuarios
        </button>
      </div>
    </>
  )
}

export default App
