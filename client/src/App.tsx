import { BrowserRouter as Router, Route } from 'react-router-dom'
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'

const App = (): JSX.Element => {
    return (
        <Router>
            <Route exact path="/" component={Join}></Route>
            <Route path="/chat" component={Chat}></Route>
        </Router>
    )
}

export default App
