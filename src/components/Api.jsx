import React, { Component } from "react";
import http from "../services/HttpService";
import config from "../config.json";
class Api extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    const newPost = posts.slice(0, 5);
    this.setState({ posts: newPost });
  }
  handleAdd = async () => {
    const obj = { title: "Durgesh" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put(config.apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleDelete = async post => {
    const originalState = [...this.state.posts];
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete("s" + config.apiEndpoint + "/" + post.id);
    } catch (ex) {
      console.log("catch block is running");
      if (ex.response && ex.response.status === 404) {
        alert("this post is already deleted");
      }

      this.setState({ posts: originalState });
    }
  };
  render() {
    const { posts } = this.state;

    console.log(posts);
    return (
      <div className="container">
        <div className="row">
          <h1 className="col l12">Api</h1>
          <button onClick={this.handleAdd} className="btn btn-primary btn-sm">
            Add
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => this.handleUpdate(p)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.handleDelete(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Api;
