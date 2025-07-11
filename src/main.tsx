import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
// index.tsx or main.tsx
document.documentElement.classList.add('dark');
