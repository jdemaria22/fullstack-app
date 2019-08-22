import React from 'react';
import PropTypes from 'prop-types';
import "react-bulma-components/full";
import '../App.css';

const ModalEdit = ({ children, closeModal, modalStateEdit, title , id_agent, name, age, updateAgent, handleChange}) => {
       
    if(!modalStateEdit) {
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
                <p className="par">{'Editar agente ' + id_agent + ':'}</p>
                <div className="field">
                    <div className="control">
                        <input name="name_agent" className="input is-primary inp" type="text" placeholder="Ingrese Nombre" value={name} onChange={handleChange}></input>
                    </div>
                    <div className="control">
                        <input name="age_agent" className="input is-danger inp" type="text" placeholder="Ingrese Nombre" value={age} onChange={handleChange}></input>
                    </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="column is-half">
                <a className="button" onClick={closeModal}>Cancel</a>
              </div>
              <div className="column is-half left">
                <a className="button is-success" onClick={updateAgent}>Aceptar</a>  
              </div>
            </footer>
          </div>
        </div>
      </React.Fragment>
    );
  }
  
  ModalEdit.propTypes = {
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    modalStateEdit: PropTypes.bool.isRequired,
    id_agent: PropTypes.string.isRequired,
    updateAgent: PropTypes.func.isRequired,
    age: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  }

export default ModalEdit;