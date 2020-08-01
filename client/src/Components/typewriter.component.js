import React from 'react';

import '../App.css';

import Typewriter from 'typewriter-effect';

export default function TypeWriterEffect() {


    return (
        <Typewriter
            options={{

                autoStart: true,
                loop: true,
            }}
            onInit={(typewriter) => {
                typewriter.typeString('Enter a Task!')
                    .pauseFor(250)
                    .deleteAll()
                    .start();
            }}
        />


    );
}
