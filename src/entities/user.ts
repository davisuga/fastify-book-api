type User = {
  id: number;
  email: string;
  name: string;
  favorite_books?: any;
};
export default User;
export function buildMakeUser(): ({
  id,
  email,
  name,
}: User) => Readonly<{
  getEmail: () => string;
  getId: () => number;
  getName: () => string;
}> {
  const makeUser = ({ id, email, name }: User) => {
    const emailFormat = /.+@.+/g;
    if (!email.match(emailFormat)) throw new Error("Invalid email");
    if (!id) throw new Error("Invalid id");
    if (!name) throw new Error("Invalid name");
    return Object.freeze({
      getEmail: () => email,
      getId: () => id,
      getName: () => name,
    });
  };
  return makeUser;
}
