const Koa = require("koa");
const KoaRouter = require("koa-router");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();
app.use(bodyParser());

// 给上下文context添加属性
app.context.user = "cs";

// DB
const things = [{ name: "game" }, { name: "music" }, { name: "sports" }];

// 配置模板引擎
render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false
});

router.get("/", index);

async function index(ctx) {
  await ctx.render("index", {
    title: "things i love...",
    things
  });
}

router.get("/add", showAdd);

async function showAdd(ctx) {
  await ctx.render("add");
}

router.post("/add", add);

async function add(ctx) {
  const body = ctx.request.body;
  // console.log(body);
  things.push({ name: body.thing });
  ctx.redirect("/");
}
// app.use(async ctx => {
//   ctx.body = { msg: "hello koa!" };
// });

router.get("/test", ctx => {
  ctx.body = `hello router ${ctx.user}`;
});

router.get("/test/:id", ctx => {
  ctx.body = `hello router ${ctx.params.id}`;
});

// 配置路由模块
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server started ....");
});
