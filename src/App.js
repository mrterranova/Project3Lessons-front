import React from 'react';
import Layout from "./core/components/NavigationBar/index"
import { Jumbotron, Container } from 'react-bootstrap'
import "./style.css"

const App = () => {



  return (
<Layout>
  <h1 className="header">Words of Glory</h1>
  <div className="containerMainPg">
    <img src="/images/requestedHeader.png" alt="Words_of_Glory" id="WordsOfGlory" />
  <Jumbotron fluid style={{background:'none'}}>
  <Container>
    <div className="welcome-banner">
    <h1>Welcome to Words of Glory</h1>
    <p>This is a test site of a library that is to come. What you see here is a sample of what will be on our official site. Thank you for visiting. Any questions please direct them to No Limits Ministries at NoLimitsMinistries@mail.com</p>
    </div>
  </Container>
</Jumbotron>
  </div>
</Layout>
  )
}

export default App;
