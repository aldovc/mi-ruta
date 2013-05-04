window.hack = {};
(function() {
	var h = hack;
	// hack.app = {};
	// app = hack.app;
	h.map = null;
	h.routes = [];
	h.endpoints = null;
	h.origin = null;
	h.destiny = null;
	h.init = function() {
		var mapOpts = {
          center: new google.maps.LatLng(20.65965, -103.34963),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapOpts);
		this.endpoints = new markers( this.map, null, {autoinit: true} );

		this.bindControllers();
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
		if( h.endpoints.get(0) !== -1 ) {
			h.endpoints.set( 0, coord, null);
		}
		else {
			h.endpoints.add( coord );
		}
	};

	h.setDestiny = function( coord ) {
		if( h.endpoints.get(1) !== -1 ) {
			h.endpoints.set( 1, coord, null);
		}
		else {
			h.endpoints.add( coord );
		}
	};

	h.getUserLocation = function( callback ) {
		var me = this;
		if (navigator.geolocation) {
			clog('getting location, please wait...');
			navigator.geolocation.getCurrentPosition(function (position) {
				var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				if( typeof callback === 'function') {
					callback( latLng );
				}
			});
		}
		else {
			return -1;
		}
	};

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


	h.bindControllers = function() {
		var me = this;
		$('#getLocationBtn').click( function() {
			me.getUserLocation( function( latLng ) {
				me.setOrigin( latLng );
				me.map.panTo( latLng );
			});
		});

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

			me.searchAddress( origin, function( result ) {
				me.setOrigin( result );
			});

			me.searchAddress( destiny, function( result ) {
				me.set( result );
			});
		});

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
	};
})();

hack.init();