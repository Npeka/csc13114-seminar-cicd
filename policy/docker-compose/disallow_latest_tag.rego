package main

deny contains msg if {
  some svc
  img := input.services[svc].image
  endswith(img, ":latest")
  msg := sprintf("Service %s uses 'latest' tag, not allowed", [svc])
}