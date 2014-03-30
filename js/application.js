  var map;
  var processedFiles = 0;

  function handleFileSelect(evt) {

      var files = evt.target.files; // FileList object
      // files is a FileList of File objects. List some properties.
      var output = [];
      var fileCount = 0;
      for (var i = 0, f; f = files[i]; i++) {
          if (!f.type.match('image.*')) {
              continue;
          }
          fileCount++;

          //initialize reader
          var reader = new FileReader();

          //Add progress information to reader
          reader.numOfFiles = files.length;

          reader.onloadend = function(e) {
              //Get all the exif data
              var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
              var gps = {
                  latitudeRef: exif.GPSLatitudeRef,
                  latitude: exif.GPSLatitude,
                  longitudeRef: exif.GPSLongitudeRef,
                  longitude: exif.GPSLongitude
              };
              //convert to google maps format coordinates 
              gps = convertToGoogleGps(gps);
              //If there is GPS info, place marker
              if (gps) addMarker(gps);

              //Update progress bar
              processedFiles++;
              $(progressBar).attr('style', 'width: '+ (processedFiles/this.numOfFiles)*100 + '%;');
          };


          reader.readAsBinaryString(f);

          //output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
      }

      //$(inputFileList).html('<ul>' + output.join('') + '</ul>');
      fileCount === 1 ? $(fileInputSelection).val(fileCount + ' file selected') : $(fileInputSelection).val(fileCount + ' files selected');
  }
  $(fileSelection).change(handleFileSelect);


  function initialize() {
      var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 3
      };
      map = new google.maps.Map($(mapCanvas)[0], mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);




  function addMarker(gps) {
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(gps.latitude, gps.longitude),
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

  function convertToGoogleGps(gps) {
      if (!(gps.latitude && gps.longitude)) return undefined; // No GPS info  

      // convert from deg/min/sec to decimal for Google  
      var fLat = (gps.latitude[0] + gps.latitude[1] / 60 + gps.latitude[2] / 3600) * (gps.latitudeRef == "N" ? 1 : -1);
      var fLong = (gps.longitude[0] + gps.longitude[1] / 60 + gps.longitude[2] / 3600) * (gps.longitudeRef == "W" ? -1 : 1);

      return {
          latitude: fLat,
          longitude: fLong
      };
  }
