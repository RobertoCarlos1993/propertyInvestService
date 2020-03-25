import React, { useState } from "react";
import styled from "styled-components";
import BtnProperty from "./BtnProperty";

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

const legalExpenses = price => {
  const propertyTax = price * 0.0875;
  const paperWork = 1612;
  return propertyTax + paperWork;
};

const priceToEuroFormat = num => num.toLocaleString("es-ES") + "€";

const FilterForm = () => {
  const [query, setQuery] = useState({
    operation: "sale",
    price: "",
    propertyType: "flat",
    size: "",
    endType: "all"
  });

  const [properties, setProperties] = useState([]);

  const [installment, setInstallment] = useState(null);

  const saveQueryParams = e => {
    console.log(e.target.value);
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const callDB = () => {
    // call endpoint
    if (query.endType === "all") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow"
      };
      fetch("/all", requestOptions)
        .then(response => response.json())
        .then(result => setProperties(result.data))
        .catch(error => console.log("error", error));
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        body: JSON.stringify({ ...query })
      };
      fetch("/filter", requestOptions)
        .then(response => response.json())
        .then(result => setProperties(result.data))
        .catch(error => console.log("error", error));
    }
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
        <option value="all">Find All</option>
        <option value="filter">Filter</option>
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
              <th>Legal Expenses (approx)</th>
              <th>Size(&#13217;)</th>
              <th>Url</th>
              <th>Mortgage Details</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} id={property.id}>
                <td>{property.address}</td>
                <td>{priceToEuroFormat(property.price)}</td>
                <td>{priceToEuroFormat(legalExpenses(property.price))}</td>
                <td>{property.size}</td>
                <td>{property.url}</td>
                <td>
                  <BtnProperty id={property.id} setI={setInstallment} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {installment != null && (
        <p>
          Installment is:{" "}
          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {installment}
          </span>
          . Assuming a fix interest rate of 1.89% and mortgage lenght of 20
          years. (NO DEPOSIT DOWN)
        </p>
      )}
    </>
  );
};

export default FilterForm;
