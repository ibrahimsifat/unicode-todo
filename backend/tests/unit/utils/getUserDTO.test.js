const getUserDTO = require("../../../src/lib/utils/getUserDTO");

describe("getUserDTO", () => {
  it("should return the correct user DTO", () => {
    const user = {
      _id: "123",
      name: "John Doe",
      email: "john@example.com",
      avatar: "avatar.png",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-02",
    };

    const expectedDTO = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      avatar: "avatar.png",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-02",
    };

    expect(getUserDTO(user)).toEqual(expectedDTO);
  });

  it("should handle user without _id", () => {
    const user = {
      id: "456",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "avatar2.png",
      createdAt: "2023-01-03",
      updatedAt: "2023-01-04",
    };

    const expectedDTO = {
      id: "456",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "avatar2.png",
      createdAt: "2023-01-03",
      updatedAt: "2023-01-04",
    };

    expect(getUserDTO(user)).toEqual(expectedDTO);
  });
});
