import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FormCard from "./Form";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/esm/Button";

const EditForm = ({ duzuye, team, setTeam, uyeDuzenle, setDuzuye }) => {
  const { userId } = useParams();

  //team bir dizi ve içinde obje barındırıyor

  return (
    <div>
      Edit: {userId} -
      <Link to="/">
        <Button className="btn btn-primary"> Ana Sayfaya Dön </Button>
      </Link>
      <FormCard
        duzuye={duzuye}
        team={team}
        setTeam={setTeam}
        uyeDuzenle={uyeDuzenle}
        setDuzuye={setDuzuye}
      />
    </div>
  );
};

export default EditForm;
