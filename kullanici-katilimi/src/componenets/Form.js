import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const emptyMember = {
  name: "",
  email: "",
  password: "",
  termsofservice: false,
};
//Boş bir üye objesi oluşturduk
const FormCard = ({ teammember = emptyMember }) => {
  const [member, setMember] = useState(teammember);

  //teammember propsunu empyMember değişkenine atadık.

  const inputChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setMember({ ...member, [name]: type === "checkbox" ? checked : value });
    console.log("Name", name);
    console.log("Value", value);
    console.log("Type", type);
    console.log("Checked", checked);
    console.log("Member", member);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("FROM SUBMIT EDİLDİ! ", e);
  };

  return (
    <div>
      <Form onSubmit={formSubmit} style={{ width: "90%", margin: "0 auto" }}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">İsim Soyisim</Form.Label>
          <Form.Control
            id="name"
            type="text"
            onChange={inputChangeHandler}
            value={member.name}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            onChange={inputChangeHandler}
            value={member.email}
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Şifre</Form.Label>
          <Form.Control
            id="password"
            type="password"
            onChange={inputChangeHandler}
            value={member.password}
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            id="termsofservice"
            type="checkbox"
            label="Kullanım Şartlarını Kabul Ediyorum"
            onChange={inputChangeHandler}
            checked={member.check}
            name="termsofservice"
          />
        </Form.Group>
        <Button className="btn btn-primary" type="submit">
          Kaydet
        </Button>
      </Form>
    </div>
  );
};

export default FormCard;
