
import React from 'react';

const Photo = props => (
    <div className="photo-container">
    <div className="Photo">
        <div className="Picture">
            <div className="Picture-Container">
                <img src={props.src} height= "500px" width="500px"  />
            </div>
        </div>
    </div>
    </div>
);

export default Photo;