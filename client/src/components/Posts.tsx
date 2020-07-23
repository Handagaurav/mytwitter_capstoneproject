import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createPost, deletePost, getPublicPosts, patchPost } from '../api/posts-api'
import Auth from '../auth/Auth'
import { Post } from '../types/Post'

import Count from './Count';

interface PostsProps {
  auth: Auth
  history: History
}

interface PostsState {
  count: number
  posts: Post[]
  newPostName: string
  isPublic: string
  loadingPosts: boolean
}

export class Posts extends React.PureComponent<PostsProps, PostsState> {
  state: PostsState = {
    count: 0,
    posts: [],
    newPostName: '',
    isPublic: 'false',
    loadingPosts: true
  }


  async componentDidMount() {
    try {
      const posts = await getPublicPosts(this.props.auth.getIdToken())
      console.log("posts: " + posts)
      this.setState({
        posts,
        loadingPosts: false
      })
    } catch (e) {
      alert(`Failed to fetch posts: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">TWEETS</Header>
        {this.renderTodos()}
      </div>
    )
  }

  renderTodos() {
    if (this.state.loadingPosts) {
      return this.renderLoading()
    }

    return this.renderTodosList()
  }

  increment = (increment: number) => {
    this.setState({
      count: (this.state.count + 1)
    });
  };

  decrement = (decrement: number) => {
    this.setState({
      count: (this.state.count - 1)
    });
  };

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TWEETS
        </Loader>
      </Grid.Row>
    )
  }

  renderTodosList() {
    return (
      <Grid padded>
        {this.state.posts.map((post, pos) => {
          return (
            <Grid.Row key={post.postId}>
              <Grid.Column width={16} verticalAlign="middle">
                <b>{post.caption}</b>
              </Grid.Column>

              <div>
                <Count count={this.state.count} />
                  <Grid.Column width={1} floated="right">
                    <Button
                      icon
                      color="blue"
                      onClick={() => this.increment(post.increment)}
                    >
                      <Icon name="pencil" />Like
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={1} floated="left">
                    <Button
                      icon
                      color="red"
                      onClick={() => this.decrement(post.decrement)}
                    >
                      <Icon name="stop" />Dislike
                    </Button>
                  </Grid.Column>
              </div>
              <Divider />
            </Grid.Row>
            
          )
        })}
      </Grid>
    )
  }
}