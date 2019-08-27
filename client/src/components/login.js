import React from 'react';
import "react-bulma-components/full";
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
const Login = ({ email, estado, pwd , login ,handleChange}) => {
    if(!estado) {
        return null;
    }    
    return (
        <div>   
            <section className="hero is-fullheight is-medium is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <article className="card is-rounded">
                                    <div className="card-content">
                                        <h1 className="title">           
                                            Logo
                                        </h1>
                                        <p className="control has-icon">
                                            <input name='email' className="input" type="email" placeholder="Email" value={email} onChange={handleChange}/>
                                            <i className="fa fa-envelope"></i>
                                        </p>
                                        <p className="control has-icon">
                                            <input name='pwd' className="input" type="password" placeholder="Password" value={pwd} onChange={handleChange}/>
                                            <i className="fa fa-lock"></i>
                                        </p>
                                        <p className="control">
                                            <label className="checkbox">
                                            <input type="checkbox"/>
                                            Remember me                                           
                                            </label>
                                        </p>
                                        <p className="control">
                                            <button className="button is-primary is-medium is-fullwidth">
                                            <i className="fa fa-user"></i>
                                                <Link to="/users">Login</Link>
                                            </button>
                                        </p>
                                        <p className="control">
                                            <button className="button is-danger is-medium is-fullwidth" onClick={login}>
                                            <i className="fa fa-user"></i>
                                                
                                            </button>
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
            </section>          
        </div>
    )
}
Login.propTypes = {
    email: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    estado: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
  }
export default Login