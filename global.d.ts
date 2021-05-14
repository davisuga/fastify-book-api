type User = {
  id: number;
  email: string;
  name: string;
  favorite_books?: any;
};

type UserDb = Readonly<{
  findAll: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User>;
  findById: (id: number) => Promise<User>;
  insert: (data: AddUserParams) => Promise<User>;
  remove: (id: number) => Promise<User>;
  update: (data: EditUserParams) => Promise<User>;
}>;

type AddUserParams = {
  email: string;
  name: string;
};

interface EditUserParams extends AddUserParams {
  id: number;
}

type ListUsersParams = {
  id: number;
  name?: string;
  email?: string;
};
type ListUsers = (config: ListUsersParams) => Promise<User[]>;

type Book = {
  id?: number;
  title: string;
  authorId: number | null;
  genre: string;
};

type BookDb = Readonly<{
  findAll: () => Promise<Book[]>;
  findByAuthorId: (email: string) => Promise<Book[]>;
  findById: (id: number) => Promise<Book>;
  insert: (data: Book) => Promise<Book>;
}>;

type AddBookParams = {
  title: string;
  name: string;
};
