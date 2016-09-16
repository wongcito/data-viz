

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
	 var averageDeliveryTime = totalDeliveryTime()/numberOfDeliveries;
	 var numberOfPizzasDelivered = pizzasDelivered();
	 var totalSales = calculateTotal();
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
			console.log(quality);
			return quality;
		}


	 //Display key figures
	 d3.select(summary)
	 	.append("p").text("The total number of deliveries was " + numberOfDeliveries)
		.append("p").text("The total number of pizzas delivered was " + pizzasDelivered())
		.append("p").text("The average delivery time was " + averageDeliveryTime + " minutes")
		.append("p").text("The total amount of sales was of  " + totalSales + " dollars")
		.append("p").text("The total number of feedbacks received were " + numberOfFeedbacks)
		.append("p").text("The number of high quality feedbacks was " + typeOfFeedback[2] + ", the number of medium quality feedbacks was " + typeOfFeedback[1] + " and the number of low quality feedbacks was " + typeOfFeedback[0]);

		//Display bar chart

		renderBarChart(deliveryData);


}
