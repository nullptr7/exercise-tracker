import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // right before anything loads on the screen react calls this.
    componentDidMount() {

        const fetchAllExercises = async () => {
            return await fetch("http://localhost:5000/users")
                .then(response => response.json())
                .then(d => {
                    //console.log('users', d);
                    return d;
                });
        };
        fetchAllExercises().then(data => {
            this.setState({
                users: data
            })

            //console.log(data);
        });
        this.setState({
            username: 'test user'
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    };

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    };

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    };

    onChangeDate(date) {
        this.setState({
            date: date
        })
    };

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exercise)
        };

        const submitUser = async () => {
            return await fetch("http://localhost:5000/exercises/add", requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }

        submitUser().catch(err => console.error('error', err));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create new exercise log</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={ this.state.username }
                                onChange={ this.onChangeUsername }>
                            {

                                this.state.users.map(function (user) {
                                    return <option
                                        key={ user._id }
                                        value={ user.username }>{ user.username }
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.description }
                               onChange={ this.onChangeDescription }
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.duration }
                               onChange={ this.onChangeDuration }
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={ this.state.date } onChange={ this.onChangeDate }/>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>

            </div>


        );
    }

}