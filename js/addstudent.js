$(document).ready(function() {
	// For Index Page
	$("#addstudentbutton").click(function(){
		$("body").slideUp('slow', function() {
			$.ajax({url: "form.html", success: function(result){
				$("body").html(result);
			  }});
		}).slideDown();
		
	  });
	  
	  $("#homebutton").click(function(){
		$("body").slideUp('slow', function() {
			$.ajax({url: "index.html", success: function(result){
				$("body").html(result);
			  }});
		}).slideDown();
	  });


    var idcount=1;

    $("#studentForm").submit(function(event) {
        event.preventDefault();
		var surname = $("#surname").val();
		var name = $("#name").val();
		var phone = $("#phone").val();
        var gender = $("#gender:checked").val();
        var address = $("#address").val();
        var email = $("#emailaddress").val();
        var alphaReg = /^[A-Za-z\s]+$/;
        var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var errorFree = true;

		if (surname == "" || !(alphaReg.test(surname))) {
			errorFree = false;
			$("#surnameError").show();
		}	

		else {
			$("#surnameError").hide();
		}

		if (name == "" || !(alphaReg.test(name))) {
			errorFree = false;
			$("#nameError").show();
		}	

		else {
			$("#nameError").hide();
		}

		if (gender == null) {
			errorFree = false;
			$("#genderError").show();
		}	

		else {
			$("#genderError").hide();
        }
    
        
        if (address == "") {
			errorFree = false;
			$("#addressError").show();
		}	

		else {
			$("#addressError").hide();
        }
        


		if (!emailReg.test(email)) {
			if (email == "") {
				$("#emailError").hide();
			}
			
			else {
				$("#emailError").show();
				errorFree = false;
			}
		}	

		else {
			$("#emailError").hide();
		}


		var phoneReg = /^\d*[.]?\d*$/;
        if (!phoneReg.test(phone)) {
			if (phone == "") {
				$("#phoneError").hide();
			}
			
			else {
				$("#phoneError").show();
				errorFree = false;
			}
		}	

		

		if (errorFree) {
			$("#tableOutput tbody").append("<tr><td>" + idcount + "</td>" + 
			"<td>" + surname + "</td>" +
			"<td>" + name + "</td>" + 
            "<td>" + gender + "</td>" +
            "<td>" + address + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + phone + "</td>" + 
			"<td><button class='btnEdit'>Edit</button>" + 
			"<button class='btnDelete'>Delete</button></td></tr>").css("width", "14%");

			idcount++;

			$(".btnEdit").bind("click", Edit);
			$(".btnDelete").bind("click", Delete);
		
		};
	});
	
	

	function Edit() {
		var par = $(this).parent().parent();
		var tdSurname = par.children("td:nth-child(2)");
		var tdName = par.children("td:nth-child(3)");
        var tdGender = par.children("td:nth-child(4)");
        var tdAddress = par.children("td:nth-child(5)");
        var tdEmail = par.children("td:nth-child(6)");
		var tdPhone = par.children("td:nth-child(7)");
		var tdButtons = par.children("td:nth-child(8)");

		tdSurname.html("<input type='text' value='" + tdSurname.html() + "'>");
		tdName.html("<input type='text' value='" + tdName.html() + "'>");
        tdGender.html("<input type='text' value='" + tdGender.html() + "'>");
        tdAddress.html("<input type='text' value='" + tdAddress.html() + "'>");
        tdEmail.html("<input type='text' value='" + tdEmail.html() + "'>");
        tdPhone.html("<input type='number' onkeydown='javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))' value='" + tdPhone.html() + "'>");
		tdButtons.html("<button class='btnSave'>Save</button>");
	
		$(".btnSave").bind("click", Save);
	}


	function Save() {
		var par = $(this).parent().parent();
		var tdSurname = par.children("td:nth-child(2)");
		var tdName = par.children("td:nth-child(3)");
        var tdGender = par.children("td:nth-child(4)");
        var tdAddress = par.children("td:nth-child(5)");
        var tdEmail = par.children("td:nth-child(6)");
		var tdPhone = par.children("td:nth-child(7)");
		var tdButtons = par.children("td:nth-child(8)");

		tdSurname.html(tdSurname.children("input[type=text]").val());
        tdName.html(tdName.children("input[type=text]").val());
        tdGender.html(tdGender.children("input[type=text]").val());
        tdAddress.html(tdAddress.children("input[type=text]").val());
        tdEmail.html(tdEmail.children("input[type=text]").val());
        tdPhone.html(tdPhone.children("input[type=number]").val());
		tdButtons.html("<button class='btnEdit'>Edit</button>" + "<button class='btnDelete'>Delete</button>");

		var alphaReg = /^[A-Za-z\s]+$/;
		if (tdSurname.html() == "" || !(alphaReg.test(tdSurname.html()))) {
			alert("Surname Empty / Type In Only Alphabets!");
			tdSurname.html("<input type='text' value='" + tdSurname.html() + "'>");
			tdButtons.html("<button class='btnSave'>Save</button>");
		}


		if (tdName.html() == "" || !(alphaReg.test(tdName.html()))) {
			alert("Name Empty / Type In Only Alphabets!");
			tdName.html("<input type='text' value='" + tdName.html() + "'>");
			tdButtons.html("<button class='btnSave'>Save</button>");
		}	



		if (tdGender.html() == "Male" || tdGender.html() == "Female") {
			
		} 
		
		else {
			alert("Invalid Gender! Please Only Either 'Female' or 'Male'!");
			tdGender.html("<input type='text' value='" + tdGender.html() + "'>");
			tdButtons.html("<button class='btnSave'>Save</button>");
		}

        
        
        if (tdAddress.html() == "") {
			alert("Address Cannot Be Empty!");
			tdAddress.html("<input type='text' value='" + tdAddress.html() + "'>"); 
			tdButtons.html("<button class='btnSave'>Save</button>");
		}	


        var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (emailReg.test(tdEmail.html())) {
			if (tdEmail.html() == "") {
			}

			else {
				/* alert("Valid Email Format"); */		// For Valid Email Format
			}
		}

		else if (tdEmail.html() == !" ") { 			// For Empty String
			/* alert("Empty Stringf"); */

		}

		else { 										//String but invalid email format
			alert("Invalid Email Format");
			tdEmail.html("<input type='text' value='" + tdEmail.html() + "'>"); 
			tdButtons.html("<button class='btnSave'>Save</button>");
		}

		




        $(".btnSave").bind("click", Save);
		$(".btnEdit").bind("click", Edit);
		$(".btnDelete").bind("click", Delete);	

		empty();
	}

	function Delete() {
		var par = $(this).parent().parent(); 
		par.remove();
	}
});
