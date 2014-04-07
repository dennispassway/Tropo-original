    var container;
    var views, scene, renderer;
    var mouseX = 0, mouseY = 0;
    var windowWidth, windowHeight;

    var views = [
    {
      left: 0,
      bottom: 0,
      width: 0.5,
      height: 1.0,
      background: new THREE.Color().setRGB( 0.5, 0.5, 0.7 ),
      eye: [ 0, 300, 1800 ],
      up: [ 0, 1, 0 ],
      fov: 30,
      updateCamera: function ( camera, scene, mouseX, mouseY ) {
        camera.position.x += mouseX * 0.05;
        camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
        camera.lookAt( scene.position );
      }
    },
    { 
      left: 0.5,
      bottom: 0,
      width: 0.5,
      height: 0.5,
      background: new THREE.Color().setRGB( 0.7, 0.5, 0.5 ),
      eye: [ 0, 1800, 0 ],
      up: [ 0, 0, 1 ],
      fov: 45,
      updateCamera: function ( camera, scene, mouseX, mouseY ) {
        camera.position.x -= mouseX * 0.05;
        camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
        camera.lookAt( camera.position.clone().setY( 0 ) );
      }
    },
    { 
      left: 0.5,
      bottom: 0.5,
      width: 0.5,
      height: 0.5,
      background: new THREE.Color().setRGB( 0.5, 0.7, 0.7 ),
      eye: [ 1400, 800, 1400 ],
      up: [ 0, 1, 0 ],
      fov: 60,
      updateCamera: function ( camera, scene, mouseX, mouseY ) {
        camera.position.y -= mouseX * 0.05;
        camera.position.y = Math.max( Math.min( camera.position.y, 1600 ), -1600 );
        camera.lookAt( scene.position );
      }
    }
    ];

    init();
    animate();

    function init() {
      container = document.getElementById( 'container' );

      for (var ii =  0; ii < views.length; ++ii ) {
        var view = views[ii];
        camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.x = view.eye[ 0 ];
        camera.position.y = view.eye[ 1 ];
        camera.position.z = view.eye[ 2 ];
        camera.up.x = view.up[ 0 ];
        camera.up.y = view.up[ 1 ];
        camera.up.z = view.up[ 2 ];
        view.camera = camera;
      }

      scene = new THREE.Scene();

      geometry  = new THREE.SphereGeometry( 200 )
      var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
      var bal = new THREE.Mesh(geometry, material);
      var bal2 = bal;
      scene.add(bal);

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );

      container.appendChild( renderer.domElement );

      document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    }

    function onDocumentMouseMove( event ) {

      mouseX = ( event.clientX - windowWidth / 2 );
      mouseY = ( event.clientY - windowHeight / 2 );

    }

    function updateSize() {

      if ( windowWidth != window.innerWidth || windowHeight != window.innerHeight ) {

        windowWidth  = window.innerWidth;
        windowHeight = window.innerHeight;

        renderer.setSize ( windowWidth, windowHeight );

      }

    }

    function animate() {

      render();

      requestAnimationFrame( animate );
    }

    function render() {

      updateSize();

      for ( var ii = 0; ii < views.length; ++ii ) {

        view = views[ii];
        camera = view.camera;

        view.updateCamera( camera, scene, mouseX, mouseY );

        var left   = Math.floor( windowWidth  * view.left );
        var bottom = Math.floor( windowHeight * view.bottom );
        var width  = Math.floor( windowWidth  * view.width );
        var height = Math.floor( windowHeight * view.height );
        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.enableScissorTest ( true );
        renderer.setClearColor( view.background );

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render( scene, camera );
      }

    }