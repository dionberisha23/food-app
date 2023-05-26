import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";

const RegisterUser = () => {
  const [name, setName] = useState([]);
  const url = "http://localhost:9000";

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: (values) => {
      //send values to db at register api
      axios.post(`${url}/register`, values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterUser;
