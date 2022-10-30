import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import "./MessageForm.css"

const MessageForm = () => {
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <>
    <div className="messages-output"></div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={11}>
                    <Form.Group>
                        <Form.Control typw="text" placeholder='your message'>

                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button variant='primary' type='submit' style={{width:'100%',backgroundColor:'purple'}}>
                        <i className="fas fa-paper-plane"></i>

                    </Button>
                </Col>
            </Row>

        </Form>
    </>
  )
}

export default MessageForm