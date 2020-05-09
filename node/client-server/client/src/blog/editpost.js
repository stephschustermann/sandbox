import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import history from '../utils/history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.location.state.post.post.title,
            body: this.props.location.state.post.post.body,
        })
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    handleBodyChange = (event) => {
        this.setState({ body: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uid = this.props.db_profile[0].uid;
        const username = this.props.db_profile[0].username;
        const pid = this.props.location.state.post.post.pid;
        const title = event.target.title.value;
        const body = event.target.body.value;

        const data = {
            title,
            body,
            pid,
            uid,
            username,
        };
        axios.put('/api/put/posts', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .then(setTimeout(() => history.replace('/profile'), 700));
    }

    render () {
        return (<div>
            <form onSubmit={this.handleSubmit}>
                <TextField id='title' label='title' margin='normal' value={this.state.title} onChange={this.handleTitleChange} />
                <TextField id='body' label='body' margin='normal' multiline rows='4' value={this.state.body} onChange={this.handleBodyChange} />
                <Button type='submit'>Submit</Button>
            </form>
            <Button onClick={() => history.goBack()}>Cancel</Button>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        db_profile: state.auth_reducer.db_profile,
    }
}

export default connect(mapStateToProps)(EditPost);
