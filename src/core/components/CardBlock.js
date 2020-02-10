import React from 'react'
import { Card } from 'react-bootstrap'


const CardBlock = (props) => {

  return (
    <Card key={props._id} style={{ width: '12rem', height: '15rem' }}>
      <Card.Img src="/images/scroll.png" />
      <Card.Title style={{position: 'absolute', color:'brown', textAlign:'center', width:'8rem', marginLeft:'15%', marginTop:'40px'}}>{props.title}</Card.Title>
      <Card.Body>
        <Card.Text>
          {props.keyTerms}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardBlock;