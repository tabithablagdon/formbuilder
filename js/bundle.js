(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const FormBuilder = require('./util.js')();
const samples = require('./samples.js');

$(document).ready(() => {

  $('button').on('click', $e => {
    var specIndex = $($e.target).data('sample');
    var specData = samples[specIndex-1];

    $('#spec').html(`Sample spec ${specIndex} looks like: <br> ${JSON.stringify(specData)}`);

    FormBuilder.formBuilder(specData, $("#result"));
  });

});

},{"./samples.js":2,"./util.js":3}],2:[function(require,module,exports){
const samples = [
  {
    title:"Comment Form",
    desc:"Make a comment on the blog post!",
    params:[
      {
        type: 'text',
        maxlength: 100,
        name: 'title'
      },
      {
        type: 'email',
        name: 'email'
      },
      {
        type:'textarea',
        name:'body'
      },
      {
        type:'checkbox',
        name:'subscribe',
        label:'mail me when someone comments on my comment!'
      }
    ]
  },
  {
    title:"Car Order Form",
    desc:"Choose your car!",
    params:[
      {
        type:'select',
        values:['red','blue','green','black','white','taupe'],
        name: 'color'
      },
      {
        type: 'checkbox',
        values:['fog-lights','radio','a-c','wheels','headlights'],
        name: 'options'
      },
      {
        type:'string',
        minLength:7,
        maxLength:7,
        name:'vanityPlate',
        optional:true
      },
      {
        type:'int',
        name:'price',
      }
    ]
  },
  {
    title:"New User Creator",
    desc:"Create a new user account",
    params:[
      {
        type:'string',
        maxLength:20,
        name:'fname',
        label:'First Name'
      },
      {
        type:'string',
        maxLength:20,
        name:'lname',
        label:'Last Name'
      },
      {
        type:'date',
        name:'dob',
        label:'Date of Birth'
      },
      {
        type:'email',
        multiple:true,
        maxCount:4,
        name:'emails',
        label:'Email Addresses'
      },
      {
        type: 'string',
        name: 'addr1',
        label: 'Street Address'
      },
      {
        type: 'string',
        name: 'city'
      },
      {
        type: 'state',
        name: 'state',
      },
      {
        type: 'int',
        name: 'zipcode',
        maxValue: 99999,
        minValue: 0,
        label: 'ZIP'
      },
    ]
  }
];

module.exports = samples;

},{}],3:[function(require,module,exports){
const FormBuilder = () => {

  // Helper function to populate select field options
  const _addOptions = (values) => {
    let options = '';

    // Create option element for each select field value
    values.forEach(option => {
      options += `<option value="${option}">${option}</option>\n`;
    });

    return options;
  };

  // Helper function to create checkbox fields
  const _createCheckboxFields = (checkBoxData) => {
    let checkBoxFields = '';
    let values = checkBoxData.values || [checkBoxData.label];
    let name = checkBoxData.name;

    // Create checkbox and label for each value
    values.forEach(label => {
      checkBoxFields += `
        <input type="checkbox" name="${name}" value="${label}" id="${label}">\n
        <label for="${label}">${label}</label>\n
      `;
    });

    return checkBoxFields;
  };

  // Creates form fields from an array of form field specs
  const _fieldBuilder = (formFields, $el) => {
    let newField;
    let inputField;
    let optionFields;

    formFields.forEach((field, index) => {
      const fieldName = field.name.toLowerCase();
      const fieldLabel = field.label || field.name || 'Field';
      const fieldType = field.type.toLowerCase();
      const fieldId = `formField${index}`;

      // Check to see if form field is a checkbox - uniquely has label element after the input field so handling this creationg separately
      if (fieldType === 'checkbox') {
        let checkBoxFields = _createCheckboxFields(field);
        inputField = $(checkBoxFields);

        $el.append(newField);
        newField = $(`<p id=${fieldId}><label>${fieldName}:  </label></p>`)

      } else {
        // Create select field
        if (fieldType === 'select') {
          optionFields = _addOptions(field.values);
          inputField = $('<select />').attr('name', fieldName);
          inputField.html(optionFields);

        // Create textarea field
        } else if (fieldType === 'textarea') {
          inputField = $('<textarea />').attr(field);

        // Create number input field
        } else if (fieldType === 'int'){
          inputField = $('<input />').attr({
            'type': 'number',
            'name': fieldName,
            'max': field.max || field.maxValue || Number.POSITIVE_INFINITY,
            'min': field.min || field.minValue || 0
          });
          // Add zipcode pattern if field is a zipcode
          if (fieldName === 'zipcode') {
            inputField.attr('pattern', '[\d]{5}(-[\d]{4})');
          }

        // Create all other input fields
        } else {
          inputField = $('<input />').attr(field);
          // Replace 'string' field types with 'text'
          if (fieldType ==='string' || fieldType === 'state') {
            inputField.attr('type', 'text');
          }
        }

        newField = $(`<p id=${fieldId}><label>${fieldLabel}:  </label></p>`)
      }

      // Append newly created form field to the form
      $el.append(newField);
      $('#' + fieldId).append(inputField);
    });
  }

  //builds an HTML form using all information present in `spec` and places the resulting HTML in jquery element `$el`
  const formBuilder = (spec,$el) => {
    const title = spec.title;
    const description = spec.desc;
    const formFields = spec.params;

    $el.html(`
      <h2>${title}</h2>
      <h4>${description}</h4>

      <form method="post">
      <fieldset>
      <div id="fields">

      </div>
      </fieldset>

      <!-- Submit Button -->
      <input type="submit" value="Submit" class="btn" id="submit">
      </form>
      `);

      _fieldBuilder(formFields, $('#fields'));
    };

  return {
    formBuilder: formBuilder
  }
};

module.exports = FormBuilder;

},{}]},{},[1]);
