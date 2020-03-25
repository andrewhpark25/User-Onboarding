import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(2, "Name must be at least 2 characters long"),
    email: yup.string().email().required("Must include an email"), //type set as email so it shows error if not in proper email form in addition to this.
    password: yup.string().required("Must include password").min(6, "Password must be at least 6 characters long"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use"),

})

export default function Form() {
   

   const [users, setUsers] = useState([]);

    const [formValues, setFormValues] = useState({
        name: '',
        email:'',
        password:'',
        terms:'',
      
      });

      const [errors, setErrors] = useState({
         name: '',
        email:'',
        password:'',
        terms:'',
      
      });

     const [buttonDisabled, setButtonDisabled] = useState(true);

 

      useEffect(() => {
       
        formSchema.isValid(formValues).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formValues]);
    
      const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors
            });
          });
      };

const onFormSubmit = event => {

    event.preventDefault()
  
    axios
    .post("https://reqres.in/api/users", formValues)
    .then(res => {
     
      console.log("success");
      setUsers([...users, res.data])
      users.push(res.data);
      console.log(users);
      
      setFormValues({
        name: '',
        email:'',
        password:'',
        terms:'',
      });
    })
    .catch(err => {
      console.log(err.res);
    });
};

const onInputChange = event => {

    event.persist();
    const newFormData = {
      ...formValues,
      [event.target.name]:
        event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormValues(newFormData);
  };
  

    return (
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name"> Name 
        <input
            onChange={onInputChange} // callback takes an event object
            value={formValues.name}
            id='name'
            name='name'
            type='text'
          />
           {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label><br />
  
        <label htmlFor="email">  Email
        <input
            onChange={onInputChange}
            value={formValues.email}
            id='email'
            name='email'
            type='email'
          />
            {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
        </label><br />
        <label htmlFor="password"> Password
        <input
            onChange={onInputChange}
            value={formValues.password}
            id='password'
            name='password'
            type='password'
          />
            {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
        </label><br />

        <label htmlFor="terms" id="terms" className="terms">
            <input type="checkbox" name="terms" checked={formValues.terms} onChange={onInputChange}/>
            {errors.terms.length > 0  ? (
          <p className="error">{errors.terms}</p>
        ) : null}
            Terms and Conditions
        </label><br />
      <button disabled={buttonDisabled}>Submit</button>
      </form>
    )
  }

  

