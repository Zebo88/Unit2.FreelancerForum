// Declare variables:
const names = ["Carol", "Derek", "Susan", "Josh", "Kristen", "Eric", "Anna", "Ava", "Jacob", "Harry"];
const prices = [70, 50, 40, 65, 50, 100, 60, 45, 90, 80, 70];
const occupations = ["Teacher", "Programmer", "Gardener", "Driver", "Writer"];
const freelancers = [
  { name: "Alice", occupation: "Writer", price: 30 },
  { name: "Bob", occupation: "Teacher", price: 50 },
];
const maxFreelancers = 12;
let index = 0;

//Create an interval that will add a freelancer to the table each second:
const addIntervalId = setInterval(addFreelancer, 3000);

render(); // Render the initial state.

/**
 * Update the DOM to reflect the current state.
 */
function render() {
  // Render the freelancers:
  const tableBody = document.querySelector("#table-body");
  const freelancerElements = freelancers.map((freelancer) => {
    //Add table row:
    const element = document.createElement("tr");
    //Add name, price, and occupation cells to row:
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");

    //Set the name, price, and occupation text content for each cell:
    c1.textContent = freelancer.name;
    c2.textContent = freelancer.occupation;
    c3.textContent = "$" + freelancer.price;
    //Add the name, price, occupation cells to the row:
    element.appendChild(c1);
    element.appendChild(c2);
    element.appendChild(c3);

    return element;
  });

  tableBody.replaceChildren(...freelancerElements);

}

/**
 * Add a freelancer to the array:
 */
function addFreelancer() {
  //Declare variables used to obtain the next freelancer name, price, and occupation:
  const pr = prices[index];
  const FLName = names[index];
  const occ = occupations[Math.floor(Math.random() * occupations.length)];
  index++;
    /** Note: 
     * I decided to display a freelancer in the order of the array list instead of randomizing it
     * (which would be easy using the Math.floor(Math.random() * [array].length) method in the addFreelancer function). 
     * I left the occupation as random to show that I know how to select a randomized element of an array list.
     * I did it this way because it would more closely reflect a real program that would store
     * a list of users and their price that I could then update later when each user changed their price
     * or if they no longer wished it to be listed.
    * */

  //Add freelancer to array list:
  freelancers.push({ name: FLName, occupation: occ, price: pr });

  //Update average starting price:
  const avg = averagePrice();
  const paragraph = document.querySelector(".avgPrice");
  paragraph.textContent = `The average starting price is $${avg}.`

  //Create another freelancer:
  render();

  // TODO: Stop adding freelancers if we've reached the maximum number:
  if(freelancers.length >= maxFreelancers){
    clearInterval(addIntervalId);
  }

}
/**
 * Update avarage starting price to reflect the current average:
 */
function averagePrice() {
  const initialValue = 0;
  const avgPrices = freelancers.reduce((acc, freelancer) => 
    (Math.round(acc + freelancer.price / freelancers.length)), initialValue);
  return avgPrices;
}

/***************************** END OF PROGRAM *****************************/