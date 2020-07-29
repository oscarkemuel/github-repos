import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import {
  Container, Loading, Main, Infos,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repo: { },
    langs: { },
    loading: true,
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [response, languages] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/languages`),
    ]);

    this.setState({
      repo: response.data,
      loading: false,
      langs: languages.data,
    });
  }

  formatDate = (data) => `${data.slice(8, 10)}/${data.slice(5, 7)}/${data.slice(0, 4)} - ${data.slice(11, 19)}`

  formatLanguage = (obj) => Object.keys(obj)

  render() {
    const { repo, loading, langs } = this.state;

    if (loading) {
      return (
        <Loading loading={loading.toString()}>
          <FaSpinner color="#FFF" size={40} />
        </Loading>
      );
    }

    return (
      <Container>
        <Main>
          <Link to="/github-repos" className="link-button"><FaArrowLeft size={15} />VOLTAR</Link>
          <a
            className="link-button"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          > REPOSITORIO
          </a>
          <h1>{repo.name}</h1>
          <p>{repo.description || '---no description---'}</p>
          <a
            className="link-owner"
            href={repo.owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
          > {repo.owner.login}
          </a>
        </Main>

        <Infos>
          <p>Linguagens usadas:</p>
          { !repo.language ? <p>---no language---</p> : <></> }
          { this.formatLanguage(langs).map((lang) => (
            <p key={String(lang)}> {lang} </p>
          ))}
        </Infos>

        <Infos>
          <p>Criado: {this.formatDate(repo.created_at)}</p>
          <p>Push: {repo.pushed_at ? this.formatDate(repo.pushed_at) : '---no pushed---'}</p>
          <p>Atualizado: {this.formatDate(repo.updated_at)}</p>
        </Infos>

        <Infos>
          <p>Licença: {repo.license ? repo.license.name : '---no license--'}</p>
          <p>Inscritos: {repo.subscribers_count}</p>
        </Infos>

      </Container>
    );
  }
}
