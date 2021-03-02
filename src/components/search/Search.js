import React, { Component } from 'react';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import BarraNavegacao from '../navbar/Navbar';
import { withRouter } from 'react-router';
import './Search.scss';

class GithubUserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    handleChange = async (e) => {
        const value = e.target.value;
        await this.setState(() => { return { search: value }; });
    }

    render = () => {
        return (
            <div>
                <BarraNavegacao/>
                <Container>
                    <Form action={`/detail/${this.state.search}`}>
                        <div className='row'>
                            <FormGroup className='col-md-8 search'>
                                <Label>Search for Github users</Label>
                                <Input className='inner-input' type='text' value={this.state.search} onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default withRouter(GithubUserSearch);