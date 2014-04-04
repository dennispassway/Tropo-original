THREE.FirstPersonControls = function ( object, domElement ) {
  this.object = object;
  this.target = new THREE.Vector3( 0, 0, 0 );

  this.domElement = ( domElement !== undefined ) ? domElement : document;

  this.movementSpeed = 250;
  this.lookSpeed = 0.5;
  this.autoForward = true;

  this.lookVertical = true;
  this.invertVertical = false;

  this.activeLook = true;

  this.heightSpeed = false;
  this.heightCoef = 1.0;
  this.heightMin = 0.0;
  this.heightMax = 1.0;

  this.constrainVertical = false;
  this.verticalMin = -90;
  this.verticalMax = 90;

  this.autoSpeedFactor = 0.0;

  this.mouseX = 0;

  this.lat = 0;
  this.lon = 0;
  this.phi = 0;
  this.theta = 0;

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.viewHalfX = 0;
  this.viewHalfY = 0;

  if ( this.domElement !== document ) {
    this.domElement.setAttribute( 'tabindex', -1 );
  }

  this.handleResize = function () {
    if ( this.domElement === document ) {
      this.viewHalfX = window.innerWidth / 2;
      this.viewHalfY = window.innerHeight / 2;
    } else {
      this.viewHalfX = this.domElement.offsetWidth / 2;
      this.viewHalfY = this.domElement.offsetHeight / 2;
    }
  };

  this.update = function( delta ) {

    if ( this.heightSpeed ) {
      var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
      var heightDelta = y - this.heightMin;
      this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );
    } else {
      this.autoSpeedFactor = 0.0;
    }

    var actualMoveSpeed = delta * this.movementSpeed;

    if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
    if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );
    if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
    if ( this.moveRight ) this.object.translateX( actualMoveSpeed );
    if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
    if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

    var actualLookSpeed = delta * this.lookSpeed;

    if ( !this.activeLook ) {
      actualLookSpeed = 0;
    }

    var verticalLookRatio = 1;

    if ( this.constrainVertical ) {
      verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );
    }

    this.lon += kanteling * actualLookSpeed;
    if( this.lookVertical ) this.lat -= -hoogte * actualLookSpeed * verticalLookRatio;

    this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
    this.phi = THREE.Math.degToRad( 90 - this.lat );
    this.theta = THREE.Math.degToRad( this.lon );

    if ( this.constrainVertical ) {
      this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );
    }

    var targetPosition = this.target, position = this.object.position;

    targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
    targetPosition.y = position.y + 100 * Math.cos( this.phi );
    targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

    this.object.lookAt( targetPosition );

  };

  this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

  function bind( scope, fn ) {
    return function () {
      fn.apply( scope, arguments );
    };
  };

  this.handleResize();
};