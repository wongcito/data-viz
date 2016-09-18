

// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks

// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {

	/* ************************************************************
	 *
	 * ADD YOUR CODE HERE
	 * (accordingly to the instructions in the HW2 assignment)
	 *
	 * 1) Filter data
	 * 2) Display key figures
	 * 3) Display bar chart
	 * 4) React to user input and start with (1)
	 *
	 * ************************************************************/

	 //Filtering data

	 var numberOfDeliveries = deliveryData.length;
	 var averageDeliveryTime = Math.round(totalDeliveryTime()/numberOfDeliveries*100)/100;
	 var numberOfPizzasDelivered = pizzasDelivered();
	 var totalSales = Math.round(calculateTotal()*100)/100;
	 var numberOfFeedbacks = feedbackData.length;
	 var typeOfFeedback = gettingQuality();

	 function totalDeliveryTime(){
		 var totalTime = 0;
		 for (i=0; i<deliveryData.length; i++){
		 	var totalTime = totalTime + deliveryData[i].delivery_time;
	 	  }
			return totalTime;
 		}

		function pizzasDelivered(){
			var totalPizzas = 0;
			for (i=0; i<deliveryData.length; i++){
				var totalPizzas = totalPizzas + deliveryData[i].count;
			}
			return totalPizzas;
		}

		function calculateTotal(){
			var total = 0;
			for (i=0; i<deliveryData.length; i++){
				var total = total + deliveryData[i].price;
			}
			return total;
		}

		function gettingQuality(){
			var quality = [0,0,0];
			for (i=0; i<feedbackData.length; i++){
				if (feedbackData[i].quality == "high"){
					quality[2] = quality[2] + 1;
				} else if (feedbackData[i].quality == "medium"){
					quality[1] = quality[1] + 1;
				} else if (feedbackData[i].quality == "low"){
					quality[0] = quality[0] + 1;
				}

			}

			return quality;
		}


	 //Display key figures with the .innerHTML method

	 document.getElementById("p1").innerHTML = "The total number of deliveries was " + numberOfDeliveries;
	 document.getElementById("p2").innerHTML = "The total number of pizzas delivered was " + pizzasDelivered();
	 document.getElementById("p3").innerHTML = "The average delivery time was " + averageDeliveryTime + " minutes";
	 document.getElementById("p4").innerHTML = "The total amount of sales was of  " + totalSales + " dollars";
	 document.getElementById("p5").innerHTML = "The total number of feedbacks received were " + numberOfFeedbacks;
	 document.getElementById("p6").innerHTML = "The number of high quality feedbacks was " + typeOfFeedback[2] + ", the number of medium quality feedbacks was " + typeOfFeedback[1] + " and the number of low quality feedbacks was " + typeOfFeedback[0];

		//Display bar chart when the page loads



		renderBarChart(deliveryData);


}

	//Function that gets executed when the checkboxes change. It's important to notice that
	//I have this function in the global scope so it's easier to call this from the html file

function dataManipulation(){
	var selectBoxCities = document.getElementById("cities");
	var selectedValueCities = selectBoxCities.options[selectBoxCities.selectedIndex].value;
	console.log(selectedValueCities);

	var selectBoxPlatform = document.getElementById("platform");
	var selectedValuePlatform = selectBoxPlatform.options[selectBoxPlatform.selectedIndex].value;
	console.log(selectedValuePlatform);

	//This array is for obtaining all the deliveries IDs so I can then use it to make a connection with the other DB
	var listOfIds = [];

	//Filtering according to cities. There should be a better and more eficient way to do this
	function checkCity(elem){
		if ((selectedValueCities === "all") && (selectedValuePlatform === "allphones")){
			return deliveryData;
		} else if ((selectedValueCities === "all") && (selectedValuePlatform === "web")){
			return elem.order_type == "web" ;
		} else if ((selectedValueCities === "all") && (selectedValuePlatform === "phone")){
			return elem.order_type == "phone" ;
		} else if ((selectedValueCities === "Boston") && (selectedValuePlatform === "allphones")) {
			return elem.area == "Boston";
		} else if ((selectedValueCities === "Boston") && (selectedValuePlatform === "web")){
			return elem.area == "Boston" && elem.order_type == "web" ;
		} else if ((selectedValueCities === "Boston") && (selectedValuePlatform === "phone")){
			return elem.area == "Boston" && elem.order_type == "phone" ;
		} else if ((selectedValueCities === "Cambridge") && (selectedValuePlatform === "allphones")) {
			return elem.area == "Cambridge";
		} else if ((selectedValueCities === "Cambridge") && (selectedValuePlatform === "web")){
			return elem.area == "Cambridge" && elem.order_type == "web" ;
		} else if ((selectedValueCities === "Cambridge") && (selectedValuePlatform === "phone")){
			return elem.area == "Cambridge" && elem.order_type == "phone" ;
		} else if ((selectedValueCities === "Somerville") && (selectedValuePlatform === "allphones")) {
			return elem.area == "Somerville";
		} else if ((selectedValueCities === "Somerville") && (selectedValuePlatform === "web")){
			return elem.area == "Somerville" && elem.order_type == "web" ;
		} else if ((selectedValueCities === "Somerville") && (selectedValuePlatform === "phone")){
			return elem.area == "Somerville" && elem.order_type == "phone" ;
		}
	}

	var filteredCities = deliveryData.filter(checkCity);
	filteredCities



	for (i=0; i<filteredCities.length; i++){
		listOfIds.push(filteredCities[i].delivery_id);
	}
	//Here I check the id to make the connection

	var filteredFeedbacks = feedbackData.filter(checkId);
	filteredFeedbacks

	//This is probably not the most optimal way to do this, as .includes is not supported in all browsers
	function checkId(el){
			return listOfIds.includes(el.delivery_id);
	}


	renderBarChart(filteredCities);

	var typeOfFeedbackFiltered = gettingQuality();
	typeOfFeedbackFiltered


	function gettingQuality(){
		var quality = [0,0,0];
		for (i=0; i<filteredFeedbacks.length; i++){
			if (filteredFeedbacks[i].quality == "high"){
				quality[2] = quality[2] + 1;
			} else if (filteredFeedbacks[i].quality == "medium"){
				quality[1] = quality[1] + 1;
			} else if (filteredFeedbacks[i].quality == "low"){
				quality[0] = quality[0] + 1;
			}

		}
		return quality;
	}

	//Here I am updating also each p element with the new values
	document.getElementById("p1").innerHTML = "The total number of deliveries was " + filteredCities.length;
	document.getElementById("p2").innerHTML = "The total number of pizzas delivered was " + pizzasDelivered();
	document.getElementById("p3").innerHTML = "The average delivery time was " + Math.round(totalDeliveryTime()/filteredCities.length*100)/100 + " minutes";
	document.getElementById("p4").innerHTML = "The total amount of sales was of  " + Math.round(calculateTotal()*100)/100 + " dollars";
	document.getElementById("p5").innerHTML = "The total number of feedbacks received were " + filteredFeedbacks.length;
	document.getElementById("p6").innerHTML = "The number of high quality feedbacks was " + typeOfFeedbackFiltered[2] + ", the number of medium quality feedbacks was " + typeOfFeedbackFiltered[1] + " and the number of low quality feedbacks was " + typeOfFeedbackFiltered[0];

	function pizzasDelivered(){
		var totalPizzas = 0;
		for (i=0; i<filteredCities.length; i++){
			var totalPizzas = totalPizzas + filteredCities[i].count;
		}
		return totalPizzas;
	}

	var numberOfDeliveries = filteredCities.length;

	function totalDeliveryTime(){
		var totalTime = 0;
		for (i=0; i<filteredCities.length; i++){
		 var totalTime = totalTime + filteredCities[i].delivery_time;
		 }
		 return totalTime;
	 }

	 function calculateTotal(){
		 var total = 0;
		 for (i=0; i<filteredCities.length; i++){
			 var total = total + filteredCities[i].price;
		 }
		 return total;
	 }






	}
