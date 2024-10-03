# List out the tasks available
default:
  @just --list

# Install the dpendencies and startup Visual Studio Code and have it run our application
code:
  @cd frontend && code . 

# Do an npm install on the frontend
npm-install: (_npm-project "i")
  echo "Installing Node Packages for the frontend project"

# do an npm ci install on the frontend
npm-install-ci: (_npm-project "ci")
  echo "Doing CI install of node packages for course materials and scratch"

@_npm-project c:
  echo "Installing dependencies and getting you setup.."
  cd frontend && npm {{c}} -s

