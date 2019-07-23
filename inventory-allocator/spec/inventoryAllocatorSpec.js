const InventoryAllocator = require('../src/InventoryAllocator');

describe("Inventory Allocator", () => {

  describe("when the entire order is in a single warehouse", () => {
    it("returns the order from the cheapest warehouse", () => {
      const order = { apple: 1, oranges: 10, banana: 20 };
      const warehouses = [
        { name: "dunderMifflin", inventory: { apple: 1, oranges: 10, banana: 20} },
        { name: "vanceRefrig", inventory: { apple: 10, banana: 1 } }
      ];
      const invAlloc = new InventoryAllocator(order, warehouses);
      expect(invAlloc.calculateInventory())
        .toEqual([ { "dunderMifflin": { apple: 1, oranges: 10, banana: 20 } } ]);
    });
  });

  describe("when the entire order is spread across multiple warehouses", () => {
    it("returns the order in the cheapest shipment possible", () => {
      const order = { apple: 1, oranges: 10, banana: 20 };
      const warehouses = [
        { name: "dunderMifflin", inventory: { oranges: 10, banana: 19 } },
        { name: "vanceRefrig", inventory: { apple: 10, banana: 10 } }
      ];
      const invAlloc = new InventoryAllocator(order, warehouses);
      expect(invAlloc.calculateInventory())
        .toEqual([{ "dunderMifflin": { oranges: 10, banana: 19 } },
        { "vanceRefrig": { apple: 1, banana: 1 } }]);
    });
  });

  describe("when the order is not in stock", () => {
    it("returns an empty shipment order", () => {
      const order = { apple: 1 };
      const warehouses = [
        { name: "dunderMifflin", inventory: { peach: 10 } },
        { name: "vanceRefrig", inventory: { apple: 0, banana: 1 } }
      ];
      const invAlloc = new InventoryAllocator(order, warehouses);
      expect(invAlloc.calculateInventory()).toEqual([]);
    });
  }); 

  describe("when the order is not in logged in inventory", () => {
    it("returns an empty shipment order", () => {
      const order = { apple: 1 };
      const warehouses = [
        { name: "dunderMifflin", inventory: { peach: 10 } },
        { name: "vanceRefrig", inventory: { banana: 1 } }
      ];
      const invAlloc = new InventoryAllocator(order, warehouses);
      expect(invAlloc.calculateInventory()).toEqual([]);
    });
  }); 

  describe("when only part of the order can be fulfilled", () => {
    // Ideally you'd want to return an error to the client and ask them to
    // review their cart/order
    it("returns an empty shipment order", () => {
      const order = { apple: 1, oranges: 10, banana: 20 };
      const warehouses = [
        { name: "dunderMifflin", inventory: { oranges: 9, banana: 19 } },
        { name: "vanceRefrig", inventory: { apple: 10, banana: 1 } }
      ];
      const invAlloc = new InventoryAllocator(order, warehouses);
      expect(invAlloc.calculateInventory()).toEqual([]);
    });
  });
});