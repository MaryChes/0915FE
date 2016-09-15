/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 * 
 * 1. When the page is loaded all form fields should be dispabled except
 *    for the dropdown to select a user
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each employee in the list
 *
 * 5. Make the users email display as subtext in the dropdown
 * 
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an employee is selected the form fields should be enabled
      and populated with the data for the selected employee
 *
 * . Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  email      - required, use email validation
 *	  Home Phone - use phoneUS validation
 *	  Cell Phone - use phoneUS validation
 *	  Password   - required, 8 characters, 1 lowercase, 1 uppercase, 1 digit, and 1 specal char
 *	               REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^\&*\)\(+=._-])[0-9a-zA-Z!@#\$%\^\&*\)\(+=._-]{8,}$/
 *                   
 * 8. Use a custom message for password pattern validation
 *
 * 9. Make the color of the error text red
 *
 * 10. Add a Verify Password field to the form and add validation to make 
 *    sure the 2 password fields are equal to eachother
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data  
 *
 */

$(function(){
 	 $("#updateEmployeeForm :input").prop("disabled", true);

 	$("#employeeId").change(function(){
 		$("#updateEmployeeForm :input").prop("disabled", false);

 		$.get( "http://localhost:1337/employee/" + $(this).val(), function( data ) {
	  		
	  		$.each(data, function(name, val){
			    var el = $('[name="'+name+'"]');
			    var type = el.attr('type');

			    switch(type){
			        case 'checkbox':
			            el.attr('checked', 'checked');
			            break;
			        case 'radio':
			            el.filter('[value="'+val+'"]').attr('checked', 'checked');
			            break;
			        default:
			            el.val(val);
			    }
			});

		});
 	})
 	
 	jQuery.validator.addMethod("passwordCheck", function(value, element) {
  
  return this.optional( element ) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^\&*\)\(+=._-])[0-9a-zA-Z!@#\$%\^\&*\)\(+=._-]{8,}$/.test( value );
}, 'Please enter a valid password address.');
	$( "#updateEmployeeForm" ).validate({
         rules: {
           firstName: {
               required: true,
                minlength: 2
           },

           lastName: {
                required: true,
                minlength: 2
           },

           email: {
               	required: true,
                email: true
           },

           homePhone: {
      			required: true,
      			phoneUS: true
    		},

    		cellPhone: {
      			required: true,
      			phoneUS: true
    		},

    		password: {
    			required: true,
    			minlength: 8,
    			passwordCheck: true
    		},

    		verifyPassword: {
      			equalTo: "#password"
    		}
         },

  		errorClass: "text-danger",

  		 messages: {
    	 	password: {
    	 		passwordCheck: "Password should be at least 8 characters, 1 upppercase, 1 lowercase, 1 special character, and one number",
    	 		required: "Required! We wish to keep profile safe."
  				}
		}
       
    });

})