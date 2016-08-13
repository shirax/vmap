import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Locations } from '../api/locations.js'
import geojson from '../../public/json/locations.js'

class AddForm extends Component {

  handleSubmit (event) {
    event.preventDefault();
    Locations.insert({
      coordinates: this.props.coordinates,
      name: ReactDOM.findDOMNode(this.refs.name).value.trim()
    })
  }

  render () {
    return <div id='add-form' style={{display: this.props.coordinates ? '' : 'none'}}>
        <form>
            <input type='text' ref='name'></input>
            <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </form>
    </div>
  }

}

export default class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      addCoordinates: null
    }
  }

  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXV2YWRtIiwiYSI6ImNpcnMxbWx1eDAwZTloam5oMXdqN2R6bDYifQ.LGjBhkdSjDCEHcw6iNjpxg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [34.8, 31.2],
      zoom: 6
    });

    /* this.map.on('click', (e) => {
     *   this.setState({
     *     addCoordinates: e.lngLat
     *   })
     * })*/

    geojson.features.map((marker) => {
        var el = document.createElement('i');
        el.className = 'marker';
        el.style.backgroundImage = 'url(/img/' + marker.properties.icon + '.svg)';
        el.style.width = 40 + 'px';
        el.style.height = 40 + 'px';

        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(this.map);
    });

  }

  componentWillUnmount () {
    this.map.remove();
  }

  render () {
    return (
      <div id='map-container'>
          <div id='map'></div>
          <AddForm coordinates={this.state.addCoordinates} />
      </div>
    );
  }

}
