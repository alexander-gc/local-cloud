import { Container } from "react-bootstrap";
import { Dir } from "./components/Dir";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Container className='mt-3'>

        <Switch>

          <Route
            path="/content/:path?"
            component={(props) => <Dir key={props.match.params.path} {...props} />}
          />

          <Route path='/'>
            <Redirect to='/content/' />
          </Route>

        </Switch>

      </Container>
    </Router>
  )

}

export default App;

//render={(props) => <Dir key={props.match.params.path} {...props} />}

