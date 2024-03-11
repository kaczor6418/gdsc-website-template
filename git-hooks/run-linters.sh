#!/bin/bash
source ./git-hooks/git-hooks-helpers.sh
source ./git-hooks/logs-colors.sh

ESLINT_EXIT_CODE=0
AUTOFIX_FLAG=""
EXTENSIONS_TO_CHECK=".*\.(jsx?|mjs|mts|tsx?)$"
STAGED_FILES=$(git diff --cached --diff-filter=d --name-only | grep -E "$EXTENSIONS_TO_CHECK")
NOT_STAGED_FILES=$(git diff --diff-filter=b --name-only | grep -E "$EXTENSIONS_TO_CHECK")
REGEX_FOR_FILES_TO_FIX=$(create_pattern "${NOT_STAGED_FILES[*]}")
FILES_TO_ADD_AFTER_FIX=$(filter_array_with_inverted_regEx "${STAGED_FILES[*]}" "${REGEX_FOR_FILES_TO_FIX}")

if [ ${#FILES_TO_ADD_AFTER_FIX} = ${#STAGED_FILES} ]; then
  AUTOFIX_FLAG="--fix"
fi
if [[ -n "$STAGED_FILES" ]]; then
  echo -e "${BLUE} 🌀 Running ESLint... ${NC}"
  ./node_modules/.bin/eslint $STAGED_FILES --cache $AUTOFIX_FLAG
  ESLINT_EXIT_CODE=$?
  printf "\n"
fi

echo $ESLINT_EXIT_CODE >"$ESLINT_EXIT_CODE_TMP"
echo $FILES_TO_ADD_AFTER_FIX >"$ESLINT_FILES_TO_ADD_AFTER_FIXES_TMP"
