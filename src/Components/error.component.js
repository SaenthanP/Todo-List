import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
export default function Error(props) {
    const [show, setShow] = useState(true);
    if (show) {
        console.log("hello");
        return (
          <Alert variant="danger" >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
            {props.message}
            </p>
          </Alert>
        );
      }

      
    }
