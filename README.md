# exFakerD

## 介绍

English：

If you happen to need a fake data server, this solution can quickly help you get started.

Solution: express + [faker](https://github.com/faker-js/faker) + cors for cross-origin resource sharing + vite build tool.

中文：

如果您正好需要一个假数据服务器，这个方案可以快速让您使用。

整合：express+[faker](https://github.com/faker-js/faker)+cors跨域处理+vite构建工具

## 使用方式：

1.克隆仓库到本地或通过pnpm命令下载（暂未开通）

```bash
git clone https://github.com/RyanHo97/exFakerD.git
```

2.安装

```bash
pnpm install
```

3.启动

```bash
pnpm run dev
```



案例：exFakerD\src\server\main.ts

```typescript
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
```



## 贡献

欢迎联系at-WZM521