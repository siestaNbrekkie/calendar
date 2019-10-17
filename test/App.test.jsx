import React from "react";
import { shallow, mount, render } from "enzyme";
import App from "../client/src/app.jsx";

describe("Unit Tests", () => {
	test("should render the app on the screen", () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toExist();
	});
});

