function getRepositories(){
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos?page=1`);
  req.send();
}

function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText)
  let repoList = "<ul>";
  for(var i=0;i < repos.length; i++) {
    repoList += `<li>${repos[i]["name"]} - <a href='#' data-repository=${repos[i]["name"]} onclick='getCommits(this)'>${repos[i]["url"]}</a> <a href='#' data-repository=${repos[i]["name"]} onclick='getBranches(this)'>Branches</a></li>`
  }
  repoList += "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(commit){
  let username = document.getElementById('username').value;
  let repo_name = commit.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repo_name}/commits?page=1`);
  req.send();
}

function displayCommits(event, data){
  var commits = JSON.parse(this.responseText)
  let commitList = "<ul>";
  for(var i = 0; i < commits.length; i++){
    commitList += `<li>${commits[i]["commit"]["author"]["name"]} - ${commits[i]["author"]["login"]} - ${commits[i]["commit"]["message"]}</li>`
  }
  commitList += "</ul>"
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(commit){
  let username = document.getElementById('username').value;
  let repo_name = commit.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repo_name}/branches?page=1`);
  req.send();
}

function displayBranches(event, data){
  var branches = JSON.parse(this.responseText)
  let branchesList = "<ul>";
  for(var i = 0; i < branches.length; i++){
    branchesList += `<li>${branches[i]["name"]}</li>`
  }
  branchesList += "</ul>"
  document.getElementById("details").innerHTML = branchesList;
}

// $(document).ready(function(){

//   $('form').on('submit', function(event){
//     event.preventDefault();
//     username = $('#username').val();
//     getRepositories(username);
//   })

//   $('#repositories').on('click', 'a', function(event){
//     event.preventDefault();
//     username = $('#username').val();
//     repo = $(this)[0].href;
//     getCommits(username, repo)
//   })
// })

// function getRepositories(username){
//   $.ajax({
//     method: "GET",
//     url: `https://api.github.com/users/${username}/repos`
//   }).done(function(data){
//     data.forEach(function(repo){
//       let repo_name = repo.name;
//       let repo_url = repo.url;
//       $('#repositories').append(`<p>${repo_name} - <a href=${repo.url}>commits</a></p>`)
//     })
//   })
// }

// function displayRepositories(){
//   //not used just needed to pass tests
// }

// function getCommits(username, repo){
//   $('#details').empty()
//   $.ajax({
//     method: "GET",
//     url: `${repo}/commits`
//   }).done(function(data){
//       data.forEach(function(commit){
//         let author_login = commit.committer.login;
//         let author_name = commit.commit.author.name;
//         let commit_message = commit.commit.message;
//         $('#details').append(`<p>${author_login} - ${author_name} - ${commit_message}</p>`)
//       })
//   })
// }


