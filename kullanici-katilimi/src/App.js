import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./componenets/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import PageContent from "./layout/PageContent";
import axios from "axios";

const deneme = {
  name: "Rıfkı",
  email: "rifki@cabbar.com",
  id: Date.now(),
  termsofservice: false,
};
//Kontrol için boş bir array içinde obje oluşturarak kullanıcı bilgisi oluşturdum
function App({ teammembers = deneme }) {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [duzuye, setDuzuye] = useState();

  const uyeDuzenle = (duzuye) => {
    const updatedkullanicilar = kullanicilar.map((user) =>
      duzuye.id === user.id ? duzuye : user
    );

    setKullanicilar(updatedkullanicilar);
  };

  return (
    <div className="App">
      <h1>Kullanıcı Oluştur</h1>
      <PageContent
        team={kullanicilar}
        setTeam={setKullanicilar}
        uyeDuzenle={uyeDuzenle}
        duzuye={duzuye}
        setDuzuye={setDuzuye}
      />
    </div>
  );
}

export default App;
