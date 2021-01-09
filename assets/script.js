/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
var searchTerm = "";
var numRecords;
console.log(numRecords)
var startYear = 0;
var endYear = 0; 
// var numberOfResults = $('#recordsCount').val();
//     console.log(numberOfResults);

function buildQueryURL() {
    var inputField = $('#searchTerm').val();
    console.log(inputField);
    numRecords = $('#recordsCount').val();
    console.log(numRecords);
    var startYear = $('#startYear').val();
    console.log(startYear);
    var endYear = $('#endYear').val();
    console.log(endYear);
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + inputField + "&" + 'begin_date=' + startYear + "0101" + "&" + "end_date=" + endYear + "1231" + "&api-key=63EeL0GaSAhcm7C0625KMimB7g8SGdvN";
    console.log(queryURL);
  

    return queryURL;
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */

function updatePage(NYTData) {
  for(var i = 0; i < numRecords; i++){
  var displayDiv = $('#article-section');
  console.log(NYTData);
  var headline = $('<h1>').text(NYTData.response.docs[i].headline.main)
  var author = $('<p>').text(NYTData.response.docs[i].byline.original)
  var articleURL = $('<a>').text("click here to read")
  articleURL.attr('href', NYTData.response.docs[i].web_url)
  var wrapper = $('<div class="wrapper">');
  wrapper.append(headline, author, articleURL)
  displayDiv.append(wrapper);
  

  }  
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

$("#searchBtn").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);

});


// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
