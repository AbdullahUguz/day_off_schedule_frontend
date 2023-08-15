import React from 'react'
import { Container } from 'react-bootstrap'

function ErrorPage() {
    return (
        <div>
            <Container style={{ marginTop: 6 + "em" ,justifyContent:"center"}}>
                <div className='mt-5'>
                    <h2 className='text-center'>PAGE NOT FOUND!!!</h2>
                </div>
            </Container>
        </div>
    )
}

export default ErrorPage
