import React, { useState } from 'react';
import '../App.css';
import "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
export default function Error(props) {
    const [show, setShow] = useState(true);
    if (show) {
        return (
          <Alert variant="danger" >
            <Alert.Heading>Error!</Alert.Heading>
            <p>
            {props.message}
            </p>
          </Alert>
        );
      }

      
    }
