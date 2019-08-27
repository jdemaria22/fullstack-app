import React from 'react';
import axios from 'axios';
import "react-bulma-components/full";
import './App.css';
import Modal from './components/modal.js';
import ModaEdit from './components/modalEdit.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Login} from './components/login.js';
class App extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
        agentes : [],
        intervalIsSet: false,
        modalState: false,
        modalStateEdit: false,
        id_agent: 0,
        name_agent: '',
        age_agent: 0,
        name: '',
        age: 0
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalEdit = this.toggleModalEdit.bind(this);
    this.toggleModalAndDelete = this.toggleModalAndDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ToggleModalAndUpdate = this.ToggleModalAndUpdate.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }
  
  componentDidMount(){
    this.getDatos();
  }

  getDatos = () => {
    axios.get('http://localhost:3001/api/agentes')
    .then(response =>{
      this.setState({agentes: response.data.data});
    })
    .catch(e =>{
      console.log(e);
    })
  }

  crearAgente = ()=>{
    axios.post('http://localhost:3001/api/newData', {
      name: this.state.name,
      age: this.state.age
    }).then(res =>{
      console.log(res);
      this.getDatos();
    })
    .catch(e =>{
      console.log(e);
    })
  }

  borrarAgente = (idAgent) => {
    axios.delete('http://localhost:3001/api/delete/'+ idAgent, {
      data: {
        id: idAgent
      },})
      .then(response => {
        console.log(response);
        this.getDatos();
      })
      .catch(e => {
        console.log(e);
      })
  }

    modificarAgente = (idAgent) => {
      axios.put('http://localhost:3001/api/edit/'+idAgent, {
        name: this.state.name_agent,
        age: this.state.age_agent
      }).then(res => {
        console.log(res);
        this.getDatos();
      }).catch(e=> {
        console.log(e);
      }) 
    }

  setearStates = (id, name , age) => {
    this.setState({ id_agent: id});
    this.setState({ name_agent: name});
    this.setState({ age_agent: age});
  }

  async toggleModal(id, name , age) {       
    if(id){  
      await this.setearStates(id,name,age );
      this.setState((prev, props) => {
        const newState = !prev.modalState;
        return { modalState: newState };
      }); 
    }  
  }

  async toggleModalEdit(id, name , age) {       
    if(id){  
      await this.setearStates(id,name,age );
      this.setState((prev, props) => {
        const newState = !prev.modalStateEdit;
        return { modalStateEdit: newState };
      }); 
    }  
  }

  async ToggleModalAndUpdate(){
    if(this.state.id_agent){
      this.modificarAgente(this.state.id_agent);
      await this.getDatos();
      this.setState((prev, props) => {
        const newState = !prev.modalStateEdit;
        return { modalStateEdit: newState };
      }); 
    }
  }

  async toggleModalAndDelete () {
    console.log('entra')
    if(this.state.id_agent){
      this.borrarAgente(this.state.id_agent);
      await this.getDatos();      
      setTimeout(this.setState((prev, props) => {
        const newState = !prev.modalState;
        return { modalState: newState };
      }) , 1000); 
      
    }
    else{
      alert('Error al borrar id de agente :' + this.state.id_agent);
    }
  }

  render(){
    const { agentes } = this.state;
    return (
      <div className="contenido">
        <div className="Add">
              <input
                name="name"
                type="text"
                placeholder="Ingrese nombre"
                value = {this.state.name}
                onChange = {this.handleChange}
              />
              <input
                name="age"
                type="text"
                placeholder="Ingrese edad"
                value = {this.state.age}
                onChange = {this.handleChange}
              />
              <a class="button" onClick={() => this.crearAgente()}>Agregar</a>
            </div>
        <div className="columns">
          <div className="column is-one-third"></div>
          <div className="column is-one-third mgc">     
                {agentes.length <= 0
                  ? 'NO DB ENTRIES YET'
                  : agentes.map((dat) => (
                      <div key={dat._id}>
                        <ModaEdit
                        closeModal={this.toggleModalEdit}
                        modalStateEdit={this.state.modalStateEdit}
                        id_agent={this.state.id_agent}
                        name={this.state.name_agent}
                        age={this.state.age_agent}
                        updateAgent={this.ToggleModalAndUpdate}
                        handleChange={this.handleChange}
                        title="Edit"
                        >
                        </ModaEdit>
                        <Modal 
                            closeModal={this.toggleModal} 
                            modalState={this.state.modalState}
                            id_agent={this.state.id_agent}
                            deleteAgent={this.toggleModalAndDelete}
                            title="Confirmacion   "> ¿Desea eliminar este agente 
                        </Modal>
                        <div className="card mgc" id={dat._id} >
                          <div className="card-content">
                            <p className="title">
                              Nombre : {dat.name}
                            </p>
                            <p className="subtitle">
                              id : {dat._id} <br/>
                              Edad : {dat.age}   
                            </p>
                          </div>
                          <footer className="card-footer">
                            <a href='#' className="card-footer-item">More info</a>
                            <a onClick={() => this.toggleModalEdit(dat._id, dat.name, dat.age)} className="card-footer-item">Edit</a>
                            <a onClick={() => this.toggleModal(dat._id, dat.name, dat.age)} className="card-footer-item">Delete</a>
                          </footer>
                        </div>
                      </div>
                    ))}
          </div> 
          <div className="column"></div>
        </div>
      </div>  
    );
  }
}
export default App;
