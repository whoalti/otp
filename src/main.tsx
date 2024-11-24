import { createRoot } from 'react-dom/client'
import './index.css'
import {MultipleInputs} from './multipleInputs'
import {SingleInput} from './singleInput'

createRoot(document.getElementById('root')!).render(
  <>
  <MultipleInputs cellNum={6}/>
  <SingleInput />
  </>
)
