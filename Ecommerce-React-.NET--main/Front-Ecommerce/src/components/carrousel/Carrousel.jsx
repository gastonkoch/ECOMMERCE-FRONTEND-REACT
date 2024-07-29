import Carousel from 'react-bootstrap/Carousel';
import img1 from '/public/carrousel6.png';
import img2 from '/public/carrousel7.png'
import img3 from '/public/carrousel8.png'

const Carrousel = () => {

    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img style={{ height: '60vh' }}
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ height: '60vh' }}
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ height: '60vh' }}
                        className="d-block w-100"
                        src={img3}
                        alt="Three slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Carrousel