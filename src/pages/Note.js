import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class Note extends Component {

    state = {
        note: [],
        loading:true,
    }
   
   async componentDidMount () {
       const response = await axios.get('http://127.0.0.1:8000/api/notes');
        // console.log(response);
          if(response.data.status === 200) {
              this.setState({
                  note: response.data.note,
                  loading: false,
              });
          }
   }

   deleteNote = async (e, id) => {

        const deleteing = e.currentTarget;
        deleteing.innerText = "Deleting";

       const response = await axios.delete(`http://127.0.0.1:8000/api/delete-note/${id}`);

       if(response.data.status === 200) {
        deleteing.closest(".note-holder").remove();
           console.log(response.data.message);
       }
   }
   
    render() {
        const mystyle = {
            width: "18rem",
            flex: "1 1 auto",
            minheight: "1px",
            padding: "1.25rem"
          };

          var note_values = "";

          if(this.state.loading) {
            note_values = <tr><td colSpan="7"><h2>Loading ...</h2></td></tr>;
            
          } else {
            //   console.log(this.state.note);
             note_values = this.state.note.map((item) => {
                
                // console.log('kkkk');
                // console.log(item);
                return (                

                    // <tr key={item.id}>
                    //     <td>{item.id}</td>
                    //     <td>{item.name}</td>
                    //     <td>{item.category}</td>
                    //     <td>{item.date}</td>
                    //     <td>{item.desc}</td>
                    //     <td>
                    //         <Link to={`edit-note/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    //         <button type="button" className="btn btn-primary btn-sm" onClick={(e) => this.deleteNote(e, item.id)}>Delete</button>
                    //     </td>
                    // </tr>
                    <div className="col-sm-6 col-md-3 note-holder">
                                <div hidden>{item.id}</div>
                                <div className="">
                                    <div className="card" style={{mystyle}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Title:{item.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Category:{item.category}</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">Reminder:{item.date}</h6>
                                            <p className="card-text">Description:{item.desc}</p>
                                            <Link to ={`edit-note/${item.id}`} className="card-link">Edit</Link>
                                            <Link to type="button" onClick={(e) => this.deleteNote(e, item.id)} className="card-link">Delete</Link>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        
                );
            });
          }


        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Notes
                                        <Link to={'add-note'} className="btn btn-primary btn-sm float-end">Add Note</Link> 
                                    </h3>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div> <br />

                <div className="container">
                <div className="card-body">
                    <div className="col-sm-12">
                    <div className="row">
                        {note_values}
                    </div>
                    </div>
                </div>

                </div>
                
               
               
                {/* notes */}
                        {/* <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="card" style={{mystyle}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                            <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
                                            <a href="#" className="card-link">Edit</a>
                                            <a href="#" className="card-link">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            </div>
        )
    }
}

export default Note;