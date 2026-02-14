import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Console Easter Egg
const citiLearnAscii = `
       learnlea
     learnlearnlearn
   learnlearnlearnlear
  learn           lear
 learn
 learn
 learn
 learn
  learn           lear
   learnlearnlearnlear
     learnlearnlearn
       learnlea

   ______ _ _   _ _                           
  / ____(_) | (_) |                          
 | |     _| |_ _| |     ___  __ _ _ __ _ __  
 | |    | | __| | |    / _ \\/ _\` | '__| '_ \\ 
 | |____| | |_| | |___|  __/ (_| | |  | | | |
  \\_____|_|\\__|_|______\\___|\\__,_|_|  |_| |_|
                                             
`;

console.log(`%c${citiLearnAscii}`, 'color: #00A4EF; font-weight: bold;');
console.log('%c🎓 Passionate about education?', 'font-size: 14px; font-weight: normal; color: #fff;');
console.log('%c💙 Come learn at CitiLearn(Citilink Learning)!', 'font-size: 14px; font-weight: normal; color: #fff;');
console.log('%c🚀 https://citilearn.citilink.co.id', 'font-size: 14px; font-weight: bold; color: #00A4EF; text-decoration: underline;');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
