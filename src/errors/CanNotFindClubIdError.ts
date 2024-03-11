export class CanNotFindClubIdError extends Error {
  constructor() {
    super(`Could NOT find club id. make sure [chapterid] exists in raw DOM`);
  }
}
