package main

deny[msg] {
  input.services[svc].image == img
  endswith(img, ":latest")
  msg := sprintf("Service %s uses 'latest' tag 'latest', not allowed", [svc])
}