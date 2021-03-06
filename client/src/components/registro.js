import React from 'react';
import "react-bulma-components/full";
import '../App.css';
var userControlador =  require('../controladores/registroControlador.js');
export const Registro = () => {
    return (
        <div className="registro">
            <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" type="text" placeholder="Ingrese Name"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                        </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Surname</label>
                <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" type="text" placeholder="Ingrese Surname"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                        </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="email" placeholder="Ingrese email"/>
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="password" placeholder="Ingrese password"/>
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                    <input type="checkbox"/>
                    I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <label className="radio">
                    <input type="radio" name="question"/>
                    Yes
                    </label>
                    <label className="radio">
                    <input type="radio" name="question"/>
                    No
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={userControlador.sayHelloInSpanish}>Submit</button>
                </div>
                <div className="control">
                    <button className="button is-text">Cancel</button>
                </div>
            </div> 
        </div>
        
    )
}