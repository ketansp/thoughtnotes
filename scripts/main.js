"use strict";

console.log('\'Allo \'Allo!'); // Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });
// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
// const EditorJS = require('@editorjs/editorjs')
// const Header = require('@editorjs/header');
// const CodeTool = require('@editorjs/code');
// const Delimiter = require('@editorjs/delimiter')
// const List = require('@editorjs/list')
// const Quote = require('@editorjs/quote')
// const SimpleImage = require('@editorjs/simple-image')
// const Table = require('@editorjs/table')
// const InlineCode = require('@editorjs/inline-code')
// const Paragraph = require('@editorjs/paragraph')
// const Warning = require('@editorjs/warning')
// const Marker = require('@editorjs/marker')
// const Underline = require('@editorjs/underline')
// Add the following code if you want the name of the file appear on select

$('.custom-file-input').on('change', function () {
  var fileName = $(this).val().split('\\').pop();
  $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
});
'use strict';

var currentSidebarBackground;
var availableBackgrounds = ['sidebar-background-1', 'sidebar-background-2', 'sidebar-background-3', 'sidebar-background-4', 'sidebar-background-5', 'sidebar-background-6', 'sidebar-background-7', 'sidebar-background-8', 'sidebar-background-9', 'sidebar-background-10', 'sidebar-background-11', 'sidebar-background-12', 'sidebar-background-13', 'sidebar-background-14', 'sidebar-background-15', 'sidebar-background-16', 'sidebar-background-17', 'sidebar-background-18', 'sidebar-background-19'];

function changeBackground() {
  var newBackground = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];

  if (currentSidebarBackground) {
    document.getElementById('sidebar-wrapper').classList.remove(currentSidebarBackground);
  }

  document.getElementById('sidebar-wrapper').classList.add(newBackground);
  currentSidebarBackground = newBackground;
} // changeBackground();
// setInterval(changeBackground, 30000);
"use strict";

var existingData;

function loadData() {
  existingData = localStorage.getItem('editor');
  existingData = existingData ? JSON.parse(existingData) : {};
}

loadData();
var editor = new EditorJS({
  holder: 'editor',
  autofocus: true,
  data: existingData,
  tools: {
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 3
      }
    },
    code: CodeTool,
    delimiter: Delimiter,
    checklist: {
      class: Checklist,
      inlineToolbar: true
    },
    list: {
      class: List,
      inlineToolbar: true
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author'
      }
    },
    image: SimpleImage,
    table: {
      class: Table,
      inlineToolbar: true,
      config: {
        rows: 5,
        cols: 4
      }
    },
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+M'
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+W',
      config: {
        titlePlaceholder: 'Title',
        messagePlaceholder: 'Message'
      }
    },
    Marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M'
    },
    underline: Underline
  }
});

function save() {
  console.log('save function called');
  editor.save().then(function (outputData) {
    localStorage.setItem('editor', JSON.stringify(outputData));
    console.log('Article data: ', outputData);
  }).catch(function (error) {
    console.log('Saving failed: ', error);
  });
}

function reset() {
  editor = new EditorJS({
    holder: 'editor'
  });
  var div = document.getElementById('editor');

  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  localStorage.setItem('editor', JSON.stringify({}));
  console.log('clear function called');
}

function exportData() {
  editor.save().then(function (outputData) {
    saveJSON(outputData, 'thought-notes-export.json');
  }).catch(function (error) {
    console.log('Saving failed: ', error);
  });
}

function validateData(data) {
  var isValid = true;

  if (!data) {
    isValid = false;
  }

  if (isValid && (!data.version || !data.blocks || !Array.isArray(data.blocks))) {
    isValid = false;
  }

  if (isValid) {
    data.blocks.forEach(function (block) {
      if (!block || !block.type || !block.data) {
        isValid = false;
      }
    });
  }

  return isValid;
} // var fileList;
// function onImportFileChange(event) {
//   fileList = event.target.files;
//   console.log(JSON.stringify(fileList[0]))
//   //TODO do something with fileList.  
// }


function importData() {
  //reset();
  var files = document.getElementById('imported-file').files;
  var fileReader = new FileReader();
  var formatted;

  fileReader.onload = function (e) {
    var result = JSON.parse(e.target.result);
    editor = new EditorJS({
      holder: 'editor',
      autofocus: true,
      data: result,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3
          }
        },
        code: CodeTool,
        delimiter: Delimiter,
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author'
          }
        },
        image: SimpleImage,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 5,
            cols: 4
          }
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M'
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message'
          }
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        underline: Underline
      }
    });
  };

  fileReader.readAsText(files.item(0));
} //save periodically


setInterval(save, 20000);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function saveJSON(data, filename) {
  if (!data) {
    console.error('No data');
    return;
  }

  if (!filename) filename = 'console.json';

  if (_typeof(data) === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], {
    type: 'text/json'
  }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}