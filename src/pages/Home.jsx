
import React, { useState } from "react";

const Home = () => {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    photo: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");


  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    if (inputs.mobile.length !== 10) {
      alert("Mobile number must be 10 digits long");
      return;
    }

    
    const existingEmailUser = tableData.find(
      (user) =>
        user.email === inputs.email &&
        (!editClick || user.id !== tableData[editIndex].id)
    );

    if (existingEmailUser) {
      alert("Email address already exists");
      return;
    }
    const existingMobileUser = tableData.find(
      (user) =>
        user.mobile === inputs.mobile &&
        (!editClick || user.id !== tableData[editIndex].id)
    );

    if (existingMobileUser) {
      alert("Mobile number already registered");
      return;
    }


    if (editClick) {
      const tempTableData = [...tableData];
      tempTableData[editIndex] = inputs;
      setTableData(tempTableData);
      setEditClick(false);
      setEditIndex("");
    }
    else {
      setTableData([...tableData, inputs]);
    }
    setInputs({
      name: "",
      email: "",
      password: "",
      mobile: "",
      photo: "",
    });

  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({
      name: tempData.name,
      email: tempData.email,
      password: tempData.password,
      mobile: tempData.mobile,
      photo: tempData.photo,
    });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen bg-[#25544f]"><br />
      <h1 className="text-center text-white text-2xl">Employee Management System</h1><br />
      <div className="bg-[#e5e4e4] max-w-fit m-auto p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input name="email" value={inputs.email} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Mobile Number</label>
            <input name="mobile" value={inputs.mobile} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Photo URL</label>
            <input name="photo" value={inputs.photo} onChange={handleChange} />
          </div>
         

          <button type="submit" className="w-full bg-[#014d64] text-white mt-3">
            {editClick ? "update" : "Add"}
          </button>
        </form>
      </div>
      <h1 className="text-center mt-5 text-white text-2xl">Table</h1>
      <hr />
      <div>
        <table className="w-full text-center text-slate-950 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>Photo URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.mobile}</td>
                <td>{item.photo}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;