import { Outlet } from "react-router";

const Heading = () => {
  return <>
    <section id="blogheading">
      <h1>Growing in SF</h1>
    </section>
    <Outlet />
  </>;
};

export default Heading;