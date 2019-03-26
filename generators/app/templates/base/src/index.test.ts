import Klass from ".";

test("snapshot", () => {
  const instance = new Klass();
  expect(instance.greet()).toMatchSnapshot();
});
