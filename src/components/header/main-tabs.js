import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const MainTabs = (props) => {
   return (
        <Container >
        <Row className="top-matches">                                     
          <a href="/upcoming" className="col-sm-4 home-tabs-active">
                <span className="col-sm-11 main-header">Upcoming</span>
            </a>                                                            
            <a href="/highlights" className="col-sm-4 home-tabs">             
                <span className="col-sm-11 main-header">Highlights</span>
            </a>                                                            
            <a href="/tomorrow" className="col-sm-4 home-tabs">     
                <span className="col-sm-11 main-header">Tomorrow</span>
          </a>                                                              
        </Row>      
       </Container>
   )

}

export default MainTabs;
