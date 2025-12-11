import orcherstrator from "tests/orcherstrator";

beforeAll(async () => {
  await orcherstrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  const parsedDate = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedDate);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(
    50,
  );
  expect(responseBody.dependencies.database.openned_connections).toEqual(1);
});
