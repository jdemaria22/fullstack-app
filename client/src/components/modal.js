import React from 'react';
import PropTypes from 'prop-types';
import "react-bulma-components/full";
import '../App.css';

const Modal = ({ children, closeModal, modalState, title , id_agent, deleteAgent}) => {
  
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
                {children + ' ' + id_agent + '?'}
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="column is-half">
                <a className="button" onClick={closeModal}>Cancel</a>
              </div>
              <div className="column is-half left">
                <a className="button is-success" onClick={deleteAgent}>Aceptar</a>  
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
    id_agent: PropTypes.object.isRequired,
    deleteAgent: PropTypes.func.isRequired
  }

export default Modal;