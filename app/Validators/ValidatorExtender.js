const Validator = use("Validator");
const Database = use("Database");
const NotFoundException = use("App/Exceptions/NotFoundException");

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) {
    return;
  }

  const [table, column] = args;
  const row = await Database.table(table)
    .where(column, value)
    .first();

  if (!row) {
    throw message;
  }
};

Validator.extend("exists", existsFn);
