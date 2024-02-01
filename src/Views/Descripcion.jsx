import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardText } from "reactstrap";
import axios from "axios";

const Descripcion = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState(0);
  const [numero, setNumero] = useState(0);
  const [altura, setAltura] = useState(0);
  const [imagen, setImagen] = useState("");
  const [cardClass, setCardClass] = useState("d-none");
  const [loadClass, setLoadClass] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const liga = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await axios.get(liga);
        const respuesta = response.data;

        setPokemon(respuesta);
        setNombre(respuesta.name);
        setPeso(respuesta.weight);
        setNumero(respuesta.id);
        setAltura(respuesta.height);
        setDescripcion("Descripción"); // Reemplaza con la propiedad real de tu respuesta API

        const defaultImage =
          respuesta.sprites.other.dream_world.front_default ||
          "/img/pokeGif.gif";
        setImagen(defaultImage);
        setCardClass("");
        setLoadClass("d-none");
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    getPokemon();
  }, [id]);

  return (
    <Container className="bg-danger mt-3">
      <Row className="mt-5">
        <Col>
          <Card className="shadow mt-3 mb-3">
            <CardBody className="mt-3 ">
              <Row>
                <Col className="text-end">
                  <Link to="/" className="btn btn-warning">
                    <i className="fa-solid fa-home"></i>  Inicio
                  </Link>
                </Col>
              </Row>
              <Row className={loadClass}>
                <Col md="12">
                  <img src="/img/pokeGif.gif" alt="gif" className="w-100" />
                </Col>
              </Row>
              <Row className={cardClass}>
                <Col md="6" className="text-center">
                  <CardText className="h1 text-capitalize">
                    #{numero} - {nombre}
                  </CardText>
                  <img src={imagen} alt={nombre} className="img-fluid" />
                </Col>
                <Col
                  md="6"
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="text-center">
                    <CardText className="fs-3">{descripcion}</CardText>
                    <CardText className="fs-5">
                      Altura: <b>{altura / 10} m</b>
                      <br />
                      Peso: <b>{peso / 10} kg</b>
                    </CardText>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Descripcion;
