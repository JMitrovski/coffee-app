const fs = require("fs");

const modifications = JSON.parse(
  fs.readFileSync(`${__dirname}/../mocks/modifications.json`, "utf-8")
);

exports.getAllModifications = (req, res) => {
  if (!modifications)
    res.status(404).json({
      status: "fail",
      message: "Modification not found",
    });

  let tmp = modifications.map((m) => {
    return {
      id: m.id,
      name: m.name,
      value: JSON.parse(m.value),
    };
  });

  res.status(200).json({
    status: "success",
    result: modifications.length,
    data: tmp,
  });
};
