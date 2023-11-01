import React, { useState } from "react";
import "./App.css";
import Form from "./componenets/Form";
import Card from "react-bootstrap/Card";

const deneme = [
  {
    name: "Rıfkı",
    email: "rifki@cabbar.com",
  },
];

function App({ teammembers = deneme }) {
  const [kullanicilar, setKullanicilar] = useState([]);
  return (
    <div className="App">
      <h1>Kullanıcı Oluştur</h1>
      <Form team={kullanicilar} setTeam={setKullanicilar} />
      <div>
        {kullanicilar?.map((kullanici) => (
          <Card style={{ width: "18rem", margin: "0 auto" }}>
            <Card.Body>
              <Card.Title>{kullanici.name}</Card.Title>
              <Card.Text> {kullanici.email} </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      {kullanicilar.length > 0 && (
        <div>
          <h2>Kullanıcılıar</h2>
          <pre>{JSON.stringify(kullanicilar, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
