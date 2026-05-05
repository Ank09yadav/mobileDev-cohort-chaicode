import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  // understanding the useEffect and useState hooks 
  const [dark, setDark] = useState(false);
   const styleSheet = {
    backgroundColor: dark? "black" : 'white',
    color: dark? 'white' : 'black',
    width:"100vb",
    height:"100vh"
   }
   
  return (
   
    <div style={styleSheet}>
     <h1>hello this is day 1</h1>
      <button onClick={()=> setDark(!dark)} > { dark? "Dark Mode" : "Light Mode"}</button>
    </div>
  )
}

export default App
