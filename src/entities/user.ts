type User = {
  id?: number;
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
  getName: () => string;
}> {
  const makeUser = ({ email, name }: User) => {
    const emailFormat = /.+@.+/g;
    if (!email.match(emailFormat)) throw new Error("Invalid email");
    if (!name) throw new Error("Invalid name");

    return Object.freeze({
      getEmail: () => email,
      getName: () => name,
    });
  };
  return makeUser;
}
