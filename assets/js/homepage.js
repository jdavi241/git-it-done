var userFormEl = document.querySelector("#user-form"); //targets whole form
var nameInputEl = document.querySelector("#username"); //targets submission line 
var repoContainerEl = document.querySelector("#repos-container"); // targets container to display repos 
var repoSearchTerm = document.querySelector("#repo-search-term"); //targets <span> to display term



var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element 
    var username = nameInputEl.value.trim(); //nameInputEl targets what's typed in submision line. trim() takes off space at end of submission 

    if(username) {
        getUsersRepos(username); // passes input into getUsersRepos function
        nameInputEl.value = ""; // clears input form
    } else {
        alert("Please enter a GitHub username");
    }

    //console.log(event);
}

// Pulls data & gets repo 
var getUsersRepos = function(user) {
    //format the github api url 
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    });
}

// Display repo
var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);

    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo 
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name 
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container 
        repoEl.appendChild(titleEl);

        // apppend container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);