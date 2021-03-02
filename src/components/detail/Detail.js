import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'reactstrap';
import BarraNavegacao from '../navbar/navbar';
import Api from '../../Api';
import './Detail.scss';

export default class GithubUserDetail extends Component {

    attrs = ['name', 'login', 'html_url', 'followers', 'following', 'company', 'created_at', 'updated_at'];
    tableAttrs = ['name', 'description'];

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            repositories: [],
        };
    }

    async componentDidMount() {
        const user = this.props.match.params.user;
        await Api.get(user).then(res => {
            this.setState(() => {
                return { data: res.data };
            });
        });
    }

    verifyDate = (str) => {
        if (isNaN(str) && !isNaN(Date.parse(str))) {
            return new Date(str).toLocaleString('en-US');
        }
        return str;
    }

    handleClick = async (e) => {
        const parameter = e.target.id;
        const user = this.props.match.params.user;
        await Api.get(`${user}/${parameter}`).then(res => {
            this.setState(() => {
                return { repositories: res.data };
            });
        });
    }

    listRepos = () => {
        const repositories = this.state.repositories;
        return repositories.length > 0 ? (
            <div className={'container-detail'}>
                <h3 className={'title'}> User repos </h3>
                <Table striped responsive>
                    <thead>
                        <tr>
                            {this.tableAttrs.map((attr, index) =>  
                                <th key={index}>{this.toTitleCase(attr)}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {repositories.map((field, index) => (
                            <tr key={index}>
                                {this.tableAttrs.map((attr, i) =>  
                                    <td key={i}>{field[attr] ? this.verifyDate(field[attr]) : 'Uninformed'}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        ) : null;
    }

    toTitleCase = (str) => {
        return str.replace(/\w[A-z]*/, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }).replace('_', ' ');
    }

    render = () => {
        const userData = this.state.data;
        return (
            <>
                <BarraNavegacao/>
                <div className={'container-detail'}>
                    {userData ? 
                        <div>
                            <h3 className={'title'}> User detail </h3>
                            <div className={'underline'}/>
                            <div className={'div-rows'}>
                                <Row xs={12} md={6} xl={4}>
                                    {this.attrs.map((attr, index) => (
                                        <Col xs={6} md={3} key={index}>
                                            <Col> 
                                                <label>
                                                    <strong>{this.toTitleCase(attr)}</strong>
                                                </label>
                                            </Col>
                                            <Col className={'values'}>
                                                <label>
                                                    {userData[attr] ? this.verifyDate(userData[attr]) : 'Uninformed'}
                                                </label>
                                            </Col>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            <div className={'underline'}/>
                            <div className={'buttons'}>
                                <Button color={'primary'} size={'md'} id={'repos'} onClick={this.handleClick}>repos</Button>
                                &nbsp;
                                <Button color='secondary' size={'md'} id={'starred'} onClick={this.handleClick}>starred</Button>
                            </div>
                        </div>
                        :
                        <h3 className={'title justify'}> User not found!! </h3>
                    }
                    {this.listRepos()}
                </div>
            </>
        )
    }
}