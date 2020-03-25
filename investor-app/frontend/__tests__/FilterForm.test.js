import React from "react";

import FilterForm from "../src/components/FilterForm";
import { fakeProperties, typedValue } from "../lib/testUtils";
import toJSON from "enzyme-to-json";
import { shallow, mount } from "../setupTest";

function typing(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate("change", {
    target: { name, value }
  });
}

describe("<FilterForm/>", () => {
  it("renders properly", () => {
    const wrapper = mount(<FilterForm />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("accepts typing a value and update state properly", () => {
    const wrapper = mount(<FilterForm />);
    typing(wrapper, "price", typedValue.price);
    wrapper.update();
    expect(wrapper.find(`input[name="price"]`).prop("value")).toEqual(
      typedValue.price
    );
  });

  it("Click on btn and spapshot!", () => {
    const wrapper = mount(<FilterForm />);
    const btn = wrapper.find('button[data-test="btnSubmit"]');
    btn.simulate("click");
    wrapper.update();
    const table = wrapper.find("table[data-test='propertiesTable']");
    expect(toJSON(table)).toMatchSnapshot();
  });

  it("Click on btn and verify table values", () => {
    const wrapper = mount(<FilterForm />);
    const btn = wrapper.find('button[data-test="btnSubmit"]');
    btn.simulate("click");
    wrapper.update();
    const table = wrapper.find("table[data-test='propertiesTable']");
    table.find("tr td:first-child").forEach((td, idx) => {
      expect(td.text()).toEqual("2");
    });
  });
});
