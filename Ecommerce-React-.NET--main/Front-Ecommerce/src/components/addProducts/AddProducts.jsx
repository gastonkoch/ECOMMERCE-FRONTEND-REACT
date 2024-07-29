import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./AddProducts.css";


const AddProducts = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredStock, setEnteredStock] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredImageUrl, setEnteredImageUrl] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredBrand, setEnteredBrand] = useState("");
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    setFormValid(
      enteredName !== "" &&
      enteredDescription !== "" &&
      enteredPrice !== "" &&
      enteredStock !== "" &&
      enteredCategory !== "" &&
      enteredBrand !== "" &&
      enteredImageUrl !== ""
    );
  }, [enteredName, enteredDescription, enteredPrice, enteredStock, enteredCategory, enteredBrand, enteredImageUrl]);

  const handleChangeName = (e) => {
    setEnteredName(e.target.value);
  };

  const changeDescriptionHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const changeStockHandler = (event) => {
    setEnteredStock(event.target.value);
  };

  const changePriceHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const changeImageUrlHandler = (event) => {
    setEnteredImageUrl(event.target.value);
  };
  const changeBrandHandler = (event) => {
    setEnteredBrand(event.target.value);
  };

  const changeCategoryHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const submitProductHandler = async (event) => {
    event.preventDefault();
    const productDTO = {
      brand: enteredBrand,
      category: enteredCategory,
      description: enteredDescription,
      image: enteredImageUrl,
      name: enteredName,
      price: enteredPrice,
      stock: enteredStock
    };
    try {
      const response = await fetch("https://localhost:7197/api/Product", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDTO),
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      const data = await response.json();
      navigate("/productos")
    } catch (error) {
      alert(error);
    }

    setEnteredName("");
    setEnteredDescription("");
    setEnteredStock("");
    setEnteredPrice("");
    setEnteredImageUrl("");
  };

  return (
    <div className="divAddProduct">
      <Card className="m-4 w-50 formAddProduct">
        <h1>Agregar Producto</h1>
        <Card.Body className="card-body-add-product">
          <Form className="text-white box-add-product" onSubmit={submitProductHandler}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="bookTitle">
                  <Form.Label className="labelForm">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar el nombre"
                    onChange={handleChangeName}
                    value={enteredName}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="bookAuthor">
                  <Form.Label className="labelForm">Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar descripción"
                    onChange={changeDescriptionHandler}
                    value={enteredDescription}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="bookPageCount">
                  <Form.Label className="labelForm">Precio</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresar precio"
                    min={1}
                    onChange={changePriceHandler}
                    value={enteredPrice}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="bookRating">
                  <Form.Label className="labelForm">Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresar stock"
                    max={10000}
                    min={0}
                    onChange={changeStockHandler}
                    value={enteredStock}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="bookPageCount">
                  <Form.Label className="labelForm">Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar categoria"
                    onChange={changeCategoryHandler}
                    value={enteredCategory}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="bookRating">
                  <Form.Label className="labelForm">Marca</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar marca"
                    onChange={changeBrandHandler}
                    value={enteredBrand}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-between">
              <Form.Group className="mb-3 labelForm" controlId="bookImageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar url de imagen"
                  onChange={changeImageUrlHandler}
                  value={enteredImageUrl}
                />
              </Form.Group>
            </Row>
            <div className="box-button-add">
              <Button type="submit" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd button" disabled={!formValid}>Agregar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddProducts;

