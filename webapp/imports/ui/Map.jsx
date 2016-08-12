import React, { Component } from 'react';

export default class App extends Component {

  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXV2YWRtIiwiYSI6ImNpaWN5b3Q0cTAwMGZ3ZmtyeXFkcjQwcmYifQ.OgVsYPOhzLUOOD82004IJw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  render() {
     return (
       <div id='map'></div>
    );
  }

}
