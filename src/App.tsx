import { Header } from './components/Header'
import { useReducer, useMemo, useEffect } from 'react'
import './App.css'
import { GuitarT } from './types'
import { Guitar } from './components/Guitarr'
import { cartReducer, initialState } from './reducers/CartReducer'

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const isEmpty = useMemo(() => state.cart.length === 0, [state.cart])
  const totalCart = useMemo(()=> state.cart.reduce((total, item) => total + (item.quantity * item.price), 0), [state.cart])

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} isEmpty={isEmpty} totalCart={totalCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {state.data.map((guitar:GuitarT)=> (
            <Guitar guitar={guitar} key={guitar.id} dispatch={dispatch}/>
          ))}
        </div>
        
      </main>
    </>
  )
}

export default App
