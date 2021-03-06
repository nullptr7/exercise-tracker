import React, { Component } from 'react';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    };

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        const submitUser = async () => {
            return await fetch("http://localhost:5000/users/add", requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }
        //console.log(fetchData);

        submitUser().catch(err => console.error('error', err));

        this.setState({
            username: ''
        })
    }


    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.username }
                               onChange={ this.onChangeUsername }/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}