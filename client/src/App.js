import React from 'react';
import axios from 'axios';
import "react-bulma-components/full";
import './App.css';
import PropTypes from 'prop-types';


const Modal = ({ children, closeModal, modalState, title , id_agent}) => {
  
  if(!modalState) {
    return null;
  }
  
  return(
    <React.Fragment>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={closeModal} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              {children + id_agent + '?'}
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="column is-half">
              <a className="button" onClick={closeModal}>Cancel</a>
            </div>
            <div className="column is-half left">
              <a className="button is-success" onClick={closeModal}>Aceptar</a>  
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>

  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  modalState: PropTypes.bool.isRequired,
  id_agent: PropTypes.string.isRequired
}

class App extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
        agentes : [],
        intervalIsSet: false,
        modalState: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }
   
  componentDidMount(){
    this.getDatos();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDatos, 2000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDatos =  () => {
    axios.get('http://localhost:3001/api/agentes')
    .then(response =>{
      this.setState({agentes: response.data.data});
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
      })
      .catch(e => {
        console.log(e);
      })
  }

  toggleModal(id) {    
    
    if(id != 0){
      console.log(id);
      Modal.id_agent = id;
      this.setState((prev, props) => {
        const newState = !prev.modalState;
        
        return { modalState: newState };
      }); 
    } 
    else{
      this.setState((prev, props) => {
        const newState = !prev.modalState;
        
        return { modalState: newState };
      }); 
    }      
  }
  render(){
    const { agentes } = this.state;
    return (
      <div className="contenido">
        <div className="columns">
          <div className="column is-one-third"></div>
          <div className="column is-one-third mgc">     
                {agentes.length <= 0
                  ? 'NO DB ENTRIES YET'
                  : agentes.map((dat) => (
                      <div key={dat._id}>
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
                            <a onClick={() => this.toggleModal()} className="card-footer-item">Edit</a>
                            <a onClick={() => this.toggleModal(dat._id)} className="card-footer-item">Delete</a>
                          </footer>
                          <div>
                          <Modal 
                            closeModal={this.toggleModal} 
                            modalState={this.state.modalState}
                            id_agent={dat._id}
                            title="Confirmacion"> ¿Desea eliminar este agente 
                          </Modal>
                         
                          </div>
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
