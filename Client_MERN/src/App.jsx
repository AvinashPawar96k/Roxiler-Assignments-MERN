import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductTable from './Components/product.table'
import ProductStatistics from './Components/Procucts.Statatics'
import ProductBarChart from './Components/Product.barchart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductTable />
      <hr />
      <ProductStatistics />
      <hr />
      <ProductBarChart />
    </>
  )
}

export default App
