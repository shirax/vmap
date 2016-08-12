import React, { Component } from 'react';

class AddForm extends Component {

  render () {
    return <div id='add-form'>
        <form>
            <input type='text'></input>
        </form>
    </div>
  }

}

export default class Map extends Component {

  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXV2YWRtIiwiYSI6ImNpcnMxbWx1eDAwZTloam5oMXdqN2R6bDYifQ.LGjBhkdSjDCEHcw6iNjpxg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [34.8, 31.2],
      zoom: 6
    });

    var geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "message": "Foo",
                    "icon": "office"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        35, 32
                    ]
                }
            }
        ]
    }

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
          <AddForm/>
      </div>
    );
  }

}
