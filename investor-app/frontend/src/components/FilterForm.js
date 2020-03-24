import React, { useState } from "react";
import styled from "styled-components";
const fakeProperties = [
  {
    id: "123",
    url: "https://www.idealista.com/inmueble/87821179/",
    price: 125000,
    size: 70,
    address: "Centro, Leganés"
  },
  {
    id: "124",
    url: "https://www.idealista.com/inmueble/89052114/",
    price: 299700,
    size: 152,
    address: "Casco Antiguo, Leganés"
  }
];

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

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      padding: 10px 5px;
      display: block;
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`;

const FilterForm = () => {
  const [query, setQuery] = useState({
    operation: "sale",
    price: "",
    propertyType: "flat",
    size: "",
    endType: "find"
  });

  const [properties, setProperties] = useState([]);

  const saveQueryParams = e => {
    console.log(e.target.value);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const callDB = () => {
    console.log("hi");
    setProperties(fakeProperties);
    // call endpoint
    /* const requestOptions = {
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
      .catch(error => console.log("error", error));*/
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
      <Input
        type="text"
        name="price"
        onChange={saveQueryParams}
        value={query.price}
      />
      <label>Call Endpoint Type:</label>
      <Select type="text" name="endType" onChange={saveQueryParams}>
        <option value="findAll">Find All</option>
        <option value="find">Filter</option>
      </Select>
      <Button primary onClick={callDB} data-test="btnSubmit">
        Call DB
      </Button>
      {properties.length > 0 && (
        <Table data-test="propertiesTable">
          <thead>
            <tr>
              <th>Address</th>
              <th>Price</th>
              <th>Size</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id}>
                <td>{property.address}</td>
                <td>{property.price}</td>
                <td>{property.size}</td>
                <td>{property.url}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default FilterForm;
