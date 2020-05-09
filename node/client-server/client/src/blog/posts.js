import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as ACTIONS from '../store/actions/actions';

const RenderPost = post => (
    <TableRow>
        <TableCell>
            <Link to={{ pathname: '/post/' + post.post.pid, state: { post } }}>
                <h4>{post.post.title}</h4>
            </Link>
            <br />
            <p>{post.post.body}</p>
        </TableCell>
    </TableRow>
);

class Posts extends Component {
    componentDidMount() {
        axios.get('/api/get/allposts')
            .then(res => this.props.set_posts(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (<div>
            <Link to='/addpost'>
                <Button color='primary'>Add Post</Button>
            </Link>
            <br />
            <h1>Posts</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.posts
                    ? this.props.posts.map(post =>
                        <RenderPost key={post.pid} post={post} />)
                    : null
                    }
                </TableBody>
            </Table>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts_reducer.posts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_posts: (posts) => dispatch(ACTIONS.fetch_db_posts(posts)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
