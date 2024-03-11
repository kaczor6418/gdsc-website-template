#!/bin/bash
source ./git-hooks/git-hooks-helpers.sh
source ./git-hooks/logs-colors.sh

PRETTIER_EXIT_CODE=0
AUTO_FIX_FLAG="--check"
EXTENSIONS_TO_CHECK=".*\.(json|md|html|yml)$"
STAGED_FILES=$(git diff --cached --diff-filter=d --name-only | grep -E "$EXTENSIONS_TO_CHECK")
NOT_STAGED_FILES=$(git diff --diff-filter=b --name-only | grep -E "$EXTENSIONS_TO_CHECK")
REGEX_FOR_FILES_TO_FIX=$(create_pattern "${NOT_STAGED_FILES[*]}")
FILES_TO_ADD_AFTER_FIX=$(filter_array_with_inverted_regEx "${STAGED_FILES[*]}" "${REGEX_FOR_FILES_TO_FIX}")

if [ ${#FILES_TO_ADD_AFTER_FIX} = ${#STAGED_FILES} ]; then
  AUTO_FIX_FLAG="--write"
fi
if [[ -n "$STAGED_FILES" ]]; then
  echo -e "${BLUE} 📝 Running Prettier... ${NC}"
  ./node_modules/.bin/prettier $AUTO_FIX_FLAG $STAGED_FILES
  PRETTIER_EXIT_CODE=$?
  printf "\n"
fi

echo $PRETTIER_EXIT_CODE >"$PRETTIER_EXIT_CODE_TMP"
echo $FILES_TO_ADD_AFTER_FIX >"$PRETTIER_FILES_TO_ADD_AFTER_FIXES_TMP"
