import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import * as Yup from "yup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const emptyMember = {
  name: "",
  email: "",
  password: "",
  termsofservice: false,
};

//Boş bir üye objesi oluşturduk.
const FormCard = ({
  team,
  setTeam,
  teammember = emptyMember,
  setDuzuye,
  uyeDuzenle,
  duzuye,
}) => {
  const [member, setMember] = useState(teammember);

  //teammember propsunu empyMember değişkenine atadık.
  const [fromErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    termsofservice: "",
  });

  const [formValid, setFormValid] = useState(true);

  const history = useHistory();

  const teamFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("İsim alanı boş bırakılamaz!")
      .min(3, "Üye ismi 3 karakterden az olamaz."),
    id: Yup.number(),
    createdAt: Yup.string(),
    updatedAt: Yup.string(),
    email: Yup.string()
      .email("Geçerli bir email adresi olması gerekiyor!")
      .required("Email adresi yazılması gerekiyor!"),
    password: Yup.string()
      .required("Şifre gerekiyor")
      .min(6, "Şifre 6 karakterden fazla olmalı!"),
    termsofservice: Yup.boolean()
      .required("Kullanım şartlarını kabul etmeniz gerekiyor")
      .oneOf([true], "Kullanım şartlarını kabul etmeniz gerekiyor"),
  });
  //Burada verilerin doğru girilmesi için doğrulama kuralları tanımladık.

  const formSubmit = (e) => {
    e.preventDefault();
    //preventDefault ile tarayıcının varsayılan davranışını(sayfanın yeniden yüklenmesini) engelledik. Böylelikle form verilerini işlemeye devam ettik.

    for (let key in member) {
      checkValidationFor(key, member[key]);
      // burada member objesindeki form verilerinin doğrulama aşamalarını gerçekleştirdik. Her döngüde checkValidationFor çağırıp her alanın doğru ve geçerli veri içerip içermediğini kontrol ettik.
    }

    if (formValid) {
      //form tüm doğrulama işlemlerinden geçtiyse yani formValid true ise aşağıdaki işlemleri yapar.

      const reqType = member.id ? "put" : "post";
      const endpoint = `https://reqres.in/api/users${
        reqType === "put" ? "/" + member.id : ""
      }`;
      axios[reqType](endpoint, member)

        //Verile adrese HTTP post isteği gönderdik. Api'den dönen yanıt (res) işledik
        .then((res) => {
          if (res.status === 201) {
            //Eğer res.status 201 ise veri başarılı bir şekilde gönderildiği anlamına geliyor.
            setTeam((prevTeam) => [...prevTeam, res.data]);
            setMember(teammember);
            history.push("/");
          } else {
            uyeDuzenle(member);
            setDuzuye("");
            setMember(teammember);
            history.push("/");
          }
        })
        .catch((err) => {
          //hata ile karşılaşırsak karşılaşacağımız süreç
          console.error("Üye kaydedilirken bir hata ile karşı laşıldı", err);
        });
    }
  };

  const inputChangeHandler = (e) => {
    //inputChangeHandler yaptığımız formdaki input alanlarındaki değişme olduğunda çalışmaya başlar.
    const { name, value, type, checked } = e.target;
    setMember({ ...member, [name]: type === "checkbox" ? checked : value });
    //setMember ile bu değerler member state içinde güncelleriz.

    checkValidationFor(name, type === "checkbox" ? checked : value);
    //Değişen input değerini ve adını checkValidationFor adlı fonksiyona gönderir ve verilerin doğrulama kurallarına uyup uymadığını kontrol ederiz. Geçeri olmazsa teamFormSchema diye tanımladığımız doğrulama kurallarındaki uyarılar karşımıza çıkar.
  };

  useEffect(() => {
    console.error("form error >", fromErrors);
  }, [fromErrors]);
  //fromErrors'da bir değişiklik olduğunda konsolda hata belirecek

  useEffect(() => {
    duzuye && setMember(duzuye);
  }, [duzuye]);

  // useEffect(() => {
  //   teammember && setMember(teammember);
  // }, [teammember]);
  //Bu kod teammember prop'unun değeri varsa setMember ile member state'ini yeni üye verisiyle günceller. Bu kodu yeni üye eklemek ve mevcut üyeyi düzenlemek için kullanırız

  useEffect(() => {
    teamFormSchema.isValid(member).then((valid) => setFormValid(valid));
  }, [member]);
  //Bu kod member adlı state değiştiğinde çalışır. Değiştiğinde scope içinde kod işleme geçer. teamFromSchema ile member objesinin doğruluğunu kontrol eder ve sonucunda geçerli ise setFormValid ile FormValid state ine kaydeder. Eğer form geçerli ise true değer döner. True olduğunda 51. satırdaki kodlar çalışır.
  const checkValidationFor = (field, value) => {
    // Bu fonksiyonun amacı formdaki bir alanın doğrulama işlemini gerçekleştirmek ve herhangi bir hata durumunda hata mesajını iletmektir. Fonksiyon 2 parametre alır (field alanın adı. name gibi) ve value(checked ve value gibi)
    Yup.reach(teamFormSchema, field)
      //Yup.reach teamFromSchema adlı doğrulama şemasını kullanarak , doğrulama işlemini ilgili alana uygular.
      .validate(value)
      //validate yöntemi belirli bir alandaki değerin doğrulama şemasına uygun olup olmadığını kontrol eder
      .then((valid) => {
        setFormErrors({ ...fromErrors, [field]: "" });
        //Eğer değer doğrulama şemasına uygunsa yani bir hata oluşmazsa setFormErros ile bu alan için hata mesajı temizlenir.
      })
      .catch((err) => {
        //Eğer değer doğrulama şemasına uymuyorsa bu bölüm çalışır

        //Consola hata mesajını ve hangi alanla ilgili olduğunu yazdırır.
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [field]: err.errors[0],
        }));
        //Bu kısımda mevcut hata durumlarına yeni hata durumlarını ekleyerek kullanıcıyı bilgilendiririz.
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
          <Form.Control.Feedback id="name-validation" type="invalid">
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
          <Form.Control.Feedback id="email-validation" type="invalid">
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
          <Form.Control.Feedback id="password-validation" type="invalid">
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
        <Button className="btn btn-primary" id="submit-button" type="submit">
          Kaydet
        </Button>
      </Form>
      <div>
        {Array.isArray(team) &&
          team?.map((kullanici) => (
            <Card style={{ width: "18rem", margin: "0 auto" }}>
              <Card.Body>
                <Card.Title>{kullanici.name}</Card.Title>
                <Card.Text> {kullanici.email} </Card.Text>{" "}
                <Link to={`/edit-form/${kullanici.id}`}>
                  {" "}
                  <Button onClick={() => setDuzuye(kullanici)}>
                    {" "}
                    Düzenle{" "}
                  </Button>{" "}
                </Link>{" "}
              </Card.Body>
            </Card>
            //react bootstrap kullanarak kullanıcı bilgilerini görüntülemek için card kullandım
          ))}
      </div>
      {/* {team?.length > 0 && (
        <div>
          <h2>Kullanıcılıar</h2>
          <pre>{JSON.stringify(team, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default FormCard;
