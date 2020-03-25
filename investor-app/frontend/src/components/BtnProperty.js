import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${props => (props.primary ? "grey" : "white")};
  color: ${props => (props.primary ? "black" : "red")};
  font-size: 0.8em;
  border: 2px solid grey;
  border-radius: 3px;
`;

const BtnProperty = props => {
  const { id, setI } = props;
  const mortgageDetails = id => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({ id })
    };
    fetch("/installment", requestOptions)
      .then(response => response.json())
      .then(result => setI(result.data.installment))
      .catch(error => console.log("error", error));
  };

  return <Button onClick={() => mortgageDetails(id)}>Show Details</Button>;
};

export default BtnProperty;
