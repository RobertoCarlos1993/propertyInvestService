import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${props => (props.primary ? "grey" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid grey;
  border-radius: 3px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "blue"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const Select = styled.select`
  height: 35px;
  background: papayawhip;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
`;

const FilterForm = () => {
  const [query, setQuery] = useState({
    operation: "sale",
    price: "",
    propertyType: "flat",
    size: "",
    endType: "find"
  });

  const saveQueryParams = e => {
    console.log(e.target.value.type);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const callDB = () => {
    // call endpoint
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({ ...query })
    };
    fetch("/filterProperty", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  };

  return (
    <>
      <label>Operation:</label>
      <Select type="text" name="operation" onChange={saveQueryParams}>
        <option value="sale">Sale</option>
        <option value="rent">Rent</option>
      </Select>
      <label>Property Type:</label>
      <Select type="text" name="propertyType" onChange={saveQueryParams}>
        <option value="flat">Flat</option>
        <option value="chalet">Chalet</option>
        <option value="countryHouse">Country House</option>
        <option value="garage">Garage</option>
        <option value="office">Office</option>
      </Select>
      <label>Size:</label>
      <Input type="text" name="size" onChange={saveQueryParams} />
      <label>Price:</label>
      <Input type="text" name="price" onChange={saveQueryParams} />
      <label>Call Endpoint Type:</label>
      <Select type="text" name="endType" onChange={saveQueryParams}>
        <option value="findAll">Find All</option>
        <option value="find">Filter</option>
      </Select>
      <Button primary onClick={callDB}>
        Call DB
      </Button>
    </>
  );
};

export default FilterForm;
