import React from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Mutation_findUser } from "../utils/mutations";
import { asyncMap } from "@apollo/client/utilities";

import { QUERY_ALL_USERS } from "../utils/queries";

import SearchBarUser from "../component/searchBarUser";

export default function Search() {
  const { loading, data: userData } = useQuery(QUERY_ALL_USERS);

  const users = userData?.users;
  console.log(users);

  const [search, setSearch] = useState("");
  const [findUser, { error }] = useMutation(Mutation_findUser);

  const handleFocus = () => {};

  const findPeople = async (e) => {
    e.preventDefault();
    try {
      const response = await findUser({ variables: search });

      if (!response.data.findUser) {
        throw new Error("something went wrong!");
      } else {
        console.log("lets see");
      }
    } catch (err) {
      console.error(err);
      //setShowAlert(true);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-3 text-center">
      <SearchBarUser></SearchBarUser>
      <Form onSubmit={findPeople} onFocus={handleFocus}>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Find new people..."
        />

        <input type="submit" value="FIND" />
      </Form>
    </div>
  );
}
