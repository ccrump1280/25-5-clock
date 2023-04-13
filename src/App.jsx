import './App.scss'
import LengthControls from './LengthControls'
import Timer from './Timer'

function App() {
  return (
    <div id="container">
      <div id="App">
        <h1>25 + 5 Clock</h1>
        <LengthControls />
        <Timer />
      </div>
    </div>
  )
}

export default App
