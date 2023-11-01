import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import * as Yup from "yup";

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
  const [fromErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    termsofservice: "",
  });

  const [formValid, setFormValid] = useState(true);

  const teamFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("İsim alanı boş bırakılamaz!")
      .min(3, "Ürün ismi 3 karakterden az olamaz."),
    email: Yup.string()
      .email("Geçerli bir email adresi olması gerekiyor!")
      .required("Email adresi yazılması gerekiyor!"),
    password: Yup.string()
      .required("Şifre gerekiyor")
      .min(6, "Şifre 6 karakterden fazla olmalı!"),
    termsofservice: Yup.boolean().oneOf(
      [true],
      "Kullanım şartlarını kabul etmeniz gerekiyor"
    ),
  });

  const formSubmit = (e) => {
    e.preventDefault();

    for (let key in member) {
      console.log("checkValidationFor(key, member[key] >", key, member[key]);
      checkValidationFor(key, member[key]);
    }

    if (formValid) {
      console.log("FROM SUBMIT EDİLDİ! ", e);
      axios
        .post("https://reqres.in/api/users/", member)
        .then((res) => {
          if (res.status === 201) {
            console.log("Üye başarıyla kaydedildi.");
            console.log("API tarafından dönen veri:", res.data, res.status);
          } else {
            console.log("Üye kaydedilirken bir hata oluştu.");
          }
        })
        .catch((err) => {
          console.error("Üye kaydedilirken bir hata ile karşılaşıldı", err);
        });
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setMember({ ...member, [name]: type === "checkbox" ? checked : value });
    console.log("Name", name);
    console.log("Value", value);
    console.log("Type", type);
    console.log("Checked", checked);
    console.log("Member", member);
    checkValidationFor(name, type === "checkbox" ? checked : value);
  };

  useEffect(() => {
    console.error("form error >", fromErrors);
  }, [fromErrors]);
  //fromErros'da bir değişiklik olduğunda konsolda hata belirecek

  useEffect(() => {
    teammember && setMember(teammember);
  }, [teammember]);

  useEffect(() => {
    console.log("member >", member);
    teamFormSchema.isValid(member).then((valid) => setFormValid(valid));
  }, [member]);

  const checkValidationFor = (field, value) => {
    Yup.reach(teamFormSchema, field)
      .validate(value)
      .then((valid) => {
        setFormErrors({ ...fromErrors, [field]: "" });
      })
      .catch((err) => {
        console.log("HATA!", field, err.errors[0]);
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [field]: err.errors[0],
        }));
      });
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
            isInvalid={!!fromErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {fromErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            onChange={inputChangeHandler}
            value={member.email}
            name="email"
            isInvalid={!!fromErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {fromErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Şifre</Form.Label>
          <Form.Control
            id="password"
            type="password"
            onChange={inputChangeHandler}
            value={member.password}
            name="password"
            isInvalid={!!fromErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {fromErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            id="termsofservice"
            type="checkbox"
            label="Kullanım Şartlarını Kabul Ediyorum"
            onChange={inputChangeHandler}
            checked={member.termsofservice}
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
