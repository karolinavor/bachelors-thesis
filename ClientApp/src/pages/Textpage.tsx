import React from 'react';

export default function Textpage() {
    return (
        <div>
          <h1>Textpage</h1>
          <p>Text test</p>
          <div>
            <button className="Button">Button</button>
          </div>
          <div>
            <a className="Link" href="/">Link</a>
          </div>
          <div>
            <label htmlFor="test">Label</label>
            <input type="text" placeholder="Input" id="test"/>
          </div>
          <div>
            <label htmlFor="test2">Label</label>
            <textarea placeholder="Text" id="test2"/>
          </div>
        </div>
    )
}