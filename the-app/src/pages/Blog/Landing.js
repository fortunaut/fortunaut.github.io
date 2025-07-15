import ItalicText from "components/ItalicText";

const Landing = () => {
  return <>
    <section id="blog">
      <h3>Intro</h3>
      <p>
        Welcome to my blog landing page. Here I will share information about what plants I am growing
        here in a foggy San Francisco neighborhood.
      </p>
      <h3>Posts</h3>
      <ul>
        <li>
          <a href='/blog/housetomato'>
            House Tomato - <ItalicText>Solanum lycopersicum</ItalicText>
          </a>
        </li>
        <li>
          <a href='/blog/groundcherry'>
            Peruvian groundcherry - <ItalicText>Physalis peruviana</ItalicText>
          </a>
        </li>
      </ul>
    </section>
  </>;
};

export default Landing;