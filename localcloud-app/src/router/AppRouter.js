import React from 'react'
import { Container } from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { Dir } from '../components/Dir';

export const AppRouter = () => {
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
