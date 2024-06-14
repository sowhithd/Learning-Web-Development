import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    // setContact((previousValue) => ({
    //   fName: name === "fName" ? value : previousValue.fName || "",
    //   lName: name === "lName" ? value : previousValue.lName || "",
    //   email: name === "email" ? value : previousValue.email || "",
    // }));

    //OR
    /*
      We've got the name that comes from our event.target.name,
      and we're simply adding a set of square brackets in 
      order to get hold of the value of this variable,
   */
    setContact((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          name="fName"
          placeholder="First Name"
          onChange={handleInputChange}
          value={contact.fName}
        />
        <input
          name="lName"
          placeholder="Last Name"
          onChange={handleInputChange}
          value={contact.lName}
        />
        <input
          value={contact.email}
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
