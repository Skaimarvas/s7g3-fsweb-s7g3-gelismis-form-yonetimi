import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FormCard from "../componenets/Form";
import EditForm from "../componenets/EditForm";

const PageContent = ({ team, setTeam, duzuye, setDuzuye, uyeDuzenle }) => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <FormCard
              team={team}
              setTeam={setTeam}
              setDuzuye={setDuzuye}
              duzuye={duzuye}
              uyeDuzenle={uyeDuzenle}
            />
          </Route>
          <Route path="/edit-form/:userId" exact>
            <EditForm
              duzuye={duzuye}
              team={team}
              setTeam={setTeam}
              setDuzuye={setDuzuye}
              uyeDuzenle={uyeDuzenle}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default PageContent;
