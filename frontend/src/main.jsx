import ReactDom from "react-dom/client";
import App from "./App";
import './index.css'
import AppProvider from "./Context/UserContext";

ReactDom.createRoot(document.getElementById('root')).render(
<AppProvider>
 <App/>
 </AppProvider>
)
