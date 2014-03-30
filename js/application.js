  var map;

  function handleFileSelect(evt) {

      var files = evt.target.files; // FileList object
      // files is a FileList of File objects. List some properties.
      var output = [];
      for (var i = 0, f; f = files[i]; i++) {
          if (!f.type.match('image.*')) {
              continue;
          }

          var reader = new FileReader();

          reader.onload = (function(theFile) {
              return function(e) {
                  //Create an img element with the image
                  var img = $('<img class="gpsImage">'); 
                  img.attr('src', e.target.result);
                  img.attr('exif', true);
                  img.attr('style', "width: 10%; ");
                  img.appendTo(fileArea);
              };
          })(f);

          reader.readAsDataURL(f);

          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
      }
      $(inputFileList).html('<ul>' + output.join('') + '</ul>');

      i !== 1 ? $(fileInputSelection).val(i + ' files selected') : $(fileInputSelection).val(i + ' file selected');
  }
  $(fileSelection).change(handleFileSelect);


  function initialize() {
      var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
      };
      map = new google.maps.Map($(mapCanvas)[0], mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);




  function addMarker() {
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(-25.363882, 131.044922),
          map: map,
          animation: google.maps.Animation.DROP,
          title: "I am a picture!"
      });
  }

   //Method to delay dropping each marker
   // function drop() {
   //     for (var i = 0; i < markerArray.length; i++) {
   //         setTimeout(function() {
   //             addMarkerMethod();
   //         }, i * 200);
   //     }
   // }
