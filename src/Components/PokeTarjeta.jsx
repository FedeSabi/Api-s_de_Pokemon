import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const PokeTarjeta = (params) => {
  const [pokemon, setPokemon] = useState({});
  const [imagen, setImagen] = useState("/public/img/pokeGif.gif");
  const [cardClass, setCardClass] = useState("d-none");
  const [loadClass, setLoadClass] = useState("");

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    try {
      const response = await axios.get(params.poke.url);
      const respuesta = response.data;
      setPokemon(respuesta);
      const defaultImage =
        respuesta.sprites.other.dream_world.front_default ||
        "/public/img/pokeGif.gif";
      setImagen(defaultImage);
      setCardClass("");
      setLoadClass("d-none");
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  return (
    <Col sm="4" lg="3" className="mb-3">
      <Card className={`shadow border-4 border-warning ${loadClass}`}>
        <CardImg src={imagen} height="200" className="p-3"></CardImg>
      </Card>
      <Card className={`shadow border-4 border-warning ${cardClass}`}>
        <CardImg src={imagen} height="150" className="p-2" />
        <CardBody className="text-center">
          <Badge pill color="danger">
            # {pokemon.id}
          </Badge>
          <label className="fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
        <CardFooter className="bg-warning">
          <Link to={`/descripcion/${pokemon.id}`} className="btn btn-dark">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
            Descripcion
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default PokeTarjeta;
