import "./CoreConcept.css";

function CoreConcept(props) {
  const { title, description, image } = props.data;

  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

export default CoreConcept;
