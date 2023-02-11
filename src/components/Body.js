
import React, { useState } from 'react';

export default function Body({ children, ...props }) {

    let bg = '';
    if(props.tema)
    {
        if (props.tema == 'dark')
        {
            bg = 'url(img/bg2.jpg)'
        }
        else
        {
            bg = 'url(img/bj_light.jpg)'
        }
    }
    else
    {
        bg = 'url(img/bg2.jpg)'
    }

    return (
        <div style={{backgroundImage: `${bg}`, backgroundSize: '125.5rem 100%'}}>
            {children}
        </div>
    );
  }