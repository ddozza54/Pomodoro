import { RecoilRoot } from 'recoil'
import { Reset } from 'styled-reset'
import Pomodoro from './components/Pomodoro'

//Using Recoil, Styled Components and Motion build 
function App() {


  return (
    <>
      <RecoilRoot>
        <Reset />
        <Pomodoro />
      </RecoilRoot>

    </>
  )
}

export default App
