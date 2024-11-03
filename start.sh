#!/bin/bash

# Start both servers in the background
yarn workspace backend start &
PID1=$!
yarn workspace damilah-expo start

# Trap to kill both processes on exit
trap "kill $PID1" EXIT

# Wait for both processes to end
wait