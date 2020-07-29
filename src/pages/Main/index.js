import React, { Component } from 'react';
import {
  FaSearch, FaGithub, FaSpinner, FaExclamationTriangle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import {
  Header, Form, SubmitButton, UserInfo, Infos, ListRepo,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    userInfo: {},
    repositories: [],
    loading: false,
    err: false,
  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    const repos = localStorage.getItem('repos');

    if (user || repos) {
      this.setState({
        userInfo: JSON.parse(user),
        repositories: JSON.parse(repos),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { userInfo, repositories } = this.state;

    if ((prevState.userInfo !== userInfo) || (prevState.repositories !== repositories)) {
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('repos', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newUser: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ err: false, loading: true });

    const { newUser } = this.state;

    try {
      const [responseUser, responseRepos] = await Promise.all([
        api.get(`/users/${newUser}`),
        api.get(`/users/${newUser}/repos`),
      ]);

      this.setState({
        repositories: responseRepos.data,
        userInfo: {
          name: responseUser.data.login,
          avatar: responseUser.data.avatar_url,
          url: responseUser.data.html_url,
        },
        newUser: '',
        loading: false,
        err: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        err: true,
        newUser: '',
        userInfo: {},
        repositories: [],
      });
    }
  }

  render() {
    const {
      newUser, loading, userInfo, repositories, err,
    } = this.state;

    return (
      <>
        <Header>
          <h1><FaGithub color="#FFF" /> Listagem de repositórios</h1>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Digite o usuário"
              value={newUser}
              onChange={this.handleInputChange}
            />
            <SubmitButton loading={loading.toString()}>
              { loading ? (
                <FaSpinner size={14} />
              ) : (
                <FaSearch size={14} />
              )}
            </SubmitButton>
          </Form>
        </Header>

        <Infos loading={loading.toString()} err={err}>
          {err ? (
            <>
              <FaExclamationTriangle size={30} color="salmon" />
              <h2>Falha ao encontrar usuário</h2>
            </>
          ) : <></>}
          { (loading && !err) ? (
            <FaSpinner size={30} color="#FFF" />
          ) : (
            <>
              <UserInfo>
                <p>{userInfo.name}</p>
                <img src={userInfo.avatar} alt={userInfo.name} />
                <a
                  className="link"
                  href={userInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >{userInfo.name}
                </a>
              </UserInfo>

              <ListRepo>
                {repositories.map((repo) => (
                  <li key={repo.name}>
                    {repo.name}
                    <p>{repo.description || '---'}</p>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >GITHUB REPOSITÓRIO
                    </a>
                    <br />
                    <Link to={`/repository/${encodeURIComponent(repo.full_name)}`}>
                      MAIS DETALHES
                    </Link>
                  </li>
                ))}
              </ListRepo>

            </>
          )}
        </Infos>
      </>
    );
  }
}
