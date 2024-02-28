// Importando Input MASKS da biblioteca iMask  
// npm install react-imask
import { IMaskInput } from "react-imask"

import {FiSearch} from "react-icons/fi"
import { useState } from "react"
import api from "./services/api"
import './App.css'

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState("")

  const handleClick = async () => {

    if(input === ""){
      alert("Preenchar o CEP!")
      return
      
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CEP! ")
      setInput("")
    }
  }

  return (

    <div className="app">
      <div className="container">

        
        <h1 className="title">Buscador de CEP</h1>
        <div className="inputCep">
          <IMaskInput mask="00000-000" type="text" placeholder='Digite um CEP' value={input} onChange={(e)=>{setInput(e.target.value)}}/><FiSearch fontSize={25} onClick={handleClick}/>
        </div>

        {cep && (
          <main>
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade}</span>
          </main>
        )}

      </div>
    </div>
  )
}

export default App
