window.hack = {};

(function() {
	var h = hack;

	h.map = null;
	h.routes = [];
	h.endpoints = null;
	h.init = function() {
		var mapOpts = {
          center: new google.maps.LatLng(20.65965, -103.34963),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapOpts);
		this.endpoints = new markers( this.map, null, {autoinit: true} );

		bindContollers();
	};

	h.addRoute = function( data, coords ) {
		h.routes.push( new route( data, this.map, coords, {autoinit: true} ) );
	};

	h.searchAddress = function( address, callback, backup ) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if(callback && typeof callback === 'function') {
					callback(results);	
				}
			}
			else {
				if(backup && typeof backup === 'function') {
					backup(results);	
				}
			}
		});
	};

	h.setEndpoints = function( origin, destiny ) {
		this.endpoints.set( 0, origin, null);
		this.endpoints.set( 1, destiny, null);
	};

	h.setOrigin = function( coord ) {
		cdir(this);
		if( h.endpoints.get(0) !== -1 ) {
			h.endpoints.set( 0, coord, null);
		}
		else {
			clog('adding latlng');
			h.endpoints.add( coord );
		}
	};

	h.getUserLocation = function() {
		var me = this;
		// Check for geolocation support
		if (navigator.geolocation) {
			// Use method getCurrentPosition to get coordinates
			navigator.geolocation.getCurrentPosition(function (position) {
				// Access them accordingly
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				cdir(latlng);
				me.setOrigin( latlng );
				alert(position.coords.latitude + ", " + position.coords.longitude);
				var lol = new google.maps.Marker( {position: latlng, map: me.map} );
			});
		}
	}

	/** Bind view-controllers */
	function bindContollers() {
		$('#searchAddrBtn').click( function() {
			var origin = $('#originInput').val(),
				destiny = $('#destinyInput').val(),
				regex = new RegExp('guadalajara', 'i');

			if( regex.test( origin ) === false ) {
				origin += ' Guadalajara';
			}
			if( regex.test( destiny ) === false ) {
				destiny += ' Guadalajara';
			}

			h.searchAddress( origin, function( result ) {
				origin = result[0].geometry.location;
				h.searchAddress( destiny, function( result ) {
					destiny = result[0].geometry.location;
					h.setEndpoints( origin, destiny );
				});
			});
		});
	}

	/** MODELS **/

	/**
	* Markers
	*/
	function markers( map, coords, opts) {
		this.map = null;
		this.coords = [];
		this.opts = null;
		this.markers = [];

		this.init = function() {
			var that = this;
			if( map ) {
				this.map = map;	
			}
			else {
				throw "No map passed as parameter for the Position Collection";
			}
			
			if( coords ) {
				this.coords = coords;
				for(var i = 0, len = this.coords.length; i < len; i++ ) {
					this.add( this.coords[i], null);
				}
			}
			if( opts ) {
				this.opts = opts;
			}
		};	

		this.add = function( coord, listener ) {
			cdir(this.map);
			this.markers.push( new google.maps.Marker( {position: coord, map: this.map} ) );
		};

		this.set = function( index, coord, opts) {
			if( this.markers[index] ) {
				this.markers[index].setPosition( coord );
			}
		};

		this.get = function( index ) {
			if( this.markers[index] ) {
				return this.markers[index];
			}
			return -1;
		};

		if( opts.autoinit === true ) {
			this.init();
		}
	}

	/**
	* Model for a route
	*/
	function route( data, map, coords, opts ) {
		this.id = data.id || '';
		this.name = data.name || '';
		this.map = null;
		this.coords = [];
		this.opts = null;
		this.path = null;

		this.init = function() {
			var that = this;
			if( map ) {
				this.map = map;	
			}
			else {
				throw "No map passed as parameter for the Position Collection";
			}
			
			if( coords ) {
				this.coords = coords;
			}
			if( opts ) {
				this.opts = opts;
			}

			this.path = new google.maps.Polyline({					// Create the polylines for to join the markers
				path: that.coords,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
		};

		this.addPosition = function( latLng, lng ) {
			if( arguments.length === 1 ) {
				this.coords.push( latLng );
			}
			else if( arguments.length === 2 ) {
				var newLatLng = new google.maps.LatLng( latLng, lng );
				this.coords.push( newLatLng );
			}

			this.path = new google.maps.Polyline({
				path: this.coords,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
		};

		this.showPath = function() {
			this.path.setMap( this.map );
		};

		this.hidePath = function() {
			this.path.setMap( null );
		};

		if( opts.autoinit === true ) {
			this.init();
		}
	}
})();

hack.init();

function testApp() {
	var fakeRotues = [],
		route2 = [];
	for(var i=0; i<10; i++) {
		fakeRotues.push( new google.maps.LatLng(20.6998+(i/1000), -103.3489+(i/1000)) );
	}
	for(var i=0; i<30; i++) {
		if(i<10) {
			route2.push( new google.maps.LatLng(20.6498+(i/1000), -103.34589+(i/1000)) );	
		}else
		{
			route2.push( new google.maps.LatLng(20.6498+(i/1000), -103.34589+(i/1000)) );	
		}
		
		
	}
	hack.addRoute( {id:'646', name:'Ruta 646'}, fakeRotues );
	hack.addRoute( {id:'646', name:'Ruta 646'}, route2 );
	hack.routes[0].showPath();
	hack.routes[1].showPath();

	hack.getUserLocation();
}