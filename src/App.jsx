import { useState } from 'react'
import './styles/App.css'
import {Sidebar} from './components/Sidebar.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World!</h1>
    </>
  )
}

export default App
