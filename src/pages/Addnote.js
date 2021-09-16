import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class Addnote extends Component {

    state = {
        name: '',
        category: '',
        date: '',
        desc: ''

    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveNote = async (e) => {
        e.preventDefault();

        const response = await axios.post(('http://127.0.0.1:8000/api/add-note'), this.state);

        if(response.data.status === 200) {
            console.log(response.data.message);
            this.setState({
                name: '',
                category: '',
                date: '',
                desc: '',
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Add Notes
                                        <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link> 
                                    </h3>

                                </div>
                                <div className="card-body">
                                    <form className="form-group mb-3" onSubmit={this.saveNote}> 
                                    
                                        <label>Note Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />

                                        <label>Note Category</label>
                                        <input type="text" name="category" onChange={this.handleInput} value={this.state.category} className="form-control" />

                                        <label>Note Reminder Date</label>
                                        <input type="date" name="date" onChange={this.handleInput} value={this.state.date} className="form-control" />

                                        <label>Note Description</label>
                                         <textarea className="form-control" name="desc" value={this.state.desc} onChange={this.handleInput} />

                                       <br /> <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Addnote;