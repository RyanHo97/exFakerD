import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import { faker,SexType } from '@faker-js/faker';

type SubscriptionTier = 'free' | 'basic' | 'business';

interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: SexType;
  subscriptionTier: SubscriptionTier;
}

function createRandomUser(): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 10,
});

const app = express();

app.use(cors({
  origin: true, // 允许所有来源访问
  credentials: true, // 允许携带cookie
}));

app.get("/api/v1/test", (_, res) => {
  res.send({
    flag: true,
    message: "查询成功",
    result: {
      data: USERS,
      count: USERS.length,
    }
  });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);