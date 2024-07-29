import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "./UpdateProducts.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hook/useForm";

const UpdateProducts = () => {
    const { id } = useParams();
    const [productOnScreen, setProductOnScreen] = useState({
        name: '', // y otros campos con valores iniciales
        description: '',
        price: '',
        stock: '',
        category: '',
        brand: '',
        image: '',
    });

    useState

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        stock: false,
        category: false,
        brand: false,
        image: false,
    });

    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
    const categoryRef = useRef(null);
    const brandRef = useRef(null);
    const imageRef = useRef(null);

    let navigate = useNavigate()

    useEffect(() => {
        fetch(`https://localhost:7197/api/Product/id/${id}`, {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener el producto");
                }
                return response.json();
            })
            .then((productsData) => {
                setProductOnScreen(prevState => ({
                    ...prevState, // Mantén los valores existentes
                    brand: productsData.brand || prevState.brand,
                    category: productsData.category || prevState.category,
                    description: productsData.description || prevState.description,
                    id: productsData.id || prevState.id,
                    image: productsData.image || prevState.image,
                    name: productsData.name || prevState.name,
                    price: productsData.price || prevState.price,
                    stock: productsData.stock || prevState.stock,
                    disponible: productsData.disponible || prevState.disponible,
                    quantity: 1
                }));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const submitUpdateProductHandler = (e) => {
        e.preventDefault();

        if (!nameRef.current.value) {
            nameRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese su nombre")
            return;
        }

        if (!descriptionRef.current.value) {
            descriptionRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor la descripcion")
            return;
        }

        if (!priceRef.current.value) {
            priceRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese el precio")
            return;
        }


        if (!stockRef.current.value) {
            stockRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese el stock")
            return;
        }


        if (!categoryRef.current.value) {
            categoryRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese la categoria")
            return;
        }

        if (!brandRef.current.value) {
            brandRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese la marca")
            return;
        }

        if (!imageRef.current.value) {
            imageRef.current.focus();
            setErrors((prev) => ({
                ...prev,
                name: true
            }));
            alert("Por favor ingrese la imagen")
            return;
        }



        fetch(`https://localhost:7197/api/Product/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productOnScreen)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el producto");
                } else {
                    alert("Modificado con exito")
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        navigate(`/producto/${productOnScreen.id}`)
    }


    const handleCancel = () => (
        navigate(`/producto/${productOnScreen.id}`)
    )

    return (
        <>
            <div className="divUpdateProduct">
                <Card className="m-4 w-50 formUpdateProduct">
                    <h1>Modificar Producto</h1>
                    <Card.Body>
                        <Form className="text-white box" onSubmit={submitUpdateProductHandler}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="bookTitle">
                                        <Form.Label className="labelForm">Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar el nombre"
                                            value={productOnScreen.name}
                                            onChange={(e) => setProductOnScreen({ ...productOnScreen, name: e.target.value })}
                                            ref={nameRef}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="bookAuthor">
                                        <Form.Label className="labelForm">Descripción</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar descripción"
                                            value={productOnScreen.description}
                                            onChange={(e) => setProductOnScreen({ ...productOnScreen, description: e.target.value })}
                                            ref={descriptionRef}
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
                                            value={productOnScreen.price}
                                            onChange={(e) => setProductOnScreen({ ...productOnScreen, price: e.target.value })}
                                            ref={priceRef}
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
                                            value={productOnScreen.stock}
                                            onChange={(e) => setProductOnScreen({ ...productOnScreen, stock: e.target.value })}
                                            ref={stockRef}
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
                                            value={productOnScreen.category}
                                            onChange={(e) => setProductOnScreen({ ...productOnScreen, category: e.target.value })}
                                            ref={categoryRef}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="bookRating">
                                        <Form.Label className="labelForm">Marca</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresar marca"
                                            value={productOnScreen.brand}
                                            onChange={(e) => setProductOnScreen({ ...productOnScreen, brand: e.target.value })}
                                            ref={brandRef}
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
                                        value={productOnScreen.image}
                                        onChange={(e) => setProductOnScreen({ ...productOnScreen, image: e.target.value })}
                                        ref={imageRef}
                                    />
                                </Form.Group>
                            </Row>

                            <div className="box-button-update">
                                <Button type="submit" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdate">Modificar</Button>
                                <Button type="button" className="mb-3 mt-2 ps-5 pe-5 botonFormAdd botonFormUpdate botonFormUpdateCancel" onClick={handleCancel}>Cancelar</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default UpdateProducts