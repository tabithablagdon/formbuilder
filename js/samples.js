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
