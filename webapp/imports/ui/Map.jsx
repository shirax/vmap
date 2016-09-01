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
    if (!this.props.coordinates)
      return <div></div>

    return(
        <div id='add-form' className='popup'>
            <form>
                <input type='text' ref='name'></input>
                <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
                <button className="close-button" onClick={(e) => {
                  this.props.resetAddCoordinates()
                  e.preventDefault()
                }}>Close</button>

            </form>
        </div>
      );
  }

}


class PlaceInfo extends Component {

  render () {
    if (!this.props.place)
      return <div></div>

    return (
      <div id='place-info' className='popup'>
        <h2>{this.props.place.properties.Name}</h2>
        <img src={"/img/" + this.props.place.properties.icon + ".svg"}/>
        <div>
        <button className="close-button" onClick={(e) => {
            this.props.resetPlaceChosen()
            e.preventDefault()
          }}>Close</button>
        </div>
      </div>
    )
  }
}

export default class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      addCoordinates: null,
      placeChosen: null,
    }
    getMarkerInfo = this;
  }


  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXV2YWRtIiwiYSI6ImNpcnMxbWx1eDAwZTloam5oMXdqN2R6bDYifQ.LGjBhkdSjDCEHcw6iNjpxg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [34.8, 31.2],
      zoom: 6
    });

    this.map.on('click', (e) => {
      if (this.map.getZoom() > 15) {
        this.setState(Object.assign({}, this.state, {addCoordinates: e.lngLat}))
      }
    })


    geojson.features.map((marker) => {
        var el = document.createElement('i');
        el.className = 'marker';
        el.style.backgroundImage = 'url(/img/' + marker.properties.icon + '.svg)';
        el.style.width = 40 + 'px';
        el.style.height = 40 + 'px';
        el.addEventListener('click', function() {
            getMarkerInfo.setState(Object.assign({}, this.state, {placeChosen: marker}));
            });
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
          <AddForm coordinates={this.state.addCoordinates} resetAddCoordinates={() => {
            this.setState({addCoordinates: null})
          }} />
          <PlaceInfo place={this.state.placeChosen} resetPlaceChosen={() => {
            this.setState({placeChosen: null})
          }}/>
      </div>
    );
  }

}
