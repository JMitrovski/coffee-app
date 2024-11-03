const fs = require("fs");

const coffees = JSON.parse(
  fs.readFileSync(`${__dirname}/../mocks/coffee.json`, "utf-8")
);

const relations = JSON.parse(
  fs.readFileSync(`${__dirname}/../mocks/relations.json`, "utf-8")
);

const modifications = JSON.parse(
  fs.readFileSync(`${__dirname}/../mocks/modifications.json`, "utf-8")
);

exports.checkId = (req, res, next, val) => {
  const selectedCoffee = coffees.find((el) => el.id === val * 1);
  if (!selectedCoffee)
    return res.status(404).json({
      status: "fail",
      message: "MIDDLEWARE: Coffee does not exists!",
    });
  next();
};

exports.getAllCoffees = (req, res) => {
  if (!coffees)
    res.status(404).json({
      status: "fail",
      message: "Coffee not found",
    });

  let mappedCoffes = coffees.map((c) => {
    let tmpRelations = relations
      .map((r) => {
        if (r.cid === c.id) {
          let modification = modifications.find((m) => m.id === r.mid);
          return {
            id: modification.id,
            name: modification.name,
            value: JSON.parse(r.value),
          };
        }
        return null;
      })
      .filter((relation) => relation !== null);

    return {
      id: c.id,
      name: c.name,
      image: c.image,
      description: c.description,
      modifications: tmpRelations.filter((el) => el !== null),
    };
  });

  res.status(200).json({
    status: "success",
    result: coffees.length, // not necessary for JSend specification, but good practice
    data: mappedCoffes,
  });
};

exports.getSingleCoffee = (req, res) => {
  if (!coffees)
    return res.status(404).json({
      status: "fail",
      message: "Coffee not found",
    });

  let selectedCoffee = coffees.find((el) => el.id === req.params.id * 1);

  let tmpRelations = relations
    .map((r) => {
      if (r.cid === selectedCoffee.id) {
        let modification = modifications.find((m) => m.id === r.mid);
        return {
          id: modification.id,
          name: modification.name,
          value: JSON.parse(r.value),
        };
      }
      return null;
    })
    .filter((relation) => relation !== null);

  return res.status(200).json({
    status: "success",
    data: {
      ...selectedCoffee,
      modifications: tmpRelations,
    },
  });
};
