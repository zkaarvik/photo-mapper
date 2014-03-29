  function handleFileSelect(evt) {

      var files = evt.target.files; // FileList object
      // files is a FileList of File objects. List some properties.
      var output = [];
      for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
              f.size, ' bytes, last modified: ',
              f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
              '</li>');
      }
      $(inputFileList).html('<ul>' + output.join('') + '</ul>');

      i!==1 ? $(fileInputSelection).val(i + ' files selected') : $(fileInputSelection).val(i + ' file selected');

  }

  $(fileSelection).change(handleFileSelect);
