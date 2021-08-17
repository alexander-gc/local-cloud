import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

export const Loading = ({ title, text }) => {

    return (

        <Container className='text-center mx-auto'>

            <h5> {title} </h5>

            <Spinner animation='border' role='status'>
                <span className='visually-hidden'> {text} </span>
            </Spinner>

        </Container>

    )
}
