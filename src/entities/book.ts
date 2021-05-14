export function buildMakeBook(): ({
  title,
  published,
  authorId,
  userId,
}: Book) => Readonly<{
  getTitle: () => string;
  getPublished: () => true;
  getAuthorId: () => number;
}> {
  const makeBook = ({ title, published, authorId }: Book) => {
    if (!title) throw new Error("Invalid title");
    if (!published) throw new Error("Published must be a true or false");
    if (!authorId) throw new Error("The book must have a author");

    return Object.freeze({
      getTitle: () => title,
      getPublished: () => published,
      getAuthorId: () => authorId,
    });
  };
  return makeBook;
}
