import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Toast } from "react-bootstrap";

export default class ExercisesList extends Component {

    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {
            exercises: []
        }
    }


    componentDidMount() {
        const fetchData = async () => {
            return await fetch("http://localhost:5000/exercises")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        exercises: data
                    })
                });
        }
        fetchData();
    }

    exerciseList() {
        return this.state.exercises.map((exercise, index) => {
            return <Exercise exercises={ exercise } index={ index } key={ exercise._id }
                             deleteExercise={ this.deleteExercise }/>;
        })
    }

    deleteExercise(id) {
        const deleteData = async () => {
            return await fetch("http://localhost:5000/exercises/" + id, {method: "delete"})
                .then(response => {
                    this.setState({
                        exercises: this.state.exercises.filter(a => a._id !== id)
                    });
                })
                .catch(err => console.error(err));
        }
        deleteData();
    }

    render() {

        return (
            <div>
                {/*<ShowPopUp showValue={ true }/>*/}
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.exerciseList()
                    }
                    </tbody>
                </table>
            </div>
        );
    };
}

const Exercise = (props) => (
    <tr className={ props.exercises._id }>
        <th scope="row">{ props.index + 1 }</th>
        <td>{ props.exercises.username }</td>
        <td>{ props.exercises.description }</td>
        <td>{ props.exercises.duration }</td>
        <td>{ props.exercises.date.substring(0, 10) }</td>
        <td>
            <Link to={ "/edit/" + props.exercises._id }>edit</Link> | <a href="http://localhost:3000" onClick={ () => {
            props.deleteExercise(props.exercises._id)
        } }>delete</a>
        </td>
    </tr>
)


function ShowPopUp(props) {

    return <Toast show={ props.showValue } autohide animation={ true }>
        <Toast.Header>
            <strong className="mr-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>Exercise Deleted!</Toast.Body>
    </Toast>
}
