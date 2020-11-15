import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Drawer from './Components/appDrawer'
import Login from './Components/Login'
import axios from 'axios'


function App() {


  // if (localStorage.getItem("noterToken")) {
  //   console.log(localStorage.getItem("noterToken"))
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8080/gotToken",
  //     data: {
  //       token: localStorage.getItem("noterToken")
  //     }
  //   }).then((response) => {
  //     console.log(response.body)
  //   })
  // }


  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Home" component={Drawer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
