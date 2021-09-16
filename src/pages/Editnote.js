import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class Editnote extends Component {

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

    async componentDidMount () {
        const note_id = this.props.match.params.id;
        // console.log(note_id);
        const response = await axios.get(`http://127.0.0.1:8000/api/edit-note/${note_id}`);

        if(response.data.status === 200) {
            this.setState({

                name: response.data.note.name,
                category: response.data.note.category,
                date: response.data.note.date,
                desc: response.data.note.desc,
            });
        }
    }

    updateNote = async (e) => {
        e.preventDefault();

        document.getElementById('updatebtn').disabled= true;
        document.getElementById('updatebtn').innerText= "Updating";

        const note_id = this.props.match.params.id;
        const response = await axios.put(`http://127.0.0.1:8000/api/update-note/${note_id}`, this.state);

        if(response.data.status === 200) {
            // console.log(response.data.message);
            document.getElementById('updatebtn').disabled= false;
            document.getElementById('updatebtn').innerText= "Update Note";
           
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
                                    <h3>Edit Note
                                        <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link> 
                                    </h3>

                                </div>
                                <div className="card-body">
                                    <form className="form-group mb-3" onSubmit={this.updateNote}> 
                                    
                                        <label>Note Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />

                                        <label>Note Category</label>
                                        <input type="text" name="category" onChange={this.handleInput} value={this.state.category} className="form-control" />

                                        <label>Note Reminder Date</label>
                                        <input type="date" name="date" onChange={this.handleInput} value={this.state.date} className="form-control" />

                                        <label>Note Description</label>
                                         <textarea className="form-control" name="desc" value={this.state.desc} onChange={this.handleInput} />

                                       <br /> <button type="submit" id="updatebtn" className="btn btn-primary">Update Note</button>
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

export default Editnote;