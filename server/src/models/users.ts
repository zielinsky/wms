import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export class User {
  name: string;
  email: string;
  uid: string;

  constructor(name: string, email: string, uid: string) {
    this.name = name;
    this.email = email;
    this.uid = uid;
  }
}

export const userConverter = {
  toFirestore: (user: User) => {
    return {
      name: user.name,
      email: user.email,
      uid: user.uid,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();
    if (data) return new User(data.name, data.email, snapshot.id);
    else throw new Error("Unable to read snapshot from firestore");
  },
};
