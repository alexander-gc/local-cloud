import { Container, Row, Col, Card } from 'react-bootstrap'
import { AiFillFolder } from 'react-icons/ai';
import { BsFileEarmarkText, BsArrow90DegUp, BsFileArrowDown } from 'react-icons/bs';
import { saveAs } from 'file-saver';

export const DirCard = ({ isDirectory, parentDirectory, pathUrl, name }) => {

    let icon = <BsFileEarmarkText color='#61AFEF' size='30' />

    if (isDirectory) icon = <AiFillFolder color='#61AFEF' size='30' />


    if (parentDirectory) icon = <BsArrow90DegUp color='#61AFEF' size='30' />

    const path = pathUrl ? `${pathUrl}-${name}` : name;
    const downloadLink = `http://localhost:5000/download/${path}`

    return (
        <Card>
            <Card.Body>
                <Container>
                    <Row>

                        <Col xs={isDirectory ? '' : 8} style={{ padding: 0 }}>
                            <Card.Text
                                style={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {icon} {name}
                            </Card.Text>
                        </Col>

                        {isDirectory ? (<> </>) : (
                            <Col
                                style={{ padding: 0, cursor: 'pointer' }}
                                className='d-flex flex-row-reverse'
                                onClick={() => saveAs(downloadLink, name)}
                            >

                                <BsFileArrowDown color='#61AFEF' size='30' />

                            </Col>

                        )}

                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
};