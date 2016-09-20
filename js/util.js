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
        newField = $(`<p id=${fieldId}><label>${fieldName}:  </label></p>`);

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

        newField = $(`<p id=${fieldId}><label>${fieldLabel}:  </label></p>`);
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
