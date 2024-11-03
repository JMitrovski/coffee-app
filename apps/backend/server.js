const app = require(`${__dirname}/app`);

const port = 5555;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
