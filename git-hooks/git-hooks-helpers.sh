#!/bin/bash
function remove_last_char_if_not_empty() {
  container=("$@")
  if [[ -n "$container" ]]; then
    container=${container::-1}
  fi
  echo "$container"
}

function create_pattern() {
  files_paths_list=("$@")
  pattern=""
  for file_name in $files_paths_list; do
    pattern="${pattern}${file_name}|"
  done
  pattern=$(remove_last_char_if_not_empty "${pattern[*]}")
  echo "$pattern"
}

function filter_array_with_inverted_regEx() {
  files_paths_list=("$@")
  query=$2
  container=""
  if [[ -z "${query}" ]]; then
    container=$files_paths_list
  else
    for value in $files_paths_list; do
      matched_string=$(echo "$value" | grep -v -E "$query")
      if [[ -n "$matched_string" ]]; then
        container="${container}${value} "
      fi
    done
    container=$(remove_last_char_if_not_empty "${container[*]}")
  fi
  echo "$container"
}
