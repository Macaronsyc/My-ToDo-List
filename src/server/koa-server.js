const Koa = require("koa");
const app = new Koa();
const cors = require("koa2-cors");
const Router = require("koa-router");
const koaBody = require("koa-body");
const Mock = require("mockjs");
const chalk = require("chalk");
const apiRouter = new Router();
app.use(cors({ origin: (ctx) => "http://localhost:3000" }));
app.use(koaBody());
let { array: _toDoList } = Mock.mock({
  "array|100000": [
    {
      work: () => Mock.mock("@first"),
      isDone: false,
      id: () => Math.random(),
    },
  ],
});
apiRouter.get("/getList", async (ctx) => {
  try {
    ctx.body = {
      list: JSON.stringify(_toDoList),
    };
    console.log(chalk.yellow(" \n收到了前端的请求，返回中"));
  } catch (error) {
    console.log(error);
    ctx.body = {
      error,
    };
  }
});

apiRouter.post("/addWork", async (ctx) => {
  let obj = ctx.request.body;
  console.log(obj);
  _toDoList.unshift(obj);
  try {
    ctx.body = {
      isSuccess: true,
    };
    console.log(chalk.yellow(" \n收到了前端的请求，返回中"));
  } catch (error) {
    console.log(error);
    ctx.body = {
      error,
    };
  }
});

apiRouter.post("/deleteItem", async (ctx) => {
  let obj = ctx.request.body;
  console.log(obj);
  _toDoList = _toDoList.filter((item) => {
    if (Number(item.id) !== Number(obj.id)) {
      return true;
    } else {
      return false;
    }
  });
  try {
    ctx.body = {
      isSuccess: true,
    };
    console.log(chalk.yellow(" \n收到了前端的请求，返回中"));
  } catch (error) {
    console.log(error);
    ctx.body = {
      error,
    };
  }
});

apiRouter.post("/checkBoxChange", async (ctx) => {
  let obj = ctx.request.body;
  console.log(obj);
  _toDoList = _toDoList.map((item) => {
    if (Number(item.id) === Number(obj.id)) {
      return Object.assign(item, {
        isDone: obj.isChecked,
      });
    } else {
      return item;
    }
  });
  try {
    ctx.body = {
      isSuccess: true,
    };
    console.log(chalk.yellow(" \n收到了前端的请求，返回中"));
  } catch (error) {
    console.log(error);
    ctx.body = {
      error,
    };
  }
});

apiRouter.post("/updateWork", async (ctx) => {
  let obj = ctx.request.body;
  console.log(obj);
  _toDoList = _toDoList.map((item) => {
    if (Number(item.id) === Number(obj.id)) {
      return Object.assign(item, {
        work: obj.newWork,
      });
    } else {
      return item;
    }
  });
  try {
    ctx.body = {
      isSuccess: true,
    };
    console.log(chalk.yellow(" \n收到了前端的请求，返回中"));
  } catch (error) {
    console.log(error);
    ctx.body = {
      error,
    };
  }
});

app.use(apiRouter.routes(), apiRouter.allowedMethods());

app.listen(3003, () => {
  console.log(
    chalk.green("\nThe Koa server is currently runnning on port 3003 \n")
  );
});
