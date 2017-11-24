import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

// import Home from './Home'
// import loadHome from 'bundle-loader?lazy!./Home'
const loadHome = require('bundle-loader?lazy!./Home')


class Content extends React.Component<{}, {}> {

    componentDidMount() {
        loadHome(() => {})
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>
                    <hr />
                    <Route exact path="/" component={HomeAsync} />
                    <Route path="/about" render={() => <div>About</div>} />
                    <Route path="/topics" render={() => <div>Topics</div>} />
                </div>
            </Router>
        )
    }
}

const HomeAsync = (props: any) => (
    <Bundle load={loadHome}>
        {(Home: any) => <Home {...props} />}
    </Bundle>
)

class Bundle extends React.Component<any, any> {

    state = {
        mod: null as any
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props: any) {
        this.setState({
            mod: null as any
        })
        props.load((mod: any) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.state.mod ? (this.props.children as any)(this.state.mod) : <div>dfgh</div>
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById('content')
)
