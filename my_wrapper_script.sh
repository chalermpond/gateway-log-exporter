#!/bin/sh

# Start the first process
/docker-entrypoint.sh &
status=$?

if [ $status -ne 0 ]; then
  echo "Failed to start my_first_process: $status"
  exit $status
fi

# Start the second process
sh /app/start_kong.sh &
status=$?

if [ $status -ne 0 ]; then
  echo "Failed to start my_second_process: $status"
  exit $status
fi

# Start the third process
sh /app/start_node.sh &
status=$?

if [ $status -ne 0 ]; then
  echo "Failed to start my_third_process: $status"
  exit $status
fi

# Naive check runs checks once a minute to see if either of the processes exited.
# This illustrates part of the heavy lifting you need to do if you want to run
# more than one service in a container. The container exits with an error
# if it detects that either of the processes has exited.
# Otherwise it loops forever, waking up every 60 seconds

while sleep 60; do
  ps aux |grep docker-entrypoint |grep -q -v grep
  PROCESS_1_STATUS=$?
  ps aux |grep start_kong |grep -q -v grep
  PROCESS_2_STATUS=$?
  ps aux |grep start_node |grep -q -v grep
  PROCESS_3_STATUS=$?
  # If the greps above find anything, they exit with 0 status
  # If they are not both 0, then something is wrong
  if [ $PROCESS_1_STATUS -ne 0 ]; then
    echo "Processes entrypoint has already exited."
  fi
  if [ $PROCESS_2_STATUS -ne 0 ]; then
    echo "Processes Kong has already exited."
  fi
  if [ $PROCESS_3_STATUS -ne 0 ]; then
    echo "Processes App nest has already exited."
  fi
done
