import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import PokeTarjeta from "../Components/PokeTarjeta.jsx";

const Index = () => {
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    getPokemones(offset);
  }, []);

  const getPokemones = async (o) => {
    try {
      const liga = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${o}`;
      const response = await axios.get(liga);
      const respuesta = response.data;
      setPokemones(respuesta.results);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3 shadow">
            <InputGroupText>
              <i className="fa-solid fa-search"></i>
            </InputGroupText>
            <Input placeholder="Buscar Pokemon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {pokemones.map((pok, i) => (
          <PokeTarjeta poke={pok} key={i} />
        ))}
      </Row>
    </Container>
  );
};

export default Index;
