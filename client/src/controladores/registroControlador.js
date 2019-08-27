import React from 'react';
import axios from 'axios';

var userControlador = {
    crearUser: (name, surname, email, age, pwd )=>{
        axios.post('http://localhost:3001/api/newUser', {
          name: name,
          surname: surname,
          email: email,
          age: age,
          pwd: pwd
        }).then(res =>{
          console.log(res);
          return res;
        })
        .catch(e =>{
        console.log(e);
          return e;
        })
      },
    
    sayHelloInSpanish: function() {
    return "Hola";
    }
    };